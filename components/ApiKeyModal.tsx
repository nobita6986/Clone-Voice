
import React, { useState, useEffect } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  currentApiKey: string | null;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, currentApiKey }) => {
  const [apiKeyInput, setApiKeyInput] = useState('');

  useEffect(() => {
    setApiKeyInput(currentApiKey || '');
  }, [currentApiKey, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(apiKeyInput.trim());
  };
  
  // Trình xử lý đóng bây giờ luôn gọi onClose, cho phép người dùng
  // đóng hộp thoại ngay cả khi chưa có khóa nào được đặt.
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-lg mx-4">
        <h2 className="text-2xl font-bold text-white mb-4">Cài đặt API Key</h2>
        <p className="text-gray-400 mb-6">
          Vui lòng nhập khóa API Google Gemini của bạn. Bạn có thể tạo một khóa mới tại {' '}
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue hover:underline"
          >
            Google AI Studio
          </a>.
        </p>
        
        <div>
          <label htmlFor="api-key-input" className="block text-sm font-medium text-gray-300 mb-2">
            Khóa API Gemini
          </label>
          <input
            id="api-key-input"
            type="password"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue"
            placeholder="Dán khóa API của bạn vào đây"
          />
        </div>
        
        <div className="mt-8 flex justify-end gap-4">
          {/* Nút Hủy bây giờ luôn hiển thị */}
          <button
            onClick={handleClose}
            className="px-6 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            disabled={!apiKeyInput.trim()}
            className="px-6 py-2 rounded-lg bg-brand-blue text-white font-semibold hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
