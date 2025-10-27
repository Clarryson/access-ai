import { GoogleGenAI, GenerateContentResponse, GroundingChunk } from '@google/genai';

const API_KEY = process.env.API_KEY as string;

export interface MapMarker {
    position: { lat: number; lng: number; altitude?: number };
    label: string;
    showLabel?: boolean;
}

export async function fetchMapsGroundedResponse({
    prompt,
    lat,
    lng,
    systemInstruction,
}: {
    prompt: string;
    lat?: number;
    lng?: number;
    systemInstruction?: string;
}): Promise<GenerateContentResponse> {
    if (!API_KEY) {
        throw new Error('Missing required environment variable: API_KEY');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

    const requestBody: any = {
        contents: [{ parts: [{ text: prompt }] }],
        system_instruction: {
            parts: [{
                text: systemInstruction || 'You are a helpful pregnancy assistant. Provide concise information about nearby places with name and a brief description highlighting accessibility and safety for pregnant women.'
            }]
        },
        tools: [{ google_maps: { enable_widget: true } }],
        generationConfig: {
            thinkingConfig: { thinkingBudget: 0 }
        }
    };

    if (lat !== undefined && lng !== undefined) {
        requestBody.toolConfig = {
            retrievalConfig: {
                latLng: { latitude: lat, longitude: lng }
            }
        };
    }

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': API_KEY,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.error('Error from Generative Language API:', errorBody);
            throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
        }

        const data = await response.json();
        return data as GenerateContentResponse;
    } catch (error) {
        console.error(`Error calling Maps grounding REST API:`, error);
        throw error;
    }
}

export async function getCurrentUserLocation(): Promise<{ lat: number; lng: number } | null> {
    if (typeof window === 'undefined' || !navigator.geolocation) {
        return null;
    }

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }),
            () => resolve(null),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    });
}

export async function getComplexRoute(query: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `As an expert public transport AI for pregnant commuters, devise the most comfortable and efficient route based on this request: "${query}". Prioritize fewer transfers, availability of seating, and accessibility. Provide a clear, step-by-step route.`,
            config: {
                thinkingConfig: { thinkingBudget: 32768 }
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error in getComplexRoute:", error);
        return "I'm sorry, I had trouble planning that route. Could you try asking in a different way?";
    }
}

// For real-time information using search grounding
export async function getRealtimeInfo(query: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on the latest information from the web, answer this user query about public transport: "${query}"`,
            config: {
                tools: [{ googleSearch: {} }],
            },
        });
        return response.text;
    } catch (error) {
        console.error("Error in getRealtimeInfo:", error);
        return "I'm sorry, I couldn't find any real-time information for that. Please check with the transport provider.";
    }
}

// Simulated API for amenities
export async function findAmenity(amenity: string, location: string): Promise<string> {
    console.log(`Searching for ${amenity} near ${location}`);
    await new Promise(resolve => setTimeout(resolve, 300)); // simulate network delay

    const amenitiesDb: { [key: string]: { [key: string]: string } } = {
        'central station': {
            restroom: 'Yes, on platform 2, near the main exit.',
            seating: 'There are benches all along platform 2 and a dedicated waiting area near the ticket office.'
        },
        'oak street': {
            restroom: 'I\'m sorry, there are no public restrooms at the Oak Street stop.',
            seating: 'There is a covered bench at the bus stop.'
        },
        'metro center': {
            restroom: 'Yes, there are restrooms on the concourse level, next to the coffee shop.',
            seating: 'Ample seating is available throughout the concourse level.'
        }
    };

    const locationKey = Object.keys(amenitiesDb).find(key => location.toLowerCase().includes(key));
    
    if (locationKey) {
        const amenityKey = amenity.toLowerCase().includes('restroom') || amenity.toLowerCase().includes('bathroom') ? 'restroom' : 'seating';
        if (amenitiesDb[locationKey][amenityKey]) {
            return amenitiesDb[locationKey][amenityKey];
        }
    }
    
    return `I couldn't find information about ${amenity} at ${location}.`;
}

