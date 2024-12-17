import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { action, data } = await request.json();
    
    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'generate': {
        if (!data?.type || !data?.details) {
          return NextResponse.json(
            { error: 'Contract type and details are required' },
            { status: 400 }
          );
        }

        const completion = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a legal contract expert. Generate clear, professional, and legally sound contracts."
            },
            {
              role: "user",
              content: `Generate a detailed ${data.type} contract with the following specifications:\n${JSON.stringify(data.details, null, 2)}`
            }
          ],
          temperature: 0.7,
          max_tokens: 4000,
        });

        const contractContent = completion.choices[0].message.content;
        
        return NextResponse.json({ 
          success: true,
          contract: contractContent,
          metadata: {
            model: "gpt-4",
            type: data.type,
            timestamp: new Date().toISOString()
          }
        });
      }
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' }, 
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