import React from 'react';

interface RouteMapProps {
  onClose: () => void;
}

// A simple placeholder SVG for a route map
const MapPlaceholder: React.FC = () => (
    <svg width="100%" height="100%" viewBox="0 0 300 150" className="bg-gray-200 rounded-lg">
        {/* Roads */}
        <path d="M 10 140 C 50 140, 40 80, 80 80" stroke="#a0aec0" fill="none" strokeWidth="4" />
        <path d="M 80 80 S 120 20, 180 40" stroke="#a0aec0" fill="none" strokeWidth="4" />
        <path d="M 180 40 C 220 60, 250 130, 290 120" stroke="#a0aec0" fill="none" strokeWidth="4" />
        <path d="M 10 20 H 290" stroke="#a0aec0" fill="none" strokeWidth="4" />

        {/* Route line */}
        <path d="M 40 20 C 100 20, 150 100, 220 100" stroke="#4f46e5" fill="none" strokeWidth="3" strokeDasharray="5,5" />

        {/* Stops */}
        <g>
            <circle cx="40" cy="20" r="8" fill="#4f46e5" stroke="white" strokeWidth="2" />
            <text x="40" y="12" textAnchor="middle" fill="white" fontSize="10">A</text>
        </g>
        <g>
            <circle cx="130" cy="65" r="8" fill="#4f46e5" stroke="white" strokeWidth="2" />
            <text x="130" y="73" textAnchor="middle" fill="#374151" fontSize="10">B</text>
        </g>
        <g>
            <circle cx="220" cy="100" r="8" fill="#4f46e5" stroke="white" strokeWidth="2" />
            <text x="220" y="108" textAnchor="middle" fill="#374151" fontSize="10">C</text>
        </g>
    </svg>
);


const RouteMap: React.FC<RouteMapProps> = ({ onClose }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-slate-100 text-slate-800 animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your Current Route</h2>
        <p className="text-slate-500 mb-6">This is a simplified map of your journey.</p>
        <div className="w-full h-48 sm:h-64 mb-6">
            <MapPlaceholder />
        </div>
        <div className="text-left w-full mb-6">
            <p><span className="font-bold text-indigo-600">A:</span> Central Station</p>
            <p><span className="font-bold text-indigo-600">B:</span> Oak Street (Transfer)</p>
            <p><span className="font-bold text-indigo-600">C:</span> Metro Center</p>
        </div>
        <button
          onClick={onClose}
          className="bg-indigo-500 text-white font-bold py-3 px-10 rounded-full shadow-lg hover:bg-indigo-600 transition-colors text-lg"
          aria-label="Close map"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default RouteMap;
