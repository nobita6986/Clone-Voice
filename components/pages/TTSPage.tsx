import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Voice, HistoryItem } from '../../types';
import { generateSpeech } from '../../services/geminiService';
import AudioPlayer from '../AudioPlayer';
import { SpinnerIcon } from '../icons/Icons';

interface TTSPageProps {
  voices: Voice[];
  onGenerationComplete: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => void;
}

export const TTSPage: React.FC<TTSPageProps> = ({ voices, onGenerationComplete }) => {
  const [text, setText] = useState('Xin chào! Chào mừng đến với VoiceClone Studio, được cung cấp bởi Gemini.');
  const [selectedLanguageCode, setSelectedLanguageCode] = useState<string>('');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAudio, setGeneratedAudio] = useState<string>('');
  
  const languages = useMemo(() => {
    const langMap = new Map<string, { code: string; name: string }>();
    voices.forEach(v => {
      if (!langMap.has(v.languageCode)) {
        langMap.set(v.languageCode, { code: v.languageCode, name: v.languageName });
      }
    });
    const sortedLangs = Array.from(langMap.values());
    
    sortedLangs.sort((a, b) => {
      const aPrio = a.code.startsWith('en-') ? 1 : a.code === 'vi-VN' ? 2 : 3;
      const bPrio = b.code.startsWith('en-') ? 1 : b.code === 'vi-VN' ? 2 : 3;
      
      if (aPrio !== bPrio) {
          return aPrio - bPrio;
      }
      return a.name.localeCompare(b.name);
    });
    return sortedLangs;
  }, [voices]);

  const voicesForSelectedLanguage = useMemo(() => {
    return voices.filter(v => v.languageCode === selectedLanguageCode);
  }, [voices, selectedLanguageCode]);

  useEffect(() => {
    // Set initial language once languages are available
    if (languages.length > 0 && !selectedLanguageCode) {
      const initialLang = languages[0];
      setSelectedLanguageCode(initialLang.code);
    }
  }, [languages, selectedLanguageCode]);

  useEffect(() => {
    // Update voice when language or available voices change
    if (voicesForSelectedLanguage.length > 0) {
      // Set to first voice if no voice is selected or the current one is invalid
      if (!selectedVoiceId || !voicesForSelectedLanguage.some(v => v.id === selectedVoiceId)) {
        setSelectedVoiceId(voicesForSelectedLanguage[0].id);
      }
    } else {
        setSelectedVoiceId('');
    }
  }, [voicesForSelectedLanguage, selectedVoiceId]);

  const handleGenerate = useCallback(async () => {
    const selectedVoice = voices.find(v => v.id === selectedVoiceId);
    if (!text || !selectedVoice) return;

    setIsLoading(true);
    setError(null);
    setGeneratedAudio('');

    try {
      const audioData = await generateSpeech(text, selectedVoice.providerVoiceId);
      setGeneratedAudio(audioData);
      onGenerationComplete({
        text,
        voiceId: selectedVoice.id,
        audioData,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [text, selectedVoiceId, voices, onGenerationComplete]);
  
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Tạo giọng nói</h1>
        <p className="text-gray-400 mt-1">Biến văn bản của bạn thành giọng nói sống động như thật chỉ bằng một cú nhấp chuột.</p>
      </header>

      <div className="space-y-6 bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="language-select" className="block text-sm font-medium text-gray-300 mb-2">
              Chọn ngôn ngữ
            </label>
            <select
              id="language-select"
              value={selectedLanguageCode}
              onChange={(e) => setSelectedLanguageCode(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="voice-select" className="block text-sm font-medium text-gray-300 mb-2">
              Chọn giọng nói
            </label>
            <select
              id="voice-select"
              value={selectedVoiceId}
              onChange={(e) => setSelectedVoiceId(e.target.value)}
              disabled={voicesForSelectedLanguage.length === 0}
              className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue disabled:opacity-50"
            >
              <optgroup label="Giọng nói tùy chỉnh">
                {voicesForSelectedLanguage.filter(v => v.type === 'custom').map(voice => (
                  <option key={voice.id} value={voice.id}>{voice.name}</option>
                ))}
              </optgroup>
              <optgroup label="Giọng nói có sẵn">
                {voicesForSelectedLanguage.filter(v => v.type === 'prebuilt').map(voice => (
                  <option key={voice.id} value={voice.id}>{voice.name}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="tts-text" className="block text-sm font-medium text-gray-300 mb-2">
            Nhập văn bản
          </label>
          <textarea
            id="tts-text"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Nhập hoặc dán văn bản của bạn tại đây..."
            className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue resize-y"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{text.length} ký tự</p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !text || !selectedVoiceId}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-brand-blue to-brand-teal text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <>
              <SpinnerIcon />
              Đang tạo...
            </>
          ) : 'Tạo âm thanh'}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
          <p className="font-bold">Lỗi</p>
          <p>{error}</p>
        </div>
      )}

      {generatedAudio && <AudioPlayer base64Audio={generatedAudio} />}
    </div>
  );
};