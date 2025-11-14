
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './components/pages/DashboardPage';
import { TTSPage } from './components/pages/TTSPage';
import { NewVoicePage } from './components/pages/NewVoicePage';
import { HistoryPage } from './components/pages/HistoryPage';
import type { Page, Voice, HistoryItem } from './types';
import { PREBUILT_VOICES } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('tts');
  const [customVoices, setCustomVoices] = useState<Voice[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

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
        return <TTSPage voices={allVoices} onGenerationComplete={addHistoryItem} />;
      case 'new-voice':
        return <NewVoicePage onVoiceCreated={(voice) => setCustomVoices(prev => [...prev, voice])} />;
      case 'history':
        return <HistoryPage history={history} voices={allVoices} />;
      default:
        return <TTSPage voices={allVoices} onGenerationComplete={addHistoryItem} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
