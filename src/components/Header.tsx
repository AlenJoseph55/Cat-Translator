import React from 'react';
import { Cat } from 'lucide-react';
import type { CatMood } from '../utils/mood';

interface HeaderProps {
  mood: CatMood;
}

export const Header: React.FC<HeaderProps> = ({ mood }) => {
  const moodColors = {
    happy: 'text-green-600',
    curious: 'text-purple-600',
    sassy: 'text-pink-600',
    sleepy: 'text-blue-600',
    excited: 'text-yellow-600'
  };

  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="inline-block">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2">
          <div className="relative">
            <Cat className={`w-10 h-10 ${moodColors[mood]} transform hover:rotate-12 transition-transform`} />
            <div className={`absolute inset-0 ${moodColors[mood]} blur-xl opacity-20 animate-pulse`}></div>
          </div>
          Cat Translator
        </h1>
        <div className={`h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
          transform transition-all duration-500 hover:scale-x-110`}></div>
      </div>
      <p className="text-gray-600 mt-2 animate-fade-in">Decode your cat's mysterious meows!</p>
    </div>
  );
};