
import React, { useState, useEffect, useCallback } from 'react';
import type { Voice, HistoryItem } from '../../types';
import { generateSpeech } from '../../services/geminiService';
import AudioPlayer from '../AudioPlayer';
import { SpinnerIcon } from '../icons/Icons';

interface TTSPageProps {
  voices: Voice[];
  onGenerationComplete: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => void;
  activeApiKey: string | null;
  selectedModel: string;
  openApiKeyManager: () => void;
}

const placeholderTexts: Record<string, string> = {
  'en-US': 'Hello! Welcome to VoiceClone Studio, powered by Gemini.',
  'en-GB': 'Hello! Welcome to VoiceClone Studio, powered by Gemini.',
  'en-AU': 'G\'day! Welcome to VoiceClone Studio, powered by Gemini.',
  'en-IN': 'Hello! Welcome to VoiceClone Studio, powered by Gemini.',
  'de-DE': 'Hallo! Willkommen im VoiceClone Studio, angetrieben von Gemini.',
  'es-ES': '¡Hola! Bienvenido a VoiceClone Studio, con la tecnología de Gemini.',
  'es-US': '¡Hola! Bienvenido a VoiceClone Studio, con la tecnología de Gemini.',
  'fr-FR': 'Bonjour! Bienvenue sur VoiceClone Studio, propulsé par Gemini.',
  'hi-IN': 'नमस्ते! जेमिनी द्वारा संचालित वॉयसक्लोन स्टूडियो में आपका स्वागत है।',
  'ja-JP': 'こんにちは！Geminiを搭載したVoiceClone Studioへようこそ。',
  'ko-KR': '안녕하세요! Gemini가 제공하는 VoiceClone Studio에 오신 것을 환영합니다.',
  'vi-VN': 'Xin chào! Chào mừng bạn đến với VoiceClone Studio, được cung cấp bởi Gemini.',
  'it-IT': 'Ciao! Benvenuto in VoiceClone Studio, potenziato da Gemini.',
  'pt-BR': 'Olá! Bem-vindo ao VoiceClone Studio, desenvolvido com Gemini.',
  'ru-RU': 'Привет! Добро пожаловать в VoiceClone Studio на базе Gemini.',
  'cmn-CN': '你好！欢迎使用由 Gemini 驱动的 VoiceClone Studio。',
  'cmn-TW': '你好！歡迎使用由 Gemini 驅動的 VoiceClone Studio。',
  'nl-NL': 'Hallo! Welkom bij VoiceClone Studio, mogelijk gemaakt door Gemini.',
  'id-ID': 'Halo! Selamat datang di VoiceClone Studio, didukung oleh Gemini.',
  'ar-XA': 'مرحبًا! أهلاً بك في استوديو VoiceClone، المدعوم بواسطة Gemini.',
  'fil-PH': 'Kamusta! Maligayang pagdating sa VoiceClone Studio, na pinapagana ng Gemini.',
  'tr-TR': 'Merhaba! Gemini tarafından desteklenen VoiceClone Studio\'ya hoş geldiniz.',
  'th-TH': 'สวัสดี! ยินดีต้อนรับสู่ VoiceClone Studio ที่ขับเคลื่อนโดย Gemini',
};


export const TTSPage: React.FC<TTSPageProps> = ({ voices, onGenerationComplete, activeApiKey, selectedModel, openApiKeyManager }) => {
  const [text, setText] = useState('Hello! Welcome to VoiceClone Studio, powered by Gemini.');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(voices[0]?.id || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedAudio, setGeneratedAudio] = useState<string>('');
  
  const selectedVoice = voices.find(v => v.id === selectedVoiceId);

  useEffect(() => {
    // Set default selection to the first available prebuilt voice
    const firstPrebuilt = voices.find(v => v.type === 'prebuilt');
    if (!selectedVoiceId && firstPrebuilt) {
      setSelectedVoiceId(firstPrebuilt.id);
    }
  }, [voices, selectedVoiceId]);


  useEffect(() => {
    if (selectedVoice) {
      setText(placeholderTexts[selectedVoice.languageCode] || placeholderTexts['en-US']);
    }
  }, [selectedVoice]);

  const handleGenerate = useCallback(async () => {
    if (!text || !selectedVoice || !activeApiKey) return;

    setIsLoading(true);
    setError(null);
    setGeneratedAudio('');

    try {
      const audioData = await generateSpeech(text, selectedVoice.providerVoiceId, activeApiKey, selectedModel);
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
  }, [text, selectedVoice, onGenerationComplete, activeApiKey, selectedModel]);
  
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Generate Speech</h1>
        <p className="text-gray-400 mt-1">Transform your text into lifelike speech with a single click.</p>
      </header>

      {!activeApiKey && (
        <div className="mb-6 p-4 bg-yellow-900/50 border border-yellow-500 text-yellow-300 rounded-lg">
          <p className="font-bold">API Key Required</p>
          <p>
            Please {' '}
            <button onClick={openApiKeyManager} className="underline hover:text-yellow-200">
              add and activate an API key
            </button>
            {' '} to generate audio.
          </p>
        </div>
      )}

      <div className="space-y-6 bg-gray-800 p-6 rounded-xl shadow-lg">
        <div>
          <label htmlFor="voice-select" className="block text-sm font-medium text-gray-300 mb-2">
            Select a Voice
          </label>
          <select
            id="voice-select"
            value={selectedVoiceId}
            onChange={(e) => setSelectedVoiceId(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue"
          >
            <optgroup label="Pre-built Voices">
              {voices.filter(v => v.type === 'prebuilt').map(voice => (
                <option key={voice.id} value={voice.id}>{voice.name}</option>
              ))}
            </optgroup>
            <optgroup label="Custom Voices (Demo)">
              {voices.filter(v => v.type === 'custom').map(voice => (
                <option key={voice.id} value={voice.id} disabled className="text-gray-500">
                  {voice.name} (Not available)
                </option>
              ))}
            </optgroup>
          </select>
        </div>

        <div>
          <label htmlFor="tts-text" className="block text-sm font-medium text-gray-300 mb-2">
            Enter Text
          </label>
          <textarea
            id="tts-text"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue resize-y"
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{text.length} characters</p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading || !text || !activeApiKey}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-brand-blue to-brand-teal text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {isLoading ? (
            <>
              <SpinnerIcon />
              Generating...
            </>
          ) : 'Generate Audio'}
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {generatedAudio && <AudioPlayer base64Audio={generatedAudio} />}
    </div>
  );
};
