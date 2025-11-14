
import { GoogleGenAI, Modality } from "@google/genai";

export const generateSpeech = async (
  text: string, 
  voiceName: string,
  apiKey: string,
  model: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is not set. Please add and activate an API key in the settings.");
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: model,
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (base64Audio) {
      return base64Audio;
    } else {
      throw new Error("No audio data received from API. The response might be empty.");
    }
  } catch (error: any) {
    console.error("Error generating speech:", error);
    if (error.message.includes('API key not valid')) {
       throw new Error("The provided API key is not valid. Please check your key in the API Settings.");
    }
    throw new Error(`Failed to generate speech. Please check your API key and input. Details: ${error.message}`);
  }
};
