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
import { detectMeow } from './utils/audioDetection';

function App() {
  const [isListening, setIsListening] = useState(false);
  const [translation, setTranslation] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [mood, setMood] = useState<CatMood>('curious');
  const [showSparkles, setShowSparkles] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [canTranslate, setCanTranslate] = useState(true);
  const [Meowblock, setMeowBlock] = useState(true);

  useEffect(() => {
    if (isListening && !audioContext) {
      initializeAudio();
    } else if (!isListening && audioContext) {
      cleanupAudio();
    }
  }, [isListening]);

  const initializeAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const analyzer = context.createAnalyser();
      
      source.connect(analyzer);
      setAudioContext(context);
      setMediaStream(stream);

      // Start monitoring for meows
      const checkAudio = () => {
        if (!isListening) return;
        
        // Only check for meows if we can translate
        if (canTranslate && Meowblock) {
          const isMeow = detectMeow(analyzer);
          if (isMeow) {
            handleMeow();
            setMeowBlock(false);
          }
        }
        
        requestAnimationFrame(checkAudio);
      };
      
      checkAudio();
    } catch (error) {
      console.error('Error accessing microphone:', error);
      setIsListening(false);
    }
  };

  const cleanupAudio = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
    if (audioContext) {
      audioContext.close();
    }
    setAudioContext(null);
    setMediaStream(null);
  };
  
  useEffect(() => {
    return () => {
      cleanupAudio();
    };
  }, []);

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
    if (isListening && canTranslate) {
      // Disable translation immediately
      setCanTranslate(false);
      
      setIsThinking(true);
      setMood('curious');
      setShowSparkles(false);
      setTranslation('');
      
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
        
        // Enable translation after 5 seconds
        setTimeout(() => {
          setCanTranslate(true);
        }, 3000);
      }, 1500);
    }
      setMeowBlock(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-purple-100 animate-gradient">
      <div className="container mx-auto px-4 py-8">
        <Header mood={mood} />
        
        <div className="max-w-md mx-auto bg-white/90 rounded-2xl shadow-xl p-6 transform hover:scale-[1.01] transition-all relative">
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
                <p className="animate-pulse">
                  {canTranslate ? 'Listening for meows...' : 'Cooling down... Please wait'}
                </p>
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