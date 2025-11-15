
import { GoogleGenAI, Modality } from "@google/genai";

export const generateSpeech = async (text: string, voiceName: string, apiKey: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("Khóa API Gemini chưa được định cấu hình.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
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
      throw new Error("Không nhận được dữ liệu âm thanh từ API. Điều này có thể do một khóa API không hợp lệ.");
    }
  } catch (error) {
    console.error("Error generating speech:", error);
    // Provide a more specific error message if possible
    if (error instanceof Error && error.message.includes('API key not valid')) {
       throw new Error("Khóa API Gemini không hợp lệ. Vui lòng kiểm tra lại trong phần Cài đặt.");
    }
    throw new Error("Không thể tạo giọng nói. Vui lòng kiểm tra khóa API và đầu vào của bạn.");
  }
};