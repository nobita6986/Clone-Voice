import type { Voice } from './types';

export const PREBUILT_VOICES: Voice[] = [
  // English (US)
  { id: 'en-US-Zephyr', name: 'Zephyr', displayName: 'Female 1', gender: 'Female', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Zephyr' },
  { id: 'en-US-Puck', name: 'Puck', displayName: 'Male 1', gender: 'Male', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Puck' },
  { id: 'en-US-Algenib', name: 'Algenib', displayName: 'Male 2', gender: 'Male', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Algenib' },
  { id: 'en-US-Rasalgethi', name: 'Rasalgethi', displayName: 'Male 3', gender: 'Male', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Rasalgethi' },
  { id: 'en-US-Umbriel', name: 'Umbriel', displayName: 'Female 2', gender: 'Female', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Umbriel' },
  { id: 'en-US-Vindemiatrix', name: 'Vindemiatrix', displayName: 'Female 3', gender: 'Female', type: 'prebuilt', languageCode: 'en-US', providerVoiceId: 'Vindemiatrix' },

  // English (UK)
  { id: 'en-GB-Charon', name: 'Charon', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'en-GB', providerVoiceId: 'Charon' },
  { id: 'en-GB-Schedar', name: 'Schedar', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'en-GB', providerVoiceId: 'Schedar' },

  // English (Australia)
  { id: 'en-AU-Achernar', name: 'Achernar', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'en-AU', providerVoiceId: 'Achernar' },
  { id: 'en-AU-Achird', name: 'Achird', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'en-AU', providerVoiceId: 'Achird' },

  // English (India)
  { id: 'en-IN-Sadachbia-EN', name: 'Sadachbia', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'en-IN', providerVoiceId: 'Sadachbia' },
  { id: 'en-IN-Zephyr-EN', name: 'Zephyr', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'en-IN', providerVoiceId: 'Zephyr' },

  // Vietnamese
  { id: 'vi-VN-Kore', name: 'Kore', displayName: 'Female 1', gender: 'Female', type: 'prebuilt', languageCode: 'vi-VN', providerVoiceId: 'Kore' },
  { id: 'vi-VN-Aoede', name: 'Aoede', displayName: 'Female 2', gender: 'Female', type: 'prebuilt', languageCode: 'vi-VN', providerVoiceId: 'Aoede' },
  { id: 'vi-VN-Zubenelgenubi', name: 'Zubenelgenubi', displayName: 'Male 1', gender: 'Male', type: 'prebuilt', languageCode: 'vi-VN', providerVoiceId: 'Zubenelgenubi' },

  // French
  { id: 'fr-FR-Kore', name: 'Kore', displayName: 'Female 1', gender: 'Female', type: 'prebuilt', languageCode: 'fr-FR', providerVoiceId: 'Kore' },
  { id: 'fr-FR-Callirrhoe', name: 'Callirrhoe', displayName: 'Female 2', gender: 'Female', type: 'prebuilt', languageCode: 'fr-FR', providerVoiceId: 'Callirrhoe' },
  { id: 'fr-FR-Despina', name: 'Despina', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'fr-FR', providerVoiceId: 'Despina' },

  // Spanish (Spain)
  { id: 'es-ES-Fenrir', name: 'Fenrir', displayName: 'Male 1', gender: 'Male', type: 'prebuilt', languageCode: 'es-ES', providerVoiceId: 'Fenrir' },
  { id: 'es-ES-Iapetus', name: 'Iapetus', displayName: 'Male 2', gender: 'Male', type: 'prebuilt', languageCode: 'es-ES', providerVoiceId: 'Iapetus' },
  { id: 'es-ES-Leda', name: 'Leda', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'es-ES', providerVoiceId: 'Leda' },
  
  // Spanish (US)
  { id: 'es-US-Iapetus', name: 'Iapetus', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'es-US', providerVoiceId: 'Iapetus' },
  { id: 'es-US-Leda', name: 'Leda', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'es-US', providerVoiceId: 'Leda' },

  // German
  { id: 'de-DE-Puck', name: 'Puck', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'de-DE', providerVoiceId: 'Puck' },
  { id: 'de-DE-Enceladus', name: 'Enceladus', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'de-DE', providerVoiceId: 'Enceladus' },
  
  // Japanese
  { id: 'ja-JP-Charon', name: 'Charon', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'ja-JP', providerVoiceId: 'Charon' },
  { id: 'ja-JP-Orus', name: 'Orus', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'ja-JP', providerVoiceId: 'Orus' },

  // Hindi
  { id: 'hi-IN-Zephyr', name: 'Zephyr', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'hi-IN', providerVoiceId: 'Zephyr' },
  { id: 'hi-IN-Sadachbia', name: 'Sadachbia', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'hi-IN', providerVoiceId: 'Sadachbia' },

  // Korean
  { id: 'ko-KR-Kore', name: 'Kore', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'ko-KR', providerVoiceId: 'Kore' },
  { id: 'ko-KR-Erinome', name: 'Erinome', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'ko-KR', providerVoiceId: 'Erinome' },
  
  // Italian
  { id: 'it-IT-Achernar', name: 'Achernar', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'it-IT', providerVoiceId: 'Achernar' },
  { id: 'it-IT-Achird', name: 'Achird', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'it-IT', providerVoiceId: 'Achird' },

  // Portuguese (Brazil)
  { id: 'pt-BR-Algieba', name: 'Algieba', displayName: 'Female 1', gender: 'Female', type: 'prebuilt', languageCode: 'pt-BR', providerVoiceId: 'Algieba' },
  { id: 'pt-BR-Alnilam', name: 'Alnilam', displayName: 'Male 1', gender: 'Male', type: 'prebuilt', languageCode: 'pt-BR', providerVoiceId: 'Alnilam' },
  { id: 'pt-BR-Laomedeia', name: 'Laomedeia', displayName: 'Female 2', gender: 'Female', type: 'prebuilt', languageCode: 'pt-BR', providerVoiceId: 'Laomedeia' },
  { id: 'pt-BR-Sadaltager', name: 'Sadaltager', displayName: 'Male 2', gender: 'Male', type: 'prebuilt', languageCode: 'pt-BR', providerVoiceId: 'Sadaltager' },

  // Russian
  { id: 'ru-RU-Autonoe', name: 'Autonoe', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'ru-RU', providerVoiceId: 'Autonoe' },

  // Mandarin Chinese (China)
  { id: 'cmn-CN-Gacrux', name: 'Gacrux', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'cmn-CN', providerVoiceId: 'Gacrux' },
  { id: 'cmn-CN-Pulcherrima', name: 'Pulcherrima', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'cmn-CN', providerVoiceId: 'Pulcherrima' },

  // Mandarin Chinese (Taiwan)
  { id: 'cmn-TW-Gacrux', name: 'Gacrux', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'cmn-TW', providerVoiceId: 'Gacrux' },
  { id: 'cmn-TW-Pulcherrima', name: 'Pulcherrima', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'cmn-TW', providerVoiceId: 'Pulcherrima' },
  
  // Dutch
  { id: 'nl-NL-Sulafat', name: 'Sulafat', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'nl-NL', providerVoiceId: 'Sulafat' },

  // Indonesian
  { id: 'id-ID-Laomedeia', name: 'Laomedeia', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'id-ID', providerVoiceId: 'Laomedeia' },

  // Arabic
  { id: 'ar-XA-Autonoe', name: 'Autonoe', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'ar-XA', providerVoiceId: 'Autonoe' },

  // Filipino
  { id: 'fil-PH-Laomedeia', name: 'Laomedeia', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'fil-PH', providerVoiceId: 'Laomedeia' },

  // Turkish
  { id: 'tr-TR-Enceladus', name: 'Enceladus', displayName: 'Female', gender: 'Female', type: 'prebuilt', languageCode: 'tr-TR', providerVoiceId: 'Enceladus' },

  // Thai
  { id: 'th-TH-Orus', name: 'Orus', displayName: 'Male', gender: 'Male', type: 'prebuilt', languageCode: 'th-TH', providerVoiceId: 'Orus' },
];

export const LANGUAGE_NAMES: Record<string, string> = {
    'en-US': 'English (US)',
    'en-GB': 'English (UK)',
    'en-AU': 'English (Australia)',
    'en-IN': 'English (India)',
    'vi-VN': 'Vietnamese',
    'fr-FR': 'French',
    'es-ES': 'Spanish (Spain)',
    'es-US': 'Spanish (US)',
    'de-DE': 'German',
    'ja-JP': 'Japanese',
    'hi-IN': 'Hindi',
    'ko-KR': 'Korean',
    'it-IT': 'Italian',
    'pt-BR': 'Portuguese (Brazil)',
    'ru-RU': 'Russian',
    'cmn-CN': 'Mandarin (China)',
    'cmn-TW': 'Mandarin (Taiwan)',
    'nl-NL': 'Dutch',
    'id-ID': 'Indonesian',
    'ar-XA': 'Arabic',
    'fil-PH': 'Filipino',
    'tr-TR': 'Turkish',
    'th-TH': 'Thai'
};
