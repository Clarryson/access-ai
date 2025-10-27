import React from 'react';
import { ConversationState } from '../types';

interface MicrophoneButtonProps {
  conversationState: ConversationState;
  onClick: () => void;
}

const MicrophoneIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
        <path d="M17 11a5 5 0 0 1-5 5A5 5 0 0 1 7 11H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"></path>
    </svg>
);

const StopIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M6 6h12v12H6z"></path>
    </svg>
);

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ conversationState, onClick }) => {
  const isIdle = conversationState === ConversationState.IDLE;
  
  const getButtonClasses = () => {
    let base = "relative rounded-full w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center transition-all duration-500 ease-in-out text-white focus:outline-none focus:ring-4 z-10 transform hover:scale-110 active:scale-95";
    switch (conversationState) {
      case ConversationState.IDLE:
        return `${base} bg-gradient-to-br from-indigo-500 to-blue-500 shadow-2xl hover:shadow-3xl focus:ring-indigo-300 hover:from-indigo-600 hover:to-blue-600`;
      case ConversationState.LISTENING:
        return `${base} bg-gradient-to-br from-green-500 to-emerald-500 shadow-2xl focus:ring-green-300 animate-pulse-slow`;
      case ConversationState.PROCESSING:
        return `${base} bg-gradient-to-br from-amber-500 to-yellow-500 shadow-2xl focus:ring-amber-300 animate-spin-slow`;
      case ConversationState.SPEAKING:
        return `${base} bg-gradient-to-br from-purple-500 to-violet-500 shadow-2xl focus:ring-purple-300 animate-bounce-subtle`;
      default:
        return base;
    }
  };

  const renderVisualFeedback = () => {
    switch (conversationState) {
      case ConversationState.LISTENING:
        return (
          <div className="absolute w-48 h-48 sm:w-64 sm:h-64 pointer-events-none">
            <div className="bg-green-400 absolute inset-0 rounded-full animate-ping opacity-60"></div>
            <div className="bg-green-400 absolute inset-0 rounded-full animate-ping opacity-40" style={{animationDelay: '0.5s'}}></div>
            <div className="bg-green-300 absolute inset-0 rounded-full animate-ping opacity-20" style={{animationDelay: '1s'}}></div>
          </div>
        );
      case ConversationState.SPEAKING:
        return (
          <div className="absolute w-48 h-48 sm:w-64 sm:h-64 pointer-events-none">
            <div className="bg-purple-400 absolute inset-0 rounded-full animate-ping opacity-75"></div>
            <div className="bg-purple-400 absolute inset-0 rounded-full animate-ping opacity-50" style={{animationDelay: '0.4s'}}></div>
            <div className="bg-purple-300 absolute inset-0 rounded-full animate-ping opacity-25" style={{animationDelay: '0.8s'}}></div>
            <div className="bg-violet-400 absolute inset-0 rounded-full animate-ping opacity-20" style={{animationDelay: '1.2s'}}></div>
          </div>
        );
      case ConversationState.PROCESSING:
        return (
          <div className="absolute w-48 h-48 sm:w-64 sm:h-64 pointer-events-none">
            <div className="bg-amber-400 absolute inset-0 rounded-full animate-pulse opacity-40"></div>
            <div className="bg-yellow-400 absolute inset-0 rounded-full animate-pulse opacity-30" style={{animationDelay: '0.3s'}}></div>
          </div>
        );
      default:
        return null;
    }
  };


  const Icon = isIdle ? MicrophoneIcon : StopIcon;

  return (
    <div className="relative flex items-center justify-center">
      {renderVisualFeedback()}
      <button onClick={onClick} className={getButtonClasses()} aria-label={isIdle ? "Start conversation" : "Stop conversation"}>
        <Icon className="w-12 h-12 sm:w-16 sm:h-16 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default MicrophoneButton;