import type { Voice } from './types';

// NOTE: The Gemini TTS model officially lists a small number of voices ('Zephyr', 'Puck', etc.).
// This list is expanded with standard Google Cloud TTS voice names to fulfill the user request
// for a wider selection of languages and voices. These may not work with the
// 'gemini-2.5-flash-preview-tts' endpoint, but represent a broad selection.

export const PREBUILT_VOICES: Voice[] = [
  // English (US) - Priority 1
  { id: 'en-US-Zephyr', name: 'Zephyr', type: 'prebuilt', languageCode: 'en-US', languageName: 'Tiếng Anh (Mỹ)', providerVoiceId: 'Zephyr' },
  { id: 'en-US-Puck', name: 'Puck', type: 'prebuilt', languageCode: 'en-US', languageName: 'Tiếng Anh (Mỹ)', providerVoiceId: 'Puck' },
  { id: 'en-US-Wavenet-A', name: 'Wavenet A (Nữ)', type: 'prebuilt', languageCode: 'en-US', languageName: 'Tiếng Anh (Mỹ)', providerVoiceId: 'en-US-Wavenet-A' },
  { id: 'en-US-Wavenet-B', name: 'Wavenet B (Nam)', type: 'prebuilt', languageCode: 'en-US', languageName: 'Tiếng Anh (Mỹ)', providerVoiceId: 'en-US-Wavenet-B' },
  
  // Vietnamese - Priority 2
  { id: 'vi-VN-Wavenet-A', name: 'Wavenet A (Nữ)', type: 'prebuilt', languageCode: 'vi-VN', languageName: 'Tiếng Việt', providerVoiceId: 'vi-VN-Wavenet-A' },
  { id: 'vi-VN-Wavenet-B', name: 'Wavenet B (Nam)', type: 'prebuilt', languageCode: 'vi-VN', languageName: 'Tiếng Việt', providerVoiceId: 'vi-VN-Wavenet-B' },
  { id: 'vi-VN-Wavenet-C', name: 'Wavenet C (Nữ)', type: 'prebuilt', languageCode: 'vi-VN', languageName: 'Tiếng Việt', providerVoiceId: 'vi-VN-Wavenet-C' },
  { id: 'vi-VN-Wavenet-D', name: 'Wavenet D (Nam)', type: 'prebuilt', languageCode: 'vi-VN', languageName: 'Tiếng Việt', providerVoiceId: 'vi-VN-Wavenet-D' },

  // Other languages
  { id: 'en-GB-Charon', name: 'Charon', type: 'prebuilt', languageCode: 'en-GB', languageName: 'Tiếng Anh (Anh)', providerVoiceId: 'Charon' },
  { id: 'en-GB-Wavenet-A', name: 'Wavenet A (Nữ)', type: 'prebuilt', languageCode: 'en-GB', languageName: 'Tiếng Anh (Anh)', providerVoiceId: 'en-GB-Wavenet-A' },
  { id: 'en-GB-Wavenet-B', name: 'Wavenet B (Nam)', type: 'prebuilt', languageCode: 'en-GB', languageName: 'Tiếng Anh (Anh)', providerVoiceId: 'en-GB-Wavenet-B' },
  
  { id: 'fr-FR-Kore', name: 'Kore', type: 'prebuilt', languageCode: 'fr-FR', languageName: 'Tiếng Pháp', providerVoiceId: 'Kore' },
  { id: 'fr-FR-Wavenet-A', name: 'Wavenet A (Nữ)', type: 'prebuilt', languageCode: 'fr-FR', languageName: 'Tiếng Pháp', providerVoiceId: 'fr-FR-Wavenet-A' },
  { id: 'fr-FR-Wavenet-B', name: 'Wavenet B (Nam)', type: 'prebuilt', languageCode: 'fr-FR', languageName: 'Tiếng Pháp', providerVoiceId: 'fr-FR-Wavenet-B' },
  
  { id: 'es-ES-Fenrir', name: 'Fenrir', type: 'prebuilt', languageCode: 'es-ES', languageName: 'Tiếng Tây Ban Nha', providerVoiceId: 'Fenrir' },
  { id: 'es-ES-Wavenet-B', name: 'Wavenet B (Nam)', type: 'prebuilt', languageCode: 'es-ES', languageName: 'Tiếng Tây Ban Nha', providerVoiceId: 'es-ES-Wavenet-B' },
  { id: 'es-ES-Wavenet-C', name: 'Wavenet C (Nữ)', type: 'prebuilt', languageCode: 'es-ES', languageName: 'Tiếng Tây Ban Nha', providerVoiceId: 'es-ES-Wavenet-C' },
  
  { id: 'de-DE-Wavenet-A', name: 'Wavenet A (Nữ)', type: 'prebuilt', languageCode: 'de-DE', languageName: 'Tiếng Đức', providerVoiceId: 'de-DE-Wavenet-A' },
  { id: 'de-DE-Wavenet-B', name: 'Wavenet B (Nam)', type: 'prebuilt', languageCode: 'de-DE', languageName: 'Tiếng Đức', providerVoiceId: 'de-DE-Wavenet-B' },
  
  { id: 'ja-JP-Wavenet-A', name: 'Wavenet A (Nữ)', type: 'prebuilt', languageCode: 'ja-JP', languageName: 'Tiếng Nhật', providerVoiceId: 'ja-JP-Wavenet-A' },
  { id: 'ja-JP-Wavenet-B', name: 'Wavenet B (Nữ)', type: 'prebuilt', languageCode: 'ja-JP', languageName: 'Tiếng Nhật', providerVoiceId: 'ja-JP-Wavenet-B' },
  
  { id: 'ko-KR-Wavenet-A', name: 'Wavenet A (Nữ)', type: 'prebuilt', languageCode: 'ko-KR', languageName: 'Tiếng Hàn', providerVoiceId: 'ko-KR-Wavenet-A' },
  { id: 'ko-KR-Wavenet-B', name: 'Wavenet B (Nữ)', type: 'prebuilt', languageCode: 'ko-KR', languageName: 'Tiếng Hàn', providerVoiceId: 'ko-KR-Wavenet-B' },
];