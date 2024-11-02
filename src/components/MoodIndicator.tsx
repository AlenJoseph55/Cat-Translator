import React from 'react';
import type { CatMood } from '../utils/mood';

interface MoodIndicatorProps {
  mood: CatMood;
}

export const MoodIndicator: React.FC<MoodIndicatorProps> = ({ mood }) => {
  const moodEmoji = {
    happy: '😺',
    curious: '🐱',
    sassy: '😼',
    sleepy: '😴',
    excited: '🙀'
  };

  const moodText = {
    happy: 'Happy',
    curious: 'Curious',
    sassy: 'Sassy',
    sleepy: 'Sleepy',
    excited: 'Excited'
  };

  const moodColors = {
    happy: 'bg-green-100 border-green-300',
    curious: 'bg-purple-100 border-purple-300',
    sassy: 'bg-pink-100 border-pink-300',
    sleepy: 'bg-blue-100 border-blue-300',
    excited: 'bg-yellow-100 border-yellow-300'
  };

  return (
    <div className={`absolute -top-3 right-4 ${moodColors[mood]} px-3 py-1 rounded-full shadow-md transform 
      hover:scale-110 transition-all duration-300 border-2 backdrop-blur-sm`}>
      <div className="flex items-center gap-1.5">
        <span className="text-sm font-medium text-gray-700">{moodText[mood]}</span>
        <span className="text-lg animate-bounce" style={{ animationDuration: '2s' }}>{moodEmoji[mood]}</span>
      </div>
    </div>
  );
};