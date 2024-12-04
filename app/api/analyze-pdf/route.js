import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'
import fs from 'fs';
import os from 'os';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// Maximum file size (20MB)
const MAX_FILE_SIZE = 20 * 1024 * 1024

// Create an assistant for PDF analysis
async function createAssistant() {
  try {
    const assistant = await openai.beta.assistants.create({
      name: "PDF Contract Analyzer",
      instructions: `
      You are a contract analysis expert. Analyze contracts for key terms, potential risks, and provide clear summaries in the following structured format:
      
      ### Key Dates and Deadlines
      - Do not include the headings **Key Dates and Deadlines**
      - List important dates such as contract start/end dates, renewal deadlines, and milestone timelines.
      
      ### Important Clauses
      - Do not include the headings **Important Clauses**
      - Highlight critical clauses, including confidentiality, jurisdiction, dispute resolution, etc.
      
      ### Potential Risks or Concerns
      - Do not include the headings **Potential Risks or Concerns**
      - Identify areas of ambiguity, unfavorable terms, or any potential legal or financial risks.
      
      ### Payment Terms
      - Do not include the headings **Payment Terms**
      - Summarize payment schedules, amounts, penalties for late payment, and any incentives.
      
      ### Termination Conditions
      - Do not include the headings **Termination Conditions**
      - Detail the conditions under which the contract can be terminated, including notice periods and penalties.
      `,
      model: "gpt-4-1106-preview",
      tools: [{ type: "file_search" }],
    })
    
    return assistant
  } catch (error) {
    console.error('Error creating assistant:', error)
    throw error
  }
}

// Get or create assistant
async function getOrCreateAssistant() {
  const cookieStore = cookies();
  const assistantId = cookieStore.get('assistant_id')?.value;

  try {
    if (assistantId) {
      // Try to retrieve existing assistant
      try {
        const assistant = await openai.beta.assistants.retrieve(assistantId);
        return assistant;
      } catch (error) {
        console.warn('Could not retrieve assistant, creating new one:', error);
        // Continue to create new assistant if retrieval fails
      }
    }

    // Create new assistant if none exists or retrieval failed
    const assistant = await createAssistant();
    
    // Set the assistant ID cookie
    cookieStore.set('assistant_id', assistant.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return assistant;
  } catch (error) {
    throw new Error('Failed to get or create assistant: ' + error.message);
  }
}

export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
}

export async function POST(request) {
  let tempFilePath = null;
  let fileId = null;

  try {
    // Check content length header
    const contentLength = parseInt(request.headers.get('content-length') || '0')
    if (contentLength > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 20MB.' },
        { status: 413 }
      )
    }

    // Get the PDF file from the request
    const formData = await request.formData()
    const pdfFile = formData.get('pdf')

    if (!pdfFile) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!pdfFile.type || !pdfFile.type.includes('pdf')) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF.' },
        { status: 400 }
      )
    }

    // Validate file size
    if (pdfFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 20MB.' },
        { status: 413 }
      )
    }

    // Get or create the assistant
    const assistant = await getOrCreateAssistant();

    // Save the file temporarily
    const tempDir = os.tmpdir();
    tempFilePath = path.join(tempDir, pdfFile.name);
    const fileBuffer = Buffer.from(await pdfFile.arrayBuffer());
    fs.writeFileSync(tempFilePath, fileBuffer);

    const cookieStore = cookies();
    let vectorStoreId = cookieStore.get('vector_store_id')?.value;

    // Create a vector store
    let vectorStore = await openai.beta.vectorStores.create({
      name: `PDF Contract Analyzer - ${pdfFile.name}`,
    });

    if (!vectorStoreId || vectorStoreId !== vectorStore.id) {
      // Upload the file to the vector store
      await openai.beta.vectorStores.fileBatches.uploadAndPoll(
        vectorStore.id, 
        { files: [fs.createReadStream(tempFilePath)] }
      );

      // Set the vector store ID cookie
      cookieStore.set('vector_store_id', vectorStore.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
    }

    // Update the assistant with the vector store
    await openai.beta.assistants.update(assistant.id, {
      tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
    });

    // Create a thread for this analysis
    const thread = await openai.beta.threads.create();

    // Upload the file for the thread
    const uploadResponse = await openai.files.create({
      file: fs.createReadStream(tempFilePath),
      purpose: 'assistants',
    });
    fileId = uploadResponse.id;

    // Create a message with the PDF
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      attachments: [{ file_id: fileId, tools: [{ type: "file_search" }] }],
      content: "You are an expert contract analyst. Your task is to analyze the attached contract in detail  and provide a detailed analysis of its contents. Please format your response in the following format:\n\n1. **Key Dates and Deadlines** (All dates related to the contract)\n\n2. **Important Clauses** (Clauses that are important to the contract)\n\n3. **Potential Risks** (Potential risks or concerns)\n\n4. **Payment Terms** (Payment terms)\n\n5. **Termination Conditions** (Conditions for termination)",
    });

    // Run the analysis
    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id
    });

    // Wait for the analysis to complete with timeout
    const startTime = Date.now()
    const TIMEOUT = 120000 // 2 minute timeout
    let analysisRun = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    
    while (analysisRun.status !== 'completed') {
      if (Date.now() - startTime > TIMEOUT) {
        throw new Error('Analysis timeout')
      }

      if (analysisRun.status === 'failed' || analysisRun.status === 'cancelled') {
        throw new Error(`Analysis ${analysisRun.status}`)
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      analysisRun = await openai.beta.threads.runs.retrieve(thread.id, run.id)
    }

    // Get the analysis results
    const messages = await openai.beta.threads.messages.list(thread.id)
    const analysisMessage = messages.data[0].content[0].text.value

    // Parse the response into structured sections
    const sections = analysisMessage.split(/\d\.\s+/).filter(Boolean)
    const structuredAnalysis = {
      keyDates: sections[0]?.trim() || '',
      importantClauses: sections[1]?.trim() || '',
      potentialRisks: sections[2]?.trim() || '',
      paymentTerms: sections[3]?.trim() || '',
      terminationConditions: sections[4]?.trim() || ''
    }

    return NextResponse.json({ 
      analysis: structuredAnalysis,
      threadId: thread.id
    })

  } catch (error) {
    console.error('PDF analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to analyze PDF' },
      { status: 500 }
    )
  } finally {
    // Clean up resources in the finally block
    try {
      // Delete the temporary file if it exists
      if (tempFilePath && fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
      
      // Delete the OpenAI file if it was created
      if (fileId) {
        await openai.files.del(fileId);
      }
    } catch (cleanupError) {
      console.error('Error during cleanup:', cleanupError);
    }
  }
}