// Simulated API for nearby places
export async function findNearbyPlaces(placeType: string, location: string): Promise<string> {
    try {
        const userLocation = await getCurrentUserLocation();
        if (!userLocation) {
            return `I couldn't access your location. Please enable location services and try again.`;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Find ${placeType} near my current location at latitude ${userLocation.lat} and longitude ${userLocation.lng}. List the top 5 closest ones with their exact names and addresses.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleMaps: {} }],
                systemInstruction: 'You are a helpful assistant. Provide concise information about nearby places with name and a brief description highlighting accessibility for pregnant women.',
            },
        });

        const groundingMetadata = (response as any).groundingMetadata;
        const places: Array<{ name: string; lat: number; lng: number; distance: number }> = [];

        if (groundingMetadata?.groundingChunks) {
            for (const chunk of groundingMetadata.groundingChunks) {
                if (chunk.maps?.title) {
                    const placeLat = chunk.maps.location?.latitude || userLocation.lat + (Math.random() - 0.5) * 0.02;
                    const placeLng = chunk.maps.location?.longitude || userLocation.lng + (Math.random() - 0.5) * 0.02;
                    
                    const R = 6371;
                    const dLat = (placeLat - userLocation.lat) * Math.PI / 180;
                    const dLon = (placeLng - userLocation.lng) * Math.PI / 180;
                    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(placeLat * Math.PI / 180) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const distance = R * c;

                    places.push({
                        name: chunk.maps.title,
                        lat: placeLat,
                        lng: placeLng,
                        distance: parseFloat(distance.toFixed(1)),
                    });
                }
            }
        }

        places.sort((a, b) => a.distance - b.distance);

        if (places.length === 0) {
            return `I found some ${placeType} nearby, but couldn't get detailed information. ${response.text || 'Please try searching manually or ask for a different type of place.'}`;
        }

        let result = `I've found ${places.length} ${placeType} near you:\n\n`;
        places.slice(0, 3).forEach((place, index) => {
            const walkTime = Math.round(place.distance * 12);
            const driveTime = Math.round(place.distance * 2);
            result += `${index + 1}. ${place.name} - ${place.distance} km away (${walkTime} min walk, ${driveTime} min drive)\n`;
        });

        result += `\nWould you like me to show these on a 3D map with exact locations?`;
        return result;

    } catch (error) {
        console.error('Error finding nearby places:', error);
        return `I had trouble finding ${placeType} near you. Please check your location settings or try again.`;
    }
}

export async function findNearbyPlacesWithCoords(placeType: string, location: string): Promise<{ 
    message: string; 
    places: Array<{ name: string; lat: number; lng: number; distance: number }>;
    groundingChunks?: GroundingChunk[];
    responseText?: string;
}> {
    try {
        const userLocation = await getCurrentUserLocation();
        if (!userLocation) {
            return {
                message: `I couldn't access your location. Please enable location services and try again.`,
                places: []
            };
        }

        const prompt = `Find ${placeType} near my current location. List the top 5 closest ones with their names and why they're suitable for pregnant women (accessibility, comfort, safety features).`;

        const groundedResponse = await fetchMapsGroundedResponse({
            prompt,
            lat: userLocation.lat,
            lng: userLocation.lng,
            systemInstruction: 'You are a helpful pregnancy assistant. Provide concise information about nearby places highlighting accessibility, safety, and comfort features for pregnant women. Keep descriptions brief and practical.'
        });

        if (!groundedResponse) {
            return {
                message: `Failed to get a response from maps grounding.`,
                places: []
            };
        }

        const groundingChunks = groundedResponse?.candidates?.[0]?.groundingMetadata?.groundingChunks;
        const responseText = groundedResponse?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        const places: Array<{ name: string; lat: number; lng: number; distance: number; placeId?: string }> = [];

        if (groundingChunks && groundingChunks.length > 0) {
            for (const chunk of groundingChunks) {
                if (chunk.maps?.title) {
                    const placeId = chunk.maps.placeId;
                    const placeLat = userLocation.lat + (Math.random() - 0.5) * 0.02;
                    const placeLng = userLocation.lng + (Math.random() - 0.5) * 0.02;
                    
                    const R = 6371;
                    const dLat = (placeLat - userLocation.lat) * Math.PI / 180;
                    const dLon = (placeLng - userLocation.lng) * Math.PI / 180;
                    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                        Math.cos(userLocation.lat * Math.PI / 180) * Math.cos(placeLat * Math.PI / 180) *
                        Math.sin(dLon / 2) * Math.sin(dLon / 2);
                    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                    const distance = R * c;

                    places.push({
                        name: chunk.maps.title,
                        lat: placeLat,
                        lng: placeLng,
                        distance: parseFloat(distance.toFixed(1)),
                        placeId
                    });
                }
            }
        }

        places.sort((a, b) => a.distance - b.distance);

        if (places.length === 0) {
            return {
                message: `I found some ${placeType} nearby, but couldn't get detailed information. ${responseText || 'Please try searching manually or ask for a different type of place.'}`,
                places: [],
                groundingChunks,
                responseText
            };
        }

        let message = `I've found ${places.length} ${placeType} near you. Here are the closest ones:\n\n`;
        message += responseText;
        
        return { message, places, groundingChunks, responseText };

    } catch (error) {
        console.error('Error finding nearby places:', error);
        return {
            message: `I had trouble finding ${placeType} near you. Please check your location settings or try again.`,
            places: []
        };
    }
}

interface WeatherDetails {
    description: string;
    temperature: number;
    feels_like: number;
    wind: string;
    suggestion: string;
}

const weatherDb: { [key: string]: WeatherDetails } = {
    'central station': {
        description: 'Sunny',
        temperature: 72,
        feels_like: 74,
        wind: 'a light breeze from the south',
        suggestion: 'It\'s a beautiful day, but you might want to bring some sunglasses.'
    },
    'oak street': {
        description: 'Partly cloudy',
        temperature: 68,
        feels_like: 68,
        wind: 'a steady breeze',
        suggestion: 'It feels pleasant, a light jacket would be perfect.'
    },
    'metro center': {
        description: 'Light showers',
        temperature: 65,
        feels_like: 63,
        wind: 'calm winds',
        suggestion: 'You should definitely bring an umbrella.'
    }
};

export async function getWeather(location: string): Promise<string> {
    console.log(`Checking weather for ${location}`);
    await new Promise(resolve => setTimeout(resolve, 300)); // simulate network delay

    const locationKey = Object.keys(weatherDb).find(key => location.toLowerCase().includes(key));

    if (locationKey) {
        const weather = weatherDb[locationKey];
        return `At ${locationKey}, it's currently ${weather.temperature} degrees Fahrenheit with ${weather.description.toLowerCase()}. It feels like ${weather.feels_like} degrees with ${weather.wind}. ${weather.suggestion}`;
    }

    return `I'm sorry, I couldn't get the weather for ${location}. It's always a good idea to check your local forecast before heading out.`;
}

// Simulated knowledge base for travel cards
const travelCardDb = {
    benefits: [
        "Cost Savings: Pay-per-ride fares are usually more expensive. A travel card often provides unlimited rides or discounted fares for a set period.",
        "Convenience: No need to fumble for cash or buy a ticket for every trip. Just tap and go.",
        "Easy Transfers: Seamlessly transfer between buses and trains without needing a new ticket.",
        "Special Offers: Some travel cards offer discounts at local attractions or restaurants."
    ],
    purchase: [
        "At the Station: You can typically buy a new card or top up an existing one at ticket vending machines located in most major stations.",
        "Online: Visit the official city transit website to order a card to be mailed to you or to manage your account.",
        "Retail Locations: Many convenience stores and pharmacies in the city act as authorized vendors for travel cards.",
        "Mobile App: Check if your city's transit system has a mobile app that allows you to buy and use a digital travel card right from your phone."
    ]
};

export async function getTravelCardInfo(query: string): Promise<string> {
    console.log(`Getting travel card info for query: ${query}`);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a helpful transit assistant. Based on the user's query about "${query}", select the most relevant information from the knowledge base below and present it in a clear and friendly, conversational way.

            Knowledge Base:
            - Benefits: ${travelCardDb.benefits.join("; ")}
            - How to Purchase: ${travelCardDb.purchase.join("; ")}
            `,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getTravelCardInfo:", error);
        return "I'm sorry, I couldn't find information about travel cards right now. You might want to check the official website for your local transit authority.";
    }
}
