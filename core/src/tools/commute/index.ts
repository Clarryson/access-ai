import { GoogleGenAI } from "@google/genai";

// For complex routing with deep reasoning
export async function getComplexRoute(query: string, apiKey: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey });
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
export async function getRealtimeInfo(query: string, apiKey: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey });
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
const nearbyPlacesDb: { [key: string]: { [key: string]: string[] } } = {
    'central station': {
        hospital: ['City General Hospital (1.2 miles away)', 'Urgent Care Clinic (0.8 miles away)'],
        restaurant: ['The Grand Cafe (inside station)', 'Quick Bites Sandwiches (across the street)'],
        pharmacy: ['Downtown Pharmacy (2 blocks away)']
    },
    'oak street': {
        restaurant: ['Oak Street Diner (at the corner)'],
        hospital: ['The closest hospital is City General, which is about 3 miles from here.']
    },
    'metro center': {
        hospital: ['Metro Health Clinic (in the same building, 2nd floor)'],
        restaurant: ['Food Court (lower level)', 'Star Coffee (concourse level)'],
        pharmacy: ['HealthPlus Pharmacy (lower level)']
    }
};

export async function findNearbyPlaces(placeType: string, location: string): Promise<string> {
    console.log(`Searching for ${placeType} near ${location}`);
    await new Promise(resolve => setTimeout(resolve, 300)); // simulate network delay

    const locationKey = Object.keys(nearbyPlacesDb).find(key => location.toLowerCase().includes(key));
    if (!locationKey) {
        return `I'm sorry, I don't have information for the location "${location}".`;
    }

    let normalizedPlaceType = placeType.toLowerCase().replace(/s$/, '');
    if (['food', 'eat'].includes(normalizedPlaceType)) {
        normalizedPlaceType = 'restaurant';
    }

    const places = nearbyPlacesDb[locationKey][normalizedPlaceType];

    if (places && places.length > 0) {
        return `Yes, near ${locationKey}, I found: ${places.join(', ')}.`;
    }

    return `I couldn't find any places of type "${placeType}" near ${location}.`;
}

// Enhanced Simulated API for Weather
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

export async function getTravelCardInfo(query: string, apiKey: string): Promise<string> {
    console.log(`Getting travel card info for query: ${query}`);
    try {
        const ai = new GoogleGenAI({ apiKey });
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
