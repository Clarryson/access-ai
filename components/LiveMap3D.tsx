import React, { useState, useEffect, useCallback, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface LiveMap3DProps {
  onClose: () => void;
  location?: { lat: number; lng: number; name: string };
  places?: Array<{ lat: number; lng: number; name: string; placeId?: string }>;
  keepAudioActive?: boolean;
}

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

const LiveMap3D: React.FC<LiveMap3DProps> = ({ onClose, location, places, keepAudioActive = true }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoom, setZoom] = useState(17);
  const [tilt, setTilt] = useState(67.5);
  const [heading, setHeading] = useState(0);
  const mapRef = useRef<any>(null);

  const requestLocation = useCallback(() => {
    setIsLoadingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log('Got user location:', pos);
        setUserLocation(pos);
        setCenter(pos);
        setLocationError(null);
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Unable to get your location. ';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
        }
        
        setLocationError(errorMessage);
        setIsLoadingLocation(false);
        setCenter({ lat: 40.7128, lng: -74.0060 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  useEffect(() => {
    if (location) {
      setCenter({ lat: location.lat, lng: location.lng });
      setZoom(19);
      setTilt(67.5);
    } else if (places && places.length > 0) {
      console.log('LiveMap3D received places:', places);
      setCenter({ lat: places[0].lat, lng: places[0].lng });
      setZoom(17);
      setTilt(67.5);
    } else if (userLocation) {
      setCenter(userLocation);
      setZoom(17);
      setTilt(67.5);
    }
  }, [location, places, userLocation]);

  const markers = places || (location ? [location] : []);
  console.log('LiveMap3D markers to render:', markers);
  console.log('LiveMap3D places prop:', places);
  console.log('LiveMap3D location prop:', location);

  // 3D controls
  const rotateCW = () => setHeading(h => (h + 30) % 360);
  const rotateCCW = () => setHeading(h => (h - 30 + 360) % 360);
  const toggleTilt = () => setTilt(t => t === 0 ? 67.5 : 0);
  const increaseTilt = () => setTilt(t => Math.min(t + 15, 67.5));
  const decreaseTilt = () => setTilt(t => Math.max(t - 15, 0));

  return (
    <div className="fixed inset-0 z-50 flex flex-col animate-fade-in bg-black/40 backdrop-blur-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/95 to-indigo-600/95 backdrop-blur-md border-b border-white/20 p-3 shadow-2xl">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">
                {location ? location.name : places ? `Nearby Places (${markers.length} markers)` : 'Map'}
              </h2>
              <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-bold rounded backdrop-blur-sm">3D VIEW</span>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              {isLoadingLocation && (
                <p className="text-xs text-white/80">📍 Getting your location...</p>
              )}
              {!isLoadingLocation && userLocation && (
                <p className="text-xs text-white/80">📍 Using your current location</p>
              )}
              {!isLoadingLocation && locationError && (
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-red-200">⚠️ {locationError}</p>
                  <button
                    onClick={requestLocation}
                    className="text-xs text-white/90 underline hover:text-white"
                  >
                    Try again
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 text-white px-5 py-1.5 rounded-full text-sm font-semibold transition-all backdrop-blur-sm"
          >
            Close Map
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <Map
            defaultCenter={center}
            center={center}
            defaultZoom={zoom}
            zoom={zoom}
            tilt={tilt}
            heading={heading}
            mapId="access-ai-map-3d"
            gestureHandling="greedy"
            disableDefaultUI={false}
            mapTypeId="satellite"
            style={{ width: '100%', height: '100%' }}
            onLoad={(map) => {
              mapRef.current = map;
            }}
          >
            {/* User location marker */}
            {userLocation && (
              <AdvancedMarker
                position={userLocation}
                title="Your Location"
              >
                <div className="relative">
                  <div className="w-5 h-5 bg-blue-500 rounded-full border-3 border-white shadow-lg animate-pulse" />
                  <div className="absolute inset-0 w-5 h-5 bg-blue-400 rounded-full animate-ping opacity-75" />
                </div>
              </AdvancedMarker>
            )}

            {/* Place markers */}
            {markers.map((marker, index) => (
              <AdvancedMarker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                title={marker.name}
              >
                <Pin
                  background={'#ef4444'}
                  borderColor={'#fff'}
                  glyphColor={'#fff'}
                  scale={1.2}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>

        {/* 3D Controls */}
        <div className="absolute bottom-6 right-4 flex flex-col gap-2">
          <button
            onClick={rotateCCW}
            className="bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl transition-all hover:scale-110"
            title="Rotate Left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-purple-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
          </button>
          <button
            onClick={rotateCW}
            className="bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl transition-all hover:scale-110"
            title="Rotate Right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-purple-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
            </svg>
          </button>
          <button
            onClick={increaseTilt}
            className="bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl transition-all hover:scale-110"
            title="Increase Tilt"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-purple-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
          <button
            onClick={decreaseTilt}
            className="bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl transition-all hover:scale-110"
            title="Decrease Tilt"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-purple-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={toggleTilt}
            className="bg-white/95 hover:bg-white p-2.5 rounded-full shadow-xl transition-all hover:scale-110"
            title={tilt === 0 ? "Enable 3D View" : "Top-Down View"}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-purple-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info panel */}
      {markers.length > 0 && (
        <div className="bg-gradient-to-r from-purple-600/95 to-indigo-600/95 backdrop-blur-md border-t border-white/20 p-3 max-h-40 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-white font-semibold mb-2 text-sm">
              {markers.length === 1 ? 'Location' : `${markers.length} Locations Found`}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {markers.map((marker, index) => (
                <div
                  key={index}
                  className="bg-white/15 rounded-lg p-2.5 text-white text-sm hover:bg-white/25 transition-all cursor-pointer backdrop-blur-sm"
                  onClick={() => {
                    setCenter({ lat: marker.lat, lng: marker.lng });
                    setZoom(19);
                  }}
                >
                  <div className="font-semibold text-sm">{marker.name}</div>
                  {userLocation && (
                    <div className="text-white/80 text-xs mt-1 flex items-center gap-1">
                      <span>📍</span>
                      <span>{calculateDistance(userLocation, marker).toFixed(1)} km away</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isLoadingLocation && locationError && locationError.includes('allow location access') && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-500/90 text-black px-6 py-3 rounded-lg shadow-lg max-w-md text-center z-10">
          <p className="font-semibold mb-1">Location Access Needed</p>
          <p className="text-sm">
            Click the location icon in your browser's address bar to allow location access.
          </p>
        </div>
      )}
    </div>
  );
};

function calculateDistance(
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number {
  const R = 6371;
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default LiveMap3D;
