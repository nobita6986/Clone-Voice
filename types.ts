export type Page = 'dashboard' | 'tts' | 'new-voice' | 'history';

export interface Voice {
  id: string;
  name: string;
  displayName: string;
  gender: 'Male' | 'Female';
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

export interface ApiKey {
  id: string;
  key: string;
}
