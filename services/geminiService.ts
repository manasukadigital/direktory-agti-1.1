
import { GoogleGenAI } from "@google/genai";
import { MOCK_COMPANIES } from "../constants";
import { Language } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDatabase = async (query: string, language: Language): Promise<string> => {
  try {
    // Prepare context from the mock database
    const dataContext = JSON.stringify(MOCK_COMPANIES.map(c => ({
      name: c.name,
      type: c.type,
      location: `${c.city}, ${c.province}`,
      specialization: c.specialization,
      capacity: c.capacity,
      certificates: c.certifications.join(", "),
      markets: c.exportMarkets.join(", "),
      phone: c.phone,
      email: c.contactEmail
    })));

    const langInstruction = language === 'id' 
      ? "Jawablah dalam Bahasa Indonesia yang profesional dan solutif." 
      : "Answer in professional, solution-oriented English.";

    const systemInstruction = `
      You are the Senior Expert Consultant for the Asosiasi Garmen dan Tekstil Indonesia (AGTI).
      
      Your Role:
      Provide expert advice on:
      1. **Technical Issues**: Spinning, weaving, knitting, dyeing, finishing, and sewing processes. Troubleshooting defects.
      2. **Management**: Factory efficiency, LEAN manufacturing, HR in garment industry, cost control, supply chain.
      3. **Regulations**: Export/Import rules, SNI compliance, ISO standards, Sustainability (ESG).
      4. **Partner Matching**: You have access to the AGTI Member Database 2026.
      
      Data Context (AGTI Members):
      ${dataContext}
      
      Rules:
      1. ${langInstruction}
      2. Use your GENERAL KNOWLEDGE to answer technical/management questions (e.g., "How to fix needle breakage?"). You are NOT limited to the JSON data for technical advice.
      3. IF the user asks for a supplier/partner, ONLY recommend companies from the provided Data Context.
      4. Be professional, concise, and act like a senior industry consultant.
      5. Format your response in Markdown.
    `;

    const model = 'gemini-2.5-flash'; 
    
    const response = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.4, // Slightly higher for creative problem solving
      }
    });

    return response.text || (language === 'id' ? "Maaf, saya tidak dapat memberikan konsultasi saat ini." : "Sorry, I cannot provide consultation at this moment.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'id' 
      ? "Terjadi kesalahan saat menghubungi sistem AI. Pastikan API Key valid."
      : "An error occurred while contacting the AI system. Please check your API Key.";
  }
};
