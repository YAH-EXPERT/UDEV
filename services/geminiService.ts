import { GoogleGenAI, Modality } from "@google/genai";
import { Language } from '../types';

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const chatWithGemini = async (message: string, history: { role: string; parts: { text: string }[] }[], lang: Language) => {
  try {
    const ai = getClient();
    
    let sysInstruct = `You are MGAI (Madagascar-Global AI), the advanced AI Representative of UDEV (Unity Development).
    Your primary goal is to be helpful, professional, and act as a "Sales Engineer" to assist clients.
    
    KEY RESPONSIBILITIES:
    1. Answer questions about UDEV's services (Web, Mobile Apps, AI Chatbots).
    2. ASSIST CLIENTS WITH QUOTES (DEVIS): Guide them through a requirement gathering process.
       - Ask specific questions ONE BY ONE: Project type? Design status? Features? Budget? Deadline?
       - Summarize and tell them a UDEV human expert will contact them at: +261 34 04 999 99 or madesign.architect3d@gmail.com
    
    TONE:
    - Warm, professional, futuristic but human.
    - Emphasize "Humanizing Technology".
    `;
    
    if (lang === 'fr') {
      sysInstruct += " Please respond in French (Français).";
    } else if (lang === 'mg') {
      sysInstruct += " Please respond in Malagasy (Malagasy/Gasy). Use respectful terms. If technical terms are hard, keep them in English/French but explain in Malagasy.";
    } else {
      sysInstruct += " Please respond in English.";
    }

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: sysInstruct,
      },
      history: history 
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return lang === 'fr' ? "Reconnexion aux services..." : lang === 'mg' ? "Mamerina fifandraisana..." : "Reconnecting to support services...";
  }
};

export const generateSpeech = async (text: string, lang: Language) => {
  // Malagasy is not yet fully supported by the high-end TTS model, fallback to browser
  if (lang === 'mg') return null; 
  
  try {
    const ai = getClient();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            // 'Kore' is a balanced, high-quality AI voice
            prebuiltVoiceConfig: { voiceName: 'Kore' }, 
          },
        },
      },
    });
    
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  } catch (error) {
    console.error("TTS Error", error);
    return null;
  }
};