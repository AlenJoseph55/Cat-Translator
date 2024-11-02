import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { CatMessage } from './components/CatMessage';
import { CatAvatar } from './components/CatAvatar';
import { translations } from './data/translations';
import { Controls } from './components/Controls';
import { Header } from './components/Header';
import { MoodIndicator } from './components/MoodIndicator';
import { getRandomMood } from './utils/mood';
import { preloadImages } from './utils/imagePreloader';
import type { CatMood } from './utils/mood';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [translation, setTranslation] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [mood, setMood] = useState<CatMood>('curious');
  const [showSparkles, setShowSparkles] = useState(false);

  // Preload images on mount
  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setShowSparkles(prev => !prev);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isListening]);

  useEffect(() => {
    if (!isThinking) {
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          setMood(getRandomMood());
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isThinking]);

  const handleMeow = () => {
    if (isListening) {
      setIsThinking(true);
      setMood('curious');
      setShowSparkles(false);
      
      const moodChanges = [
        { mood: 'excited', delay: 300 },
        { mood: 'curious', delay: 800 },
        { mood: 'sleepy', delay: 1200 }
      ];

      moodChanges.forEach(({ mood, delay }) => {
        setTimeout(() => setMood(mood as CatMood), delay);
      });

      setTimeout(() => {
        const randomTranslation = translations[Math.floor(Math.random() * translations.length)];
        setTranslation(randomTranslation);
        setIsThinking(false);
        setMood(getRandomMood());
        setShowSparkles(true);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 animate-gradient">
      <div className="container mx-auto px-4 py-8">
        <Header mood={mood} />
        
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 transform hover:scale-[1.01] transition-all relative overflow-hidden">
          {showSparkles && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <Sparkles
                  key={i}
                  className="absolute text-yellow-400 animate-float"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    opacity: 0.6,
                  }}
                />
              ))}
            </div>
          )}
          
          <MoodIndicator mood={mood} />
          <CatAvatar 
            isThinking={isThinking} 
            isListening={isListening} 
            mood={mood}
            showSparkles={showSparkles}
          />
          
          <div className="mt-8 space-y-4">
            <CatMessage message={translation} isThinking={isThinking} mood={mood} />
            <Controls 
              isListening={isListening} 
              setIsListening={setIsListening}
              handleMeow={handleMeow}
            />
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            {isListening ? (
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500 animate-spin-slow" />
                <p className="animate-pulse">Listening for meows...</p>
                <Sparkles className="w-4 h-4 text-purple-500 animate-spin-slow" />
              </div>
            ) : (
              <p>Press "Start Listening" to begin</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;