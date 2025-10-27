import { GoogleGenAI } from "@google/genai";

// ============================================
// LIVE MAPS & GEOLOCATION TOOLS
// ============================================

export interface MapLocation {
  lat: number;
  lng: number;
  name: string;
  placeId?: string;
}

/**
 * Get user's current location using browser geolocation
 */
export async function getCurrentLocation(): Promise<{ lat: number; lng: number } | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  });
}

/**
 * Find nearby places using Gemini API with Maps grounding
 */
export async function findNearbyPlacesWithMaps(
  placeType: string,
  userLat?: number,
  userLng?: number
): Promise<{ places: MapLocation[]; description: string } | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Get user location if not provided
    let lat = userLat;
    let lng = userLng;
    if (!lat || !lng) {
      const location = await getCurrentLocation();
      if (location) {
        lat = location.lat;
        lng = location.lng;
      }
    }

    // Build the query with location context
    const locationContext = lat && lng ? ` near ${lat}, ${lng}` : '';
    const query = `Find ${placeType}${locationContext}. Provide the name and address.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: query,
      config: {
        tools: [{ googleMaps: {} }],
      }
    });
    
    console.log('Maps grounding response:', response);
    
    // Extract places from grounding chunks
    const places: MapLocation[] = [];
    const groundingMetadata = response.groundingMetadata;
    
    if (groundingMetadata?.groundingChunks) {
      // Extract place IDs from grounding chunks
      const placeIds = groundingMetadata.groundingChunks
        .filter(chunk => chunk.maps?.placeId)
        .map(chunk => chunk.maps!.placeId!.replace('places/', ''));

      console.log('Place IDs:', placeIds);

      // Fetch place details using Google Maps Places API (New)
      if (placeIds.length > 0 && typeof google !== 'undefined' && google.maps?.places) {
        const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
        
        const placePromises = placeIds.map(async (placeId) => {
          try {
            const place = new Place({ id: placeId });
            await place.fetchFields({ fields: ['displayName', 'location'] });
            
            if (place.location) {
              return {
                lat: place.location.lat(),
                lng: place.location.lng(),
                name: place.displayName || 'Unknown',
                placeId: placeId,
              };
            }
          } catch (error) {
            console.error(`Error fetching place ${placeId}:`, error);
          }
          return null;
        });

        const placeResults = await Promise.all(placePromises);
        places.push(...placeResults.filter(p => p !== null) as MapLocation[]);
      } else {
        // Fallback: use basic information from grounding chunks
        for (const chunk of groundingMetadata.groundingChunks) {
          if (chunk.maps?.title) {
            places.push({
              lat: lat || 0,
              lng: lng || 0,
              name: chunk.maps.title,
              placeId: chunk.maps.placeId,
            });
          }
        }
      }
    }

    console.log('Extracted places:', places);

    return {
      places,
      description: response.text || `Found ${places.length} places.`,
    };
  } catch (error) {
    console.error("Error finding places with maps grounding:", error);
    return null;
  }
}

/**
 * Show a specific location on the map using Maps grounding
 */
export async function showLocationOnMap(
  locationName: string
): Promise<MapLocation | null> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp',
      contents: `Find the exact location of: ${locationName}. Provide the name and address.`,
      config: {
        tools: [{ googleMaps: {} }],
      }
    });
    
    const groundingMetadata = response.groundingMetadata;
    
    if (groundingMetadata?.groundingChunks && groundingMetadata.groundingChunks.length > 0) {
      const firstChunk = groundingMetadata.groundingChunks[0];
      const placeId = firstChunk.maps?.placeId?.replace('places/', '');
      
      // Fetch place details if Places API is available
      if (placeId && typeof google !== 'undefined' && google.maps?.places) {
        const { Place } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
        const place = new Place({ id: placeId });
        await place.fetchFields({ fields: ['displayName', 'location'] });
        
        if (place.location) {
          return {
            lat: place.location.lat(),
            lng: place.location.lng(),
            name: place.displayName || locationName,
            placeId: placeId,
          };
        }
      }
      
      // Fallback
      return {
        lat: 0,
        lng: 0,
        name: firstChunk.maps?.title || locationName,
        placeId: placeId,
      };
    }

    console.error("No location found for:", locationName);
    return null;
  } catch (error) {
    console.error("Error showing location on map:", error);
    return null;
  }
}
