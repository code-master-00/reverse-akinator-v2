import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // For local Vite dev, we might receive the parsed body or a raw string/buffer
    let body = req.body;
    if (!body) {
      // Manual parsing if body parser isn't available
      const buffers = [];
      for await (const chunk of req) {
        buffers.push(chunk);
      }
      const data = Buffer.concat(buffers).toString();
      body = JSON.parse(data || '{}');
    }

    const { characterContext, question } = body;
    
    if (!characterContext || !question) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ error: 'Missing characterContext or question' }));
    }

    const prompt = `You are playing Reverse Akinator. 
The user is trying to guess the character you are thinking of by asking Yes/No questions.

The character you are thinking of is described here:
${characterContext}

The user's question is: "${question}"

Analyze the question carefully against the character's facts and lore.
You must answer ONLY with a JSON object in this exact format, with no extra text:
{
  "type": "YES" or "NO",
  "commentary": "A short, in-character explanation or quip (1-2 sentences).",
  "mood": "confident", "surprised", "smug", or "thinking"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const textResponse = response.text;
    const jsonStart = textResponse.indexOf('{');
    const jsonEnd = textResponse.lastIndexOf('}');
    
    const parsedData = JSON.parse(textResponse.substring(jsonStart, jsonEnd + 1));

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(parsedData));

  } catch (err) {
    console.error('Gemini API Error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ 
      error: 'Internal Server Error', 
      type: 'NO', 
      commentary: 'I seem to have lost my train of thought. Could you ask that again?',
      mood: 'thinking'
    }));
  }
}
