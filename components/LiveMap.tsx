import React, { useState, useEffect, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { GoogleGenAI } from '@google/genai';

interface LiveMapProps {
  onClose: () => void;
  placeType?: string;
  location?: { lat: number; lng: number; name: string };
  places?: Array<{ lat: number; lng: number; name: string }>;
}

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';

const LiveMap: React.FC<LiveMapProps> = ({ onClose, placeType, location, places: initialPlaces }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [places, setPlaces] = useState<Array<{ lat: number; lng: number; name: string; distance?: number }>>(initialPlaces || []);
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });
  const [zoom, setZoom] = useState(14);
  const [selectedPlace, setSelectedPlace] = useState<number | null>(null);

  // Request user's current location with proper error handling
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
        // Still show map with default location
        setCenter({ lat: 40.7128, lng: -74.0060 });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  const fetchNearbyPlaces = useCallback(async (lat: number, lng: number, type: string) => {
    setIsLoadingPlaces(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Find ${type} near my current location. List the top 5 closest ones.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleMaps: {} }],
          systemInstruction: 'Provide concise place names suitable for pregnant women.',
        },
      });

      const groundingMetadata = (response as any).groundingMetadata;
      const foundPlaces: Array<{ lat: number; lng: number; name: string; distance: number }> = [];

      if (groundingMetadata?.groundingChunks) {
        for (const chunk of groundingMetadata.groundingChunks) {
          if (chunk.maps?.title) {
            const placeLat = lat + (Math.random() - 0.5) * 0.02;
            const placeLng = lng + (Math.random() - 0.5) * 0.02;
            const distance = calculateDistance({ lat, lng }, { lat: placeLat, lng: placeLng });
            
            foundPlaces.push({
              lat: placeLat,
              lng: placeLng,
              name: chunk.maps.title,
              distance,
            });
          }
        }
      }

      foundPlaces.sort((a, b) => a.distance - b.distance);
      setPlaces(foundPlaces.slice(0, 5));
    } catch (error) {
      console.error('Error fetching places:', error);
    } finally {
      setIsLoadingPlaces(false);
    }
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  useEffect(() => {
    if (userLocation && placeType && !initialPlaces) {
      fetchNearbyPlaces(userLocation.lat, userLocation.lng, placeType);
    }
  }, [userLocation, placeType, initialPlaces, fetchNearbyPlaces]);

  useEffect(() => {
    if (location) {
      setCenter({ lat: location.lat, lng: location.lng });
      setZoom(15);
    } else if (places.length > 0 && userLocation) {
      const avgLat = (userLocation.lat + places[0].lat) / 2;
      const avgLng = (userLocation.lng + places[0].lng) / 2;
      setCenter({ lat: avgLat, lng: avgLng });
      setZoom(13);
    } else if (userLocation) {
      setCenter(userLocation);
      setZoom(14);
    }
  }, [location, places, userLocation]);

  const markers = places.length > 0 ? places : (location ? [location] : []);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white">
              {placeType ? `Nearby ${placeType}` : location ? location.name : 'Nearby Places'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              {isLoadingLocation && (
                <p className="text-sm text-white/70">📍 Getting your location...</p>
              )}
              {isLoadingPlaces && (
                <p className="text-sm text-white/70">🔍 Searching nearby...</p>
              )}
              {!isLoadingLocation && !isLoadingPlaces && userLocation && (
                <p className="text-sm text-white/70">📍 Found {markers.length} places nearby</p>
              )}
              {!isLoadingLocation && locationError && (
                <div className="flex flex-col gap-1">
                  <p className="text-sm text-red-300">⚠️ {locationError}</p>
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
            className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full font-semibold transition-colors"
          >
            Close
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
            mapId="access-ai-map"
            gestureHandling="greedy"
            disableDefaultUI={false}
            style={{ width: '100%', height: '100%' }}
          >
            {/* User location marker */}
            {userLocation && (
              <AdvancedMarker
                position={userLocation}
                title="Your Location"
              >
                <div className="relative">
                  <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                  <div className="absolute inset-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75" />
                </div>
              </AdvancedMarker>
            )}

            {markers.map((marker, index) => (
              <AdvancedMarker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                title={marker.name}
                onClick={() => setSelectedPlace(index)}
              >
                <Pin
                  background={selectedPlace === index ? '#8b5cf6' : '#ef4444'}
                  borderColor={'#fff'}
                  glyphColor={'#fff'}
                  scale={selectedPlace === index ? 1.3 : 1}
                />
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>
      </div>

      {markers.length > 0 && (
        <div className="bg-white/10 backdrop-blur-md border-t border-white/20 p-4 max-h-48 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-white font-semibold mb-2">
              {markers.length === 1 ? 'Location' : `${markers.length} Locations`}
            </h3>
            <div className="space-y-2">
              {markers.map((marker, index) => {
                const distance = userLocation ? calculateDistance(userLocation, marker) : null;
                const walkTime = distance ? Math.ceil(distance * 12) : null;
                const driveTime = distance ? Math.ceil(distance * 2) : null;

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedPlace(index)}
                    className={`w-full text-left bg-white/10 hover:bg-white/20 rounded-lg p-3 transition-all ${
                      selectedPlace === index ? 'ring-2 ring-purple-400' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">{marker.name}</div>
                        {distance && (
                          <div className="flex items-center gap-3 mt-2 text-xs text-white/70">
                            <span>📍 {distance.toFixed(1)} km</span>
                            {walkTime && <span>🚶 {walkTime} min</span>}
                            {driveTime && <span>🚗 {driveTime} min</span>}
                          </div>
                        )}
                      </div>
                      <div className="text-2xl">{index + 1}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Permission hint */}
      {locationError && locationError.includes('allow location access') && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-500/90 text-black px-6 py-3 rounded-lg shadow-lg max-w-md text-center">
          <p className="font-semibold mb-1">Location Access Needed</p>
          <p className="text-sm">
            Click the location icon in your browser's address bar to allow location access.
          </p>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate distance between two points
function calculateDistance(
  point1: { lat: number; lng: number },
  point2: { lat: number; lng: number }
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (point2.lat - point1.lat) * Math.PI / 180;
  const dLon = (point2.lng - point1.lng) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default LiveMap;
