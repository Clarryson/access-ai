import React from 'react';

interface Place {
  name: string;
  lat: number;
  lng: number;
  distance: number;
}

interface PlacesListProps {
  places: Place[];
  placeType: string;
  onClose: () => void;
  onShowMap?: () => void;
}

const PlacesList: React.FC<PlacesListProps> = ({ places, placeType, onClose, onShowMap }) => {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden transform animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Nearby {placeType}</h2>
              <p className="text-purple-100 text-sm mt-1">Found {places.length} locations near you</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-96 overflow-y-auto p-6 space-y-3">
          {places.map((place, index) => {
            const walkTime = Math.round(place.distance * 12);
            const driveTime = Math.round(place.distance * 2);
            
            return (
              <div
                key={index}
                className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-purple-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">📍</span>
                      <h3 className="font-semibold text-gray-800 text-lg">{place.name}</h3>
                    </div>
                    
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-purple-600">
                          <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">{place.distance.toFixed(1)} km away</span>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <span>🚶</span>
                          <span>{walkTime} min walk</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span>🚗</span>
                          <span>{driveTime} min drive</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center bg-white rounded-full w-12 h-12 shadow-md">
                    <span className="text-2xl font-bold text-purple-600">{index + 1}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              🗺️ View locations on an interactive 3D map
            </p>
            {onShowMap && (
              <button
                onClick={onShowMap}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg"
              >
                Show on Map
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacesList;
