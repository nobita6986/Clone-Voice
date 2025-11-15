export type Page = 'dashboard' | 'tts' | 'new-voice' | 'history';

export interface Voice {
  id: string; // Can be uuid from db or static string for prebuilt
  name: string;
  type: 'prebuilt' | 'custom';
  languageCode: string;
  languageName: string;
  providerVoiceId: string;
}

export interface HistoryItem {
  id: string; // uuid from db
  text: string;
  voiceId: string; // Can be uuid or static string
  audioData: string; // base64 encoded string
  createdAt: Date;
}
