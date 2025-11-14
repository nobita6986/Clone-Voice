import React, { useState, useMemo } from 'react';
import type { Voice } from '../../types';
import { UploadIcon, FileIcon, TrashIcon, SpinnerIcon } from '../icons/Icons';
import { PREBUILT_VOICES } from '../../constants';

interface NewVoicePageProps {
  onVoiceCreated: (voice: Voice) => void;
}

const languageNames: Record<string, string> = {
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

export const NewVoicePage: React.FC<NewVoicePageProps> = ({ onVoiceCreated }) => {
  const [displayName, setDisplayName] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableLanguages = useMemo(() => {
    return Array.from(
        new Set(PREBUILT_VOICES.map(v => v.languageCode))
    ).map(code => ({
        code,
        name: languageNames[code] || code
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length < 3) {
      setError("Please upload at least 3 audio samples.");
      return;
    }
    setError(null);
    setIsProcessing(true);
    
    // TODO: This is a mock of the voice cloning process.
    // In a real application, you would:
    // 1. Upload files to a secure storage like Google Cloud Storage.
    // 2. Call a backend API endpoint.
    // 3. The backend would then call the Google Cloud TTS/Vertex AI API to create a custom voice.
    // 4. The backend would return the new voice profile details.
    
    setTimeout(() => {
      // FIX: Instead of a fake ID, map the custom voice to a real, pre-built voice
      // of the selected language to prevent API errors.
      const baseVoice = PREBUILT_VOICES.find(v => v.languageCode === language) || PREBUILT_VOICES[0];

      const newVoice: Voice = {
        id: `custom-${Date.now()}`,
        name: `${displayName} (Custom)`,
        type: 'custom',
        languageCode: language,
        providerVoiceId: baseVoice.providerVoiceId,
      };
      onVoiceCreated(newVoice);
      setDisplayName('');
      setFiles([]);
      setIsProcessing(false);
    }, 2500);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Create New Voice Profile</h1>
        <p className="text-gray-400 mt-1">Upload audio samples to clone a voice. (This is a demonstration)</p>
      </header>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-xl shadow-lg">
        <div>
          <label htmlFor="voice-name" className="block text-sm font-medium text-gray-300 mb-2">
            Display Name
          </label>
          <input
            type="text"
            id="voice-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="e.g., My Voice, Project Narrator"
            required
            className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
        
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
            Language
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue"
          >
            {availableLanguages.map(({ code, name }) => (
                <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Upload Voice Samples (3-10 files)
          </label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadIcon />
              <div className="flex text-sm text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-brand-blue hover:text-brand-teal focus-within:outline-none"
                >
                  <span>Upload files</span>
                  <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" onChange={handleFileChange} accept="audio/wav, audio/mp3"/>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">WAV or MP3 files</p>
            </div>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Uploaded files:</h3>
            <ul className="max-h-40 overflow-y-auto bg-gray-700 p-2 rounded-lg">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center text-sm p-2 rounded hover:bg-gray-600">
                  <div className="flex items-center gap-2 truncate">
                    <FileIcon />
                    <span className="truncate">{file.name}</span>
                  </div>
                  <button type="button" onClick={() => removeFile(index)} className="text-red-400 hover:text-red-300">
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={isProcessing || files.length < 3 || !displayName}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-brand-blue to-brand-teal text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {isProcessing ? (
            <>
              <SpinnerIcon />
              Creating Voice Profile...
            </>
          ) : 'Create Voice Profile'}
        </button>
      </form>
    </div>
  );
};
