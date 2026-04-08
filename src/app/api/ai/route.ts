import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Environment variable GEMINI_API_KEY is missing. Please add it to your .env.local file.' },
        { status: 500 }
      );
    }

    const { data } = await req.json();
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'Invalid or missing data for analysis' }, { status: 400 });
    }

    // Initialize Gemini SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    // Grab the latest 14 days of data to keep the prompt context concise but relevant
    const recentData = data.slice(-14).map((d: any) => ({
      date: d.date,
      mstrPrice: d.mstrPrice.toFixed(2),
      btcPrice: d.btcPrice.toFixed(2),
      premiumPercent: d.premium.toFixed(2) + '%'
    }));

    const prompt = `
      You are an expert financial analyst. 
      Here is the last 14 days of data for MicroStrategy (MSTR) stock price, Bitcoin (BTC) price, and the calculated "MSTR Premium to NAV".
      
      Data:
      ${JSON.stringify(recentData, null, 2)}
      
      Task:
      1. Analyze the short-term trend of the "Premium to NAV" indicator.
      2. Explain what this trend indicates about market sentiment and institutional demand. 
      3. Summarize how this might reflect on potential Bitcoin (BTC) price movements moving forward.
      
      Keep your analysis professional, structured, and concise (maximum 3 paragraphs). 
      Format your response clearly. Do not use overly complex Markdown, just paragraphs and bold text where necessary.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ summary: responseText });
  } catch (error: any) {
    console.error('Error generating AI summary:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate AI summary' }, { status: 500 });
  }
}
