import React from 'react';

interface RequestSeatCardProps {
  onClose: () => void;
}

const PregnancyIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 11.5c-1 0-2 .5-2.5 1.5-2.5 4-3.5 6-3.5 6.5 0 1.5 1 2.5 2.5 2.5S11 21 11 21h2s0-.5.5-1.5c1.5 0 2.5-1 2.5-2.5 0-.5-1-2.5-3.5-6.5C14 12 13 11.5 12 11.5z"/>
    </svg>
);


const RequestSeatCard: React.FC<RequestSeatCardProps> = ({ onClose }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-800 text-white animate-fade-in">
      <div className="w-full max-w-md bg-white text-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center">
        <PregnancyIcon className="w-16 h-16 sm:w-20 sm:h-20 text-indigo-500 mb-4" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Pardon me,</h2>
        <p className="text-lg sm:text-xl leading-relaxed mb-8">
          I'm pregnant and would be grateful if I could sit down. Thank you for your understanding.
        </p>
        <button
          onClick={onClose}
          className="bg-indigo-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-indigo-600 transition-colors text-lg"
          aria-label="Close this message"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RequestSeatCard;
