
import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './components/pages/DashboardPage';
import { TTSPage } from './components/pages/TTSPage';
import { NewVoicePage } from './components/pages/NewVoicePage';
import { HistoryPage } from './components/pages/HistoryPage';
import ApiKeyManager from './components/ApiKeyManager';
import type { Page, Voice, HistoryItem, ApiKey } from './types';
import { PREBUILT_VOICES } from './constants';

const AVAILABLE_MODELS = ['gemini-2.5-flash-preview-tts'];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('tts');
  const [customVoices, setCustomVoices] = useState<Voice[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // API Key and Model Management State
  const [isApiKeyManagerOpen, setIsApiKeyManagerOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(() => {
    const saved = localStorage.getItem('apiKeys');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeApiKeyId, setActiveApiKeyId] = useState<string | null>(() => {
    return localStorage.getItem('activeApiKeyId');
  });
  const [selectedModel, setSelectedModel] = useState<string>(() => {
    return localStorage.getItem('selectedModel') || AVAILABLE_MODELS[0];
  });

  useEffect(() => {
    localStorage.setItem('apiKeys', JSON.stringify(apiKeys));
  }, [apiKeys]);
  
  useEffect(() => {
    if (activeApiKeyId) {
      localStorage.setItem('activeApiKeyId', activeApiKeyId);
    } else {
      localStorage.removeItem('activeApiKeyId');
    }
  }, [activeApiKeyId]);
  
  useEffect(() => {
    localStorage.setItem('selectedModel', selectedModel);
  }, [selectedModel]);

  const activeApiKey = useMemo(() => {
    return apiKeys.find(k => k.id === activeApiKeyId)?.key || null;
  }, [apiKeys, activeApiKeyId]);


  const allVoices = [...PREBUILT_VOICES, ...customVoices];

  const addHistoryItem = (item: Omit<HistoryItem, 'id' | 'createdAt'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setHistory(prev => [newItem, ...prev]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage history={history} customVoiceCount={customVoices.length} />;
      case 'tts':
        return <TTSPage voices={allVoices} onGenerationComplete={addHistoryItem} activeApiKey={activeApiKey} selectedModel={selectedModel} openApiKeyManager={() => setIsApiKeyManagerOpen(true)}/>;
      case 'new-voice':
        return <NewVoicePage onVoiceCreated={(voice) => setCustomVoices(prev => [...prev, voice])} />;
      case 'history':
        return <HistoryPage history={history} voices={allVoices} />;
      default:
        return <TTSPage voices={allVoices} onGenerationComplete={addHistoryItem} activeApiKey={activeApiKey} selectedModel={selectedModel} openApiKeyManager={() => setIsApiKeyManagerOpen(true)} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onOpenApiKeyManager={() => setIsApiKeyManagerOpen(true)}
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
      <ApiKeyManager
        isOpen={isApiKeyManagerOpen}
        onClose={() => setIsApiKeyManagerOpen(false)}
        apiKeys={apiKeys}
        setApiKeys={setApiKeys}
        activeApiKeyId={activeApiKeyId}
        setActiveApiKeyId={setActiveApiKeyId}
        models={AVAILABLE_MODELS}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
      />
    </div>
  );
};

export default App;
