import type { Voice } from './types';

export const PREBUILT_VOICES: Voice[] = [
  // English (US)
  { id: 'en-US-Zephyr', name: 'Zephyr (US English - Female 1)', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Zephyr' },
  { id: 'en-US-Puck', name: 'Puck (US English - Male 1)', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Puck' },
  { id: 'en-US-Algenib', name: 'Algenib (US English - Male 2)', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Algenib' },
  { id: 'en-US-Rasalgethi', name: 'Rasalgethi (US English - Male 3)', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Rasalgethi' },
  { id: 'en-US-Umbriel', name: 'Umbriel (US English - Female 2)', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Umbriel' },
  { id: 'en-US-Vindemiatrix', name: 'Vindemiatrix (US English - Female 3)', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Vindemiatrix' },

  // English (UK)
  { id: 'en-GB-Charon', name: 'Charon (UK English - Female)', type: 'prebuilt', languageCode: 'en-GB', providerVoiceId: 'Charon' },
  { id: 'en-GB-Schedar', name: 'Schedar (UK English - Male)', type: 'prebuilt', languageCode: 'en-GB', providerVoiceId: 'Schedar' },

  // English (Australia)
  { id: 'en-AU-Achernar', name: 'Achernar (Australian English - Male)', type: 'prebuilt', languageCode: 'en-AU', providerVoiceId: 'Achernar' },
  { id: 'en-AU-Achird', name: 'Achird (Australian English - Female)', type: 'prebuilt', languageCode: 'en-AU', providerVoiceId: 'Achird' },

  // English (India)
  { id: 'en-IN-Sadachbia-EN', name: 'Sadachbia (Indian English - Male)', type: 'prebuilt', languageCode: 'en-IN', providerVoiceId: 'Sadachbia' },
  { id: 'en-IN-Zephyr-EN', name: 'Zephyr (Indian English - Female)', type: 'prebuilt', languageCode: 'en-IN', providerVoiceId: 'Zephyr' },

  // Vietnamese
  { id: 'vi-VN-Kore', name: 'Kore (Vietnamese - Female 1)', type: 'prebuilt', languageCode: 'vi-VN', providerVoiceId: 'Kore' },
  { id: 'vi-VN-Aoede', name: 'Aoede (Vietnamese - Female 2)', type: 'prebuilt', languageCode: 'vi-VN', providerVoiceId: 'Aoede' },
  { id: 'vi-VN-Zubenelgenubi', name: 'Zubenelgenubi (Vietnamese - Male 1)', type: 'prebuilt', languageCode: 'vi-VN', providerVoiceId: 'Zubenelgenubi' },

  // French
  { id: 'fr-FR-Kore', name: 'Kore (French - Female 1)', type: 'prebuilt', languageCode: 'fr-FR', providerVoiceId: 'Kore' },
  { id: 'fr-FR-Callirrhoe', name: 'Callirrhoe (French - Female 2)', type: 'prebuilt', languageCode: 'fr-FR', providerVoiceId: 'Callirrhoe' },
  { id: 'fr-FR-Despina', name: 'Despina (French - Male)', type: 'prebuilt', languageCode: 'fr-FR', providerVoiceId: 'Despina' },

  // Spanish (Spain)
  { id: 'es-ES-Fenrir', name: 'Fenrir (Spanish - Male 1)', type: 'prebuilt', languageCode: 'es-ES', providerVoiceId: 'Fenrir' },
  { id: 'es-ES-Iapetus', name: 'Iapetus (Spanish - Male 2)', type: 'prebuilt', languageCode: 'es-ES', providerVoiceId: 'Iapetus' },
  { id: 'es-ES-Leda', name: 'Leda (Spanish - Female)', type: 'prebuilt', languageCode: 'es-ES', providerVoiceId: 'Leda' },
  
  // Spanish (US)
  { id: 'es-US-Iapetus', name: 'Iapetus (US Spanish - Male)', type: 'prebuilt', languageCode: 'es-US', providerVoiceId: 'Iapetus' },
  { id: 'es-US-Leda', name: 'Leda (US Spanish - Female)', type: 'prebuilt', languageCode: 'es-US', providerVoiceId: 'Leda' },

  // German
  { id: 'de-DE-Puck', name: 'Puck (German - Male)', type: 'prebuilt', languageCode: 'de-DE', providerVoiceId: 'Puck' },
  { id: 'de-DE-Enceladus', name: 'Enceladus (German - Female)', type: 'prebuilt', languageCode: 'de-DE', providerVoiceId: 'Enceladus' },
  
  // Japanese
  { id: 'ja-JP-Charon', name: 'Charon (Japanese - Female)', type: 'prebuilt', languageCode: 'ja-JP', providerVoiceId: 'Charon' },
  { id: 'ja-JP-Orus', name: 'Orus (Japanese - Male)', type: 'prebuilt', languageCode: 'ja-JP', providerVoiceId: 'Orus' },

  // Hindi
  { id: 'hi-IN-Zephyr', name: 'Zephyr (Hindi - Female)', type: 'prebuilt', languageCode: 'hi-IN', providerVoiceId: 'Zephyr' },
  { id: 'hi-IN-Sadachbia', name: 'Sadachbia (Hindi - Male)', type: 'prebuilt', languageCode: 'hi-IN', providerVoiceId: 'Sadachbia' },

  // Korean
  { id: 'ko-KR-Kore', name: 'Kore (Korean - Female)', type: 'prebuilt', languageCode: 'ko-KR', providerVoiceId: 'Kore' },
  { id: 'ko-KR-Erinome', name: 'Erinome (Korean - Male)', type: 'prebuilt', languageCode: 'ko-KR', providerVoiceId: 'Erinome' },
  
  // Italian
  { id: 'it-IT-Achernar', name: 'Achernar (Italian - Male)', type: 'prebuilt', languageCode: 'it-IT', providerVoiceId: 'Achernar' },
  { id: 'it-IT-Achird', name: 'Achird (Italian - Female)', type: 'prebuilt', languageCode: 'it-IT', providerVoiceId: 'Achird' },

  // Portuguese (Brazil)
  { id: 'pt-BR-Algieba', name: 'Algieba (Portuguese - Female)', type: 'prebuilt', languageCode: 'pt-BR', providerVoiceId: 'Algieba' },
  { id: 'pt-BR-Alnilam', name: 'Alnilam (Portuguese - Male)', type: 'prebuilt', languageCode: 'pt-BR', providerVoiceId: 'Alnilam' },
  { id: 'pt-BR-Laomedeia', name: 'Laomedeia (Portuguese - Female 2)', type: 'prebuilt', languageCode: 'pt-BR', providerVoiceId: 'Laomedeia' },
  { id: 'pt-BR-Sadaltager', name: 'Sadaltager (Portuguese - Male 2)', type: 'prebuilt', languageCode: 'pt-BR', providerVoiceId: 'Sadaltager' },

  // Russian
  { id: 'ru-RU-Autonoe', name: 'Autonoe (Russian - Female)', type: 'prebuilt', languageCode: 'ru-RU', providerVoiceId: 'Autonoe' },

  // Mandarin Chinese (China)
  { id: 'cmn-CN-Gacrux', name: 'Gacrux (Chinese, Mandarin - Male)', type: 'prebuilt', languageCode: 'cmn-CN', providerVoiceId: 'Gacrux' },
  { id: 'cmn-CN-Pulcherrima', name: 'Pulcherrima (Chinese, Mandarin - Female)', type: 'prebuilt', languageCode: 'cmn-CN', providerVoiceId: 'Pulcherrima' },

  // Mandarin Chinese (Taiwan)
  { id: 'cmn-TW-Gacrux', name: 'Gacrux (Taiwanese Mandarin - Male)', type: 'prebuilt', languageCode: 'cmn-TW', providerVoiceId: 'Gacrux' },
  { id: 'cmn-TW-Pulcherrima', name: 'Pulcherrima (Taiwanese Mandarin - Female)', type: 'prebuilt', languageCode: 'cmn-TW', providerVoiceId: 'Pulcherrima' },
  
  // Dutch
  { id: 'nl-NL-Sulafat', name: 'Sulafat (Dutch - Female)', type: 'prebuilt', languageCode: 'nl-NL', providerVoiceId: 'Sulafat' },

  // Indonesian
  { id: 'id-ID-Laomedeia', name: 'Laomedeia (Indonesian - Female)', type: 'prebuilt', languageCode: 'id-ID', providerVoiceId: 'Laomedeia' },

  // Arabic
  { id: 'ar-XA-Autonoe', name: 'Autonoe (Arabic - Female)', type: 'prebuilt', languageCode: 'ar-XA', providerVoiceId: 'Autonoe' },

  // Filipino
  { id: 'fil-PH-Laomedeia', name: 'Laomedeia (Filipino - Female)', type: 'prebuilt', languageCode: 'fil-PH', providerVoiceId: 'Laomedeia' },

  // Turkish
  { id: 'tr-TR-Enceladus', name: 'Enceladus (Turkish - Female)', type: 'prebuilt', languageCode: 'tr-TR', providerVoiceId: 'Enceladus' },

  // Thai
  { id: 'th-TH-Orus', name: 'Orus (Thai - Male)', type: 'prebuilt', languageCode: 'th-TH', providerVoiceId: 'Orus' },
];
