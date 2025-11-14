
import React, { useState } from 'react';
import type { HistoryItem, Voice } from '../../types';
import AudioPlayer from '../AudioPlayer';

interface HistoryPageProps {
  history: HistoryItem[];
  voices: Voice[];
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ history, voices }) => {
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  
  const getVoiceName = (voiceId: string) => {
    return voices.find(v => v.id === voiceId)?.name || 'Unknown Voice';
  };
  
  const toggleRow = (id: string) => {
    setExpandedRowId(prevId => (prevId === id ? null : id));
  };
  
  if (history.length === 0) {
    return (
        <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-white mb-2">No History Yet</h1>
            <p className="text-gray-400">Your generated audio clips will appear here.</p>
        </div>
    );
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Generation History</h1>
        <p className="text-gray-400 mt-1">Review, play, and download your past audio generations.</p>
      </header>
      
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Text Preview</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Voice Used</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Play</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {history.map(item => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-700/50 transition-colors cursor-pointer" onClick={() => toggleRow(item.id)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-200 truncate max-w-md">"{item.text}"</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-900 text-blue-200">
                        {getVoiceName(item.voiceId)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {item.createdAt.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                       <button className="text-brand-blue hover:text-brand-teal">
                          {expandedRowId === item.id ? 'Collapse' : 'Play Audio'}
                       </button>
                    </td>
                  </tr>
                  {expandedRowId === item.id && (
                     <tr>
                        <td colSpan={4} className="p-4 bg-gray-900/50">
                            <AudioPlayer base64Audio={item.audioData} />
                        </td>
                     </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
