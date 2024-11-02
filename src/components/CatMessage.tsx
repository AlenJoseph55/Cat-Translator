import React from 'react';
import type { CatMood } from '../utils/mood';

interface CatMessageProps {
  message: string;
  isThinking: boolean;
  mood: CatMood;
}

export const CatMessage: React.FC<CatMessageProps> = ({ message, isThinking, mood }) => {
  if (!message && !isThinking) return null;

  const moodColors = {
    happy: 'bg-green-50 border-green-200',
    curious: 'bg-purple-50 border-purple-200',
    sassy: 'bg-pink-50 border-pink-200',
    sleepy: 'bg-blue-50 border-blue-200',
    excited: 'bg-yellow-50 border-yellow-200'
  };

  const moodEmojis = {
    happy: '😺',
    curious: '🐱',
    sassy: '😼',
    sleepy: '😴',
    excited: '🙀'
  };

  return (
    <div 
      className={`${moodColors[mood]} border-2 rounded-2xl p-4 relative transform transition-all duration-300 
        hover:scale-[1.02] hover:shadow-lg`}
    >
      <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 ${moodColors[mood]} rotate-45 border-l-2 border-t-2`} />
      <p className="text-center text-gray-800 font-medium">
        {isThinking ? (
          <span className="inline-flex items-center gap-1">
            <span className="animate-pulse">Translating meow</span>
            <span className="inline-flex">
              {[1, 2, 3].map((i) => (
                <span 
                  key={i} 
                  className="animate-bounce mx-0.5" 
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  .
                </span>
              ))}
            </span>
          </span>
        ) : (
          <span className="animate-fade-in inline-flex items-center gap-2">
            <span>{message}</span>
            <span className="text-xl animate-bounce" style={{ animationDuration: '2s' }}>
              {moodEmojis[mood]}
            </span>
          </span>
        )}
      </p>
    </div>
  );
};