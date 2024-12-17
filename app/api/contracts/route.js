import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { CONTRACT_TYPES } from '@/app/lib/contractTemplates';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cache for storing generated system messages
const systemMessageCache = new Map();

// Generate system message with template sections
function getSystemMessage(contractType, template) {
  const cacheKey = `${contractType}-${template}`;
  if (systemMessageCache.has(cacheKey)) {
    return systemMessageCache.get(cacheKey);
  }

  const message = {
    role: "system",
    content: `You are a legal contract expert. Generate clear, professional, and legally sound contracts.
    You must return ONLY a JSON object with the following structure, and no additional text or explanation.
    Use ONLY the following sections in your response: ${JSON.stringify(template.sections)}
    Make each section detailed and professionally written.
    {
      "title": "Contract title",
      "parties": {
        "party1": { "name": "[First Party Name]", "role": "[Role/Title]" },
        "party2": { "name": "[Second Party Name]", "role": "[Role/Title]" }
      },
      "sections": [
        {
          "title": "Section title from the provided list",
          "content": "Detailed, professional content for this section"
        }
      ],
      "effectiveDate": "Date when contract becomes effective",
      "termination": "Detailed termination conditions",
      "signatures": {
        "party1": { "name": "[Name]", "date": "[Date]", "title": "[Title]" },
        "party2": { "name": "[Name]", "date": "[Date]", "title": "[Title]" }
      }
    }`
  };

  systemMessageCache.set(cacheKey, message);
  return message;
}

export async function POST(request) {
  try {
    const { action, data } = await request.json();
    
    if (!action) {
      return NextResponse.json(
        { error: 'Action is required', success: false },
        { status: 400 }
      );
    }

    switch (action) {
      case 'generate': {
        if (!data?.type || !data?.details || !data?.details.template) {
          return NextResponse.json(
            { error: 'Contract type, template, and details are required', success: false },
            { status: 400 }
          );
        }

        const contractType = CONTRACT_TYPES[data.type];
        const template = contractType?.templates[data.details.template];

        if (!contractType || !template) {
          return NextResponse.json(
            { error: 'Invalid contract type or template', success: false },
            { status: 400 }
          );
        }

        const systemMessage = getSystemMessage(data.type, template);
        const userMessage = {
          role: "user",
          content: `Generate a detailed ${contractType.name} using the "${template.name}" template.
          Contract details: ${JSON.stringify(data.details, null, 2)}
          Remember to return ONLY the JSON object with no additional text.`
        };

        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [systemMessage, userMessage],
          temperature: 0.7,
          max_tokens: 4000,
          presence_penalty: 0.1, // Slightly penalize repeated content
          frequency_penalty: 0.1, // Slightly penalize repeated words
        });

        let contractContent;
        try {
          const cleanedContent = completion.choices[0].message.content
            .replace(/```json\n?|\n?```/g, '')
            .trim();
          contractContent = JSON.parse(cleanedContent);

          // Validate that all required sections are present
          const requiredSections = new Set(template.sections);
          const generatedSections = new Set(contractContent.sections.map(s => s.title));
          
          for (const section of requiredSections) {
            if (!generatedSections.has(section)) {
              throw new Error(`Missing required section: ${section}`);
            }
          }
        } catch (error) {
          console.error('Error parsing or validating contract JSON:', error);
          return NextResponse.json(
            { error: 'Failed to generate structured contract', success: false },
            { status: 500 }
          );
        }
        
        return NextResponse.json({ 
          success: true,
          contract: contractContent,
          metadata: {
            model: "gpt-4",
            type: data.type,
            template: template.name,
            timestamp: new Date().toISOString()
          }
        });
      }
      
      case 'update': {
        if (!data?.contract || !data?.updates) {
          return NextResponse.json(
            { error: 'Contract and updates are required', success: false },
            { status: 400 }
          );
        }

        // Handle contract updates here
        const updatedContract = {
          ...data.contract,
          ...data.updates,
          metadata: {
            ...data.contract.metadata,
            lastModified: new Date().toISOString()
          }
        };

        return NextResponse.json({
          success: true,
          contract: updatedContract
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Supported actions are: generate, update', success: false }, 
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Contract API error:', error);
    return NextResponse.json(
      { 
        error: error.message,
        success: false,
        timestamp: new Date().toISOString()
      }, 
      { status: error.status || 500 }
    );
  }
}