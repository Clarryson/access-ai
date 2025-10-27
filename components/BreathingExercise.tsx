import React, { useState, useEffect, useRef } from 'react';

interface BreathingExerciseProps {
  onFinish: () => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onFinish }) => {
  const [instruction, setInstruction] = useState('Get ready...');
  const [scale, setScale] = useState(1);
  const cycleInterval = useRef<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };
  
  useEffect(() => {
    const cycle = [
      { text: 'Breathe In...', duration: 4000, newScale: 1.5 },
      { text: 'Hold', duration: 4000, newScale: 1.5 },
      { text: 'Breathe Out...', duration: 6000, newScale: 1 },
      { text: 'Hold', duration: 2000, newScale: 1 },
    ];
    let currentStep = -1;

    const nextStep = () => {
      currentStep = (currentStep + 1) % cycle.length;
      const { text, duration, newScale } = cycle[currentStep];
      setInstruction(text);
      setScale(newScale);
      speak(text);
      cycleInterval.current = window.setTimeout(nextStep, duration);
    };
    
    // Start after a brief pause
    const startTimeout = setTimeout(() => {
        nextStep();
    }, 1000);

    return () => {
      if (cycleInterval.current) clearTimeout(cycleInterval.current);
      if (startTimeout) clearTimeout(startTimeout);
      // Stop speech synthesis on component unmount
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleStop = () => {
    if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    onFinish();
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center animate-fade-in">
      <div className="flex-grow flex items-center justify-center">
        <div 
            className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-white/50 flex items-center justify-center text-center transition-transform duration-[3000ms] ease-in-out"
            style={{ transform: `scale(${scale})` }}
        >
          <div className="absolute inset-0 rounded-full bg-white/30 animate-ping opacity-50"></div>
          <p className="text-3xl sm:text-4xl font-semibold text-slate-700">{instruction}</p>
        </div>
      </div>
      <footer className="h-24 flex items-center justify-center">
        <button
          onClick={handleStop}
          className="bg-white/50 backdrop-blur-sm text-slate-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-white/80 transition-colors"
        >
          Stop Exercise
        </button>
      </footer>
    </div>
  );
};

export default BreathingExercise;
