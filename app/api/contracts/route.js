// app/api/contracts/route.js
import { NextResponse } from 'next/server';
import { generateContractWithAI } from '@/app/lib/openai';

export async function POST(request) {
  try {
    const { action, data } = await request.json();
    
    switch (action) {
      case 'generate':
        const contract = await generateContractWithAI(data.type, data.details);
        return NextResponse.json({ contract });
      
      default:
        return NextResponse.json(
          { error: 'Invalid action' }, 
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Contract API error:', error);
    return NextResponse.json(
      { error: error.message }, 
      { status: 500 }
    );
  }
}