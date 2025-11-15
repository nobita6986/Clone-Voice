
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './components/pages/DashboardPage';
import { TTSPage } from './components/pages/TTSPage';
import { NewVoicePage } from './components/pages/NewVoicePage';
import { HistoryPage } from './components/pages/HistoryPage';
import type { Page, Voice, HistoryItem } from './types';
import { PREBUILT_VOICES } from './constants';
import { supabase } from './supabaseClient';
import type { Session } from '@supabase/supabase-js';
import ApiKeyModal from './components/ApiKeyModal';
import LoginModal from './components/LoginModal';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('tts');
  const [customVoices, setCustomVoices] = useState<Voice[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
    // Hộp thoại không còn được mở tự động khi khởi động.
    // Nó bây giờ chỉ được mở bởi người dùng nhấp vào nút cài đặt.
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_OUT') {
        setCustomVoices([]);
        setHistory([]);
      }
      // Close login modal on successful login
      if (_event === 'SIGNED_IN') {
        setIsLoginModalOpen(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const { data: voicesData, error: voicesError } = await supabase
          .from('voices')
          .select('*')
          .order('created_at', { ascending: false });

        if (voicesError) {
          console.error('Error fetching voices:', voicesError);
        } else if (voicesData) {
          const formattedVoices = voicesData.map(v => ({
            id: v.id,
            name: v.name,
            type: 'custom',
            languageCode: v.language_code,
            languageName: v.language_name,
            providerVoiceId: v.provider_voice_id,
          })) as Voice[];
          setCustomVoices(formattedVoices);
        }
        
        const { data: historyData, error: historyError } = await supabase
          .from('history')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (historyError) {
          console.error('Error fetching history:', historyError);
        } else if (historyData) {
           const formattedHistory = historyData.map(item => ({
             id: item.id,
             text: item.text,
             voiceId: item.voice_id,
             audioData: item.audio_data,
             createdAt: new Date(item.created_at),
           })) as HistoryItem[];
           setHistory(formattedHistory);
        }
      }
    };
    fetchData();
  }, [session]);
  
  const allVoices = [...PREBUILT_VOICES, ...customVoices];

  const addHistoryItem = async (item: Omit<HistoryItem, 'id' | 'createdAt'>) => {
      if (!session) {
        setIsLoginModalOpen(true);
        return;
      }
      const { data, error } = await supabase
        .from('history')
        .insert([{ 
            text: item.text,
            voice_id: item.voiceId,
            audio_data: item.audioData
        }])
        .select()
        .single();

      if (error) {
          console.error("Error saving history:", error);
      } else if (data) {
          const newItem: HistoryItem = {
            id: data.id,
            text: data.text,
            voiceId: data.voice_id,
            audioData: data.audio_data,
            createdAt: new Date(data.created_at)
          };
          setHistory(prev => [newItem, ...prev]);
      }
  };
  
  const addCustomVoice = async (voice: Omit<Voice, 'id' | 'type'>) => {
    if (!session) {
      setIsLoginModalOpen(true);
      return;
    }
    const { data, error } = await supabase
      .from('voices')
      .insert([{
          name: voice.name,
          language_code: voice.languageCode,
          language_name: voice.languageName,
          provider_voice_id: voice.providerVoiceId,
      }])
      .select()
      .single();
      
    if (error) {
      console.error("Error creating voice:", error);
    } else if (data) {
      const newVoice: Voice = { 
        id: data.id,
        name: data.name,
        type: 'custom',
        languageCode: data.language_code,
        languageName: data.language_name,
        providerVoiceId: data.provider_voice_id,
      };
      setCustomVoices(prev => [newVoice, ...prev]);
    }
  }

  const handleApiKeySave = (newKey: string) => {
    if (newKey) {
      setApiKey(newKey);
      localStorage.setItem('gemini_api_key', newKey);
      setIsApiKeyModalOpen(false);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage history={history} customVoiceCount={customVoices.length} />;
      case 'tts':
        return <TTSPage voices={allVoices} onGenerationComplete={addHistoryItem} apiKey={apiKey} />;
      case 'new-voice':
        return <NewVoicePage onVoiceCreated={addCustomVoice} session={session} />;
      case 'history':
        return <HistoryPage history={history} voices={allVoices} session={session} />;
      default:
        return <TTSPage voices={allVoices} onGenerationComplete={addHistoryItem} apiKey={apiKey} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      <ApiKeyModal 
        isOpen={isApiKeyModalOpen} 
        onClose={() => setIsApiKeyModalOpen(false)} 
        onSave={handleApiKeySave}
        currentApiKey={apiKey}
      />
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onSettingsClick={() => setIsApiKeyModalOpen(true)}
        session={session}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
