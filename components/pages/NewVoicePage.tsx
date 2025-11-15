
import React, { useState } from 'react';
import type { Voice } from '../../types';
import { UploadIcon, FileIcon, TrashIcon, SpinnerIcon } from '../icons/Icons';

interface NewVoicePageProps {
  onVoiceCreated: (voice: Omit<Voice, 'id' | 'type'>) => void;
}

const languageOptions: Record<string, string> = {
  'en-US': 'Tiếng Anh (Mỹ)',
  'vi-VN': 'Tiếng Việt',
  'en-GB': 'Tiếng Anh (Anh)',
  'fr-FR': 'Tiếng Pháp',
  'es-ES': 'Tiếng Tây Ban Nha',
  'de-DE': 'Tiếng Đức',
  'ja-JP': 'Tiếng Nhật',
  'ko-KR': 'Tiếng Hàn',
};

// Maps a language code to a functional, pre-built Gemini voice provider ID.
// This makes the "cloned" voice actually work for generation in this demo.
const providerVoiceMapping: Record<string, string> = {
  'en-US': 'Zephyr',
  'en-GB': 'Charon',
  'fr-FR': 'Kore',
  'es-ES': 'Fenrir',
  // Fallback to Zephyr for languages without a dedicated Gemini voice
  'vi-VN': 'Zephyr',
  'de-DE': 'Zephyr',
  'ja-JP': 'Zephyr',
  'ko-KR': 'Zephyr',
};

export const NewVoicePage: React.FC<NewVoicePageProps> = ({ onVoiceCreated }) => {
  const [displayName, setDisplayName] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setError("Vui lòng tải lên ít nhất 3 mẫu âm thanh.");
      return;
    }
    setError(null);
    setIsProcessing(true);
    
    // This is a mock of the voice cloning process. For this demo, we will
    // create a custom voice profile that maps to a pre-built Gemini voice
    // based on the selected language, making it functional in the app.
    // The result will be persisted to Supabase.
    setTimeout(() => {
      const newVoiceData = {
        name: `${displayName} (Tùy chỉnh)`,
        languageCode: language,
        languageName: languageOptions[language],
        providerVoiceId: providerVoiceMapping[language] || 'Zephyr',
      };
      onVoiceCreated(newVoiceData);
      setDisplayName('');
      setFiles([]);
      setIsProcessing(false);
    }, 2500);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Tạo hồ sơ giọng nói mới</h1>
        <p className="text-gray-400 mt-1">Tải lên các mẫu âm thanh để nhân bản giọng nói. <strong className="text-yellow-400/90">Tính năng này là một bản trình diễn.</strong> Giọng nói tùy chỉnh được tạo sẽ sử dụng một giọng nói có sẵn tiêu chuẩn cho ngôn ngữ đã chọn để tạo âm thanh.</p>
      </header>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-xl shadow-lg">
        <div>
          <label htmlFor="voice-name" className="block text-sm font-medium text-gray-300 mb-2">
            Tên hiển thị
          </label>
          <input
            type="text"
            id="voice-name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="ví dụ: Giọng của tôi, Người dẫn chuyện dự án"
            required
            className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue"
          />
        </div>
        
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-300 mb-2">
            Ngôn ngữ
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue"
          >
            {Object.entries(languageOptions).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tải lên mẫu giọng nói (3-10 tệp)
          </label>
          <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadIcon />
              <div className="flex text-sm text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-brand-blue hover:text-brand-teal focus-within:outline-none"
                >
                  <span>Tải lên tệp</span>
                  <input id="file-upload" name="file-upload" type="file" multiple className="sr-only" onChange={handleFileChange} accept="audio/wav, audio/mp3"/>
                </label>
                <p className="pl-1">hoặc kéo và thả</p>
              </div>
              <p className="text-xs text-gray-500">Tệp WAV hoặc MP3</p>
            </div>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-300">Các tệp đã tải lên:</h3>
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
              Đang tạo hồ sơ giọng nói...
            </>
          ) : 'Tạo hồ sơ giọng nói'}
        </button>
      </form>
    </div>
  );
};
