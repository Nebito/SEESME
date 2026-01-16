
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeologyAssistant = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: `You are the SEESME Virtual Assistant. You help users understand Eritrean Earth Sciences and Mining Engineering.
        Context: The Society of Eritrean Earth Scientists and Mining Engineers (SEESME) is a professional community. 
        Focus areas: Nubian Shield, Rift Valley, Danakil Depression, Mining in Eritrea (Bisha, Zara, etc.), Geological mapping, and Sustainable mining.
        Tone: Professional, academic, and helpful. 
        If asked about SEESME history, you can mention it's dedicated to advancing these fields in Eritrea.
        Keep responses concise and informative.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Assistant Error:", error);
    return "I'm sorry, I'm having trouble connecting to my geological database right now. Please try again later.";
  }
};
