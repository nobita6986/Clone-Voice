
import React from 'react';
import type { Page } from '../types';
import { DashboardIcon, TTSIcon, NewVoiceIcon, HistoryIcon, LogoIcon } from './icons/Icons';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: { id: Page; name: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', name: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'tts', name: 'Generate Speech', icon: <TTSIcon /> },
    { id: 'new-voice', name: 'New Voice Profile', icon: <NewVoiceIcon /> },
    { id: 'history', name: 'History', icon: <HistoryIcon /> },
  ];

  return (
    <nav className="w-16 md:w-64 bg-gray-800 p-2 md:p-4 flex flex-col justify-between border-r border-gray-700">
      <div>
        <div className="flex items-center mb-10 p-2">
          <LogoIcon />
          <h1 className="hidden md:block text-xl font-bold ml-3 bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">
            VoiceClone
          </h1>
        </div>
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center p-3 my-2 rounded-lg transition-colors duration-200 ${
                  currentPage === item.id
                    ? 'bg-brand-blue text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="hidden md:block ml-4">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
       <div className="hidden md:block p-4 border-t border-gray-700 text-center text-xs text-gray-400">
        <p>Powered by Gemini</p>
      </div>
    </nav>
  );
};
