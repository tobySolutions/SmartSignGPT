// app/api/analyze-pdf/route.js
import { NextResponse } from 'next/server'
import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get('pdf')
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const text = buffer.toString('utf8', 0, 1000)

    const analysis = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a legal document expert. Analyze contracts and provide summaries focusing on:
            - Key obligations and responsibilities
            - Important dates and deadlines
            - Financial terms
            - Potential risks or concerns
            Format the response in clear bullet points.`
        },
        {
          role: "user",
          content: `Analyze this contract and provide a clear summary: ${text}`,
        }
      ],
    })

    return NextResponse.json({
      analysis: analysis.choices[0].message.content
    })

  } catch (error) {
    console.error('PDF analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze PDF' },
      { status: 500 }
    )
  }
}