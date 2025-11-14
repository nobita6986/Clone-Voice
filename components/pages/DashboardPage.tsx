
import React from 'react';
import type { HistoryItem } from '../../types';
import { NewVoiceIcon, TTSIcon, HistoryIcon } from '../icons/Icons';

interface DashboardPageProps {
  history: HistoryItem[];
  customVoiceCount: number;
}

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
    <div className="bg-gray-800 p-6 rounded-xl flex items-center shadow-lg">
        <div className={`p-4 rounded-full ${color}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-gray-400 text-sm">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

export const DashboardPage: React.FC<DashboardPageProps> = ({ history, customVoiceCount }) => {
  const totalChars = history.reduce((sum, item) => sum + item.text.length, 0);
  const totalGenerations = history.length;
  // Note: Cost estimation is a placeholder as per instructions.
  const estimatedCost = (totalChars / 1000000) * 16; // Example: $16 per 1M characters

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's a summary of your VoiceClone Studio activity.</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Custom Voices Created" value={customVoiceCount.toString()} icon={<NewVoiceIcon />} color="bg-blue-500/20" />
          <StatCard title="Total Generations" value={totalGenerations.toLocaleString()} icon={<TTSIcon />} color="bg-teal-500/20" />
          <StatCard title="Characters Processed" value={totalChars.toLocaleString()} icon={<HistoryIcon />} color="bg-purple-500/20" />
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Usage & Cost Estimation</h2>
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-300">
            You've used approximately <span className="font-bold text-brand-teal">{totalChars.toLocaleString()}</span> characters.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-gray-400">Estimated Cost (Free Tier)</p>
            <p className="text-3xl font-bold text-white">${estimatedCost.toFixed(4)}</p>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">
            Disclaimer: This is a rough estimation based on a sample rate ($16 per 1 million characters). Actual costs may vary. Please refer to your Google Cloud billing for accurate usage.
        </div>
      </div>
    </div>
  );
};
