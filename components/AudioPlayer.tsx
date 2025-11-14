
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { decode, decodeAudioData } from '../utils/audioUtils';
import { PlayIcon, PauseIcon, DownloadIcon, SpinnerIcon } from './icons/Icons';

interface AudioPlayerProps {
  base64Audio: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ base64Audio }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const cleanup = useCallback(() => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    setIsPlaying(false);
  }, []);
  
  useEffect(() => {
    let isActive = true;

    const setupAudio = async () => {
      if (!base64Audio) return;
      setIsReady(false);
      
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const decodedData = decode(base64Audio);
        const buffer = await decodeAudioData(decodedData, audioContextRef.current, 24000, 1);
        if (isActive) {
          audioBufferRef.current = buffer;
          setIsReady(true);
        }
      } catch (error) {
        console.error("Failed to decode audio data", error);
        if (isActive) setIsReady(false);
      }
    };
    
    setupAudio();
    
    return () => {
      isActive = false;
      cleanup();
    };
  }, [base64Audio, cleanup]);

  const togglePlayPause = () => {
    if (!isReady || !audioContextRef.current || !audioBufferRef.current) return;
    
    if (isPlaying) {
      cleanup();
    } else {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start();
      source.onended = () => {
        setIsPlaying(false);
        sourceRef.current = null;
      };
      sourceRef.current = source;
      setIsPlaying(true);
    }
  };
  
  const downloadUrl = `data:audio/wav;base64,${base64Audio}`;

  if (!base64Audio) return null;

  return (
    <div className="mt-6 p-4 bg-gray-800 rounded-lg flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-4">
        <button
          onClick={togglePlayPause}
          disabled={!isReady}
          className="w-12 h-12 flex items-center justify-center bg-brand-blue text-white rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
        >
          {!isReady ? <SpinnerIcon /> : isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <div>
          <p className="font-semibold">Generated Audio</p>
          <p className="text-sm text-gray-400">{isReady ? 'Ready to play' : 'Processing audio...'}</p>
        </div>
      </div>
      <a
        href={downloadUrl}
        download="generated_speech.wav"
        className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors ${!isReady ? 'pointer-events-none opacity-50' : ''}`}
      >
        <DownloadIcon />
        Download
      </a>
    </div>
  );
};

export default AudioPlayer;
