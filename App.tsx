
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './components/pages/DashboardPage';
import { TTSPage } from './components/pages/TTSPage';
import { NewVoicePage } from './components/pages/NewVoicePage';
import { HistoryPage } from './components/pages/HistoryPage';
import type { Page, Voice, HistoryItem } from './types';
import { PREBUILT_VOICES } from './constants';
import { supabase } from './supabaseClient';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import type { Session } from '@supabase/supabase-js';

const App: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('tts');
  const [customVoices, setCustomVoices] = useState<Voice[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (_event === 'SIGNED_OUT') {
        setCustomVoices([]);
        setHistory([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        setLoading(true);
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
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);
  
  const allVoices = [...PREBUILT_VOICES, ...customVoices];

  const addHistoryItem = async (item: Omit<HistoryItem, 'id' | 'createdAt'>) => {
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

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage history={history} customVoiceCount={customVoices.length} />;
      case 'tts':
        return <TTSPage voices={allVoices} onGenerationComplete={addHistoryItem} />;
      case 'new-voice':
        return <NewVoicePage onVoiceCreated={addCustomVoice} />;
      case 'history':
        return <HistoryPage history={history} voices={allVoices} />;
      default:
        return <TTSPage voices={allVoices} onGenerationComplete={addHistoryItem} />;
    }
  };

  if (loading) {
    return null; // or a loading spinner
  }

  if (!session) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-lg">
                <Auth
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={[]}
                    theme="dark"
                />
            </div>
        </div>
    );
  }

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