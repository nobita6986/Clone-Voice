
export type Page = 'dashboard' | 'tts' | 'new-voice' | 'history';

export interface Voice {
  id: string;
  name: string;
  type: 'prebuilt' | 'custom';
  languageCode: string;
  providerVoiceId: string;
}

export interface HistoryItem {
  id: string;
  text: string;
  voiceId: string;
  audioData: string; // base64 encoded string
  createdAt: Date;
}
