import React, { useEffect, useState } from 'react';
import type { CatMood } from '../utils/mood';
import { catImages } from '../utils/imagePreloader';

interface CatAvatarProps {
  isThinking: boolean;
  isListening: boolean;
  mood: CatMood;
  showSparkles: boolean;
}

export const CatAvatar: React.FC<CatAvatarProps> = ({ isThinking, isListening, mood, showSparkles }) => {
  const [currentImage, setCurrentImage] = useState(catImages[mood]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (currentImage !== catImages[mood]) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setCurrentImage(catImages[mood]);
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [mood, currentImage]);

  const moodAnimations = {
    happy: 'animate-bounce',
    curious: 'animate-pulse',
    sassy: 'hover:rotate-6',
    sleepy: 'hover:scale-105',
    excited: 'animate-spin-slow'
  };

  return (
    <div className="relative group">
      <div 
        className={`relative w-48 h-48 mx-auto rounded-full overflow-hidden transition-all duration-500 transform 
          ${isThinking ? 'animate-bounce' : moodAnimations[mood]} 
          ${isListening ? 'ring-4 ring-purple-400 ring-opacity-50' : ''}`}
      >
        <img
          src={currentImage}
          alt="Cat avatar"
          className={`w-full h-full object-cover transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        />
        {isListening && (
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent animate-pulse" />
        )}
        {showSparkles && (
          <div className="absolute inset-0 bg-yellow-400/10 animate-pulse mix-blend-overlay" />
        )}
      </div>
      
      {isListening && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};