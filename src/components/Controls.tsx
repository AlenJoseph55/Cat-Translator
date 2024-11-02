import React from 'react';
import { Volume2, VolumeX, RefreshCw } from 'lucide-react';

interface ControlsProps {
  isListening: boolean;
  setIsListening: (value: boolean) => void;
  handleMeow: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ isListening, setIsListening, handleMeow }) => {
  return (
    <div className="flex justify-center gap-4">
      <button
        onClick={() => setIsListening(!isListening)}
        className={`group flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all transform hover:scale-105 ${
          isListening
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-purple-500 text-white hover:bg-purple-600'
        }`}
      >
        {isListening ? (
          <>
            <VolumeX className="w-5 h-5 group-hover:animate-spin" />
            Stop Listening
          </>
        ) : (
          <>
            <Volume2 className="w-5 h-5 group-hover:animate-bounce" />
            Start Listening
          </>
        )}
      </button>

      {isListening && (
        <button
          onClick={handleMeow}
          className="group flex items-center gap-2 px-6 py-3 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-600 transition-all transform hover:scale-105"
        >
          <RefreshCw className="w-5 h-5 group-hover:animate-spin" />
          Meow!
        </button>
      )}
    </div>
  );
};