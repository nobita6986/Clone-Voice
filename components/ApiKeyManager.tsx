
import React, { useState } from 'react';
import type { ApiKey } from '../types';
import { CloseIcon, TrashIcon } from './icons/Icons';

interface ApiKeyManagerProps {
  isOpen: boolean;
  onClose: () => void;
  apiKeys: ApiKey[];
  setApiKeys: React.Dispatch<React.SetStateAction<ApiKey[]>>;
  activeApiKeyId: string | null;
  setActiveApiKeyId: React.Dispatch<React.SetStateAction<string | null>>;
  models: string[];
  selectedModel: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({
  isOpen, onClose, apiKeys, setApiKeys, activeApiKeyId, setActiveApiKeyId, models, selectedModel, setSelectedModel
}) => {
  const [newKey, setNewKey] = useState('');

  if (!isOpen) return null;

  const handleAddKey = () => {
    if (newKey.trim()) {
      const keyToAdd: ApiKey = { id: `key-${Date.now()}`, key: newKey.trim() };
      const newKeys = [...apiKeys, keyToAdd];
      setApiKeys(newKeys);
      if (!activeApiKeyId) {
        setActiveApiKeyId(keyToAdd.id);
      }
      setNewKey('');
    }
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(k => k.id !== id));
    if (activeApiKeyId === id) {
      setActiveApiKeyId(null);
    }
  };

  const maskKey = (key: string) => {
    if (key.length < 8) return '****';
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity" onClick={onClose}>
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg relative animate-fade-in" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">API Settings</h2>
        
        <div className="space-y-6">
          {/* Add API Key Section */}
          <div>
            <label htmlFor="api-key-input" className="block text-sm font-medium text-gray-300 mb-2">Add New API Key</label>
            <div className="flex gap-2">
              <input
                id="api-key-input"
                type="password"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="Paste your API key here"
                className="flex-grow bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue"
              />
              <button onClick={handleAddKey} className="bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors">
                Add
              </button>
            </div>
          </div>

          {/* API Key List */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Managed Keys</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto bg-gray-900/50 p-3 rounded-lg">
              {apiKeys.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No API keys added yet.</p>
              ) : (
                apiKeys.map(apiKey => (
                  <div key={apiKey.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                    <p className="font-mono text-gray-300">{maskKey(apiKey.key)}</p>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setActiveApiKeyId(apiKey.id)}
                        className={`text-xs px-3 py-1 rounded-full ${activeApiKeyId === apiKey.id ? 'bg-green-500 text-white cursor-default' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                      >
                        {activeApiKeyId === apiKey.id ? 'Active' : 'Set Active'}
                      </button>
                      <button onClick={() => handleDeleteKey(apiKey.id)} className="text-red-400 hover:text-red-300 p-1">
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <label htmlFor="model-select" className="block text-sm font-medium text-gray-300 mb-2">
              Select AI Model
            </label>
            <select
              id="model-select"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 text-white rounded-lg p-3 focus:ring-brand-blue focus:border-brand-blue"
            >
              {models.map(model => (
                <option key={model} value={model}>{model}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyManager;
