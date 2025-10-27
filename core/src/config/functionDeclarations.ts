import { FunctionDeclaration, Type } from '@google/genai';

export const functionDeclarations: FunctionDeclaration[] = [
    // COMMUTE TOOLS
    {
        name: 'get_transport_route',
        description: 'Get a public transport route from an origin to a destination, focusing on comfort for a pregnant person.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                origin: { type: Type.STRING, description: 'The starting point of the journey.' },
                destination: { type: Type.STRING, description: 'The final destination.' },
            },
            required: ['origin', 'destination'],
        },
    },
    {
        name: 'get_realtime_updates',
        description: 'Get real-time updates, such as delays or schedule changes, for a specific transport line or route.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                query: { type: Type.STRING, description: 'The user\'s query about delays, e.g., "delays on the Red Line"' },
            },
            required: ['query'],
        },
    },
    {
        name: 'find_amenity',
        description: 'Find amenities like restrooms or seating areas at a specific public transport stop or station.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                amenity: { type: Type.STRING, description: 'The type of amenity to find, e.g., "restroom" or "seating".' },
                location: { type: Type.STRING, description: 'The stop or station to search at, e.g., "Central Station".' },
            },
            required: ['amenity', 'location'],
        },
    },
    {
        name: 'find_nearby_places',
        description: 'Find nearby facilities like hospitals, restaurants, or pharmacies near a specific location.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                place_type: { type: Type.STRING, description: 'The type of place to search for, e.g., "hospital", "restaurant".' },
                location: { type: Type.STRING, description: 'The area or station to search near, e.g., "Central Station".' },
            },
            required: ['place_type', 'location'],
        },
    },
    {
        name: 'get_weather',
        description: 'Gets the current weather forecast for a specific location or area.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                location: { type: Type.STRING, description: 'The location to get the weather for, e.g., "Central Station" or "downtown".' },
            },
            required: ['location'],
        },
    },
    {
        name: 'get_travel_card_info',
        description: 'Provides information about public transport travel cards, including their benefits and how to purchase them.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                query: { type: Type.STRING, description: 'The user\'s question about travel cards, e.g., "benefits", "where to buy", "how to get one".' },
            },
            required: ['query'],
        },
    },

    // HEALTH & WELLNESS TOOLS
    {
        name: 'get_pregnancy_commute_advice',
        description: 'Provides safety, comfort, or health tips for pregnant commuters.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                topic: { type: Type.STRING, description: 'The topic the user is asking about, e.g., "safety", "comfort", "health", or a specific concern like "feeling dizzy".' },
            },
            required: ['topic'],
        },
    },
    {
        name: 'get_pregnancy_medical_info',
        description: 'Provides general, non-diagnostic information about pregnancy-related medical topics. Always advises users to consult a doctor.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                query: { type: Type.STRING, description: 'The user\'s medical or health-related question, e.g., "what are signs of Braxton Hicks?" or "is it normal to feel tired".' },
            },
            required: ['query'],
        },
    },
    {
        name: 'get_general_pregnancy_info',
        description: 'Provides helpful, non-medical information and advice on general pregnancy topics such as nutrition, exercise, and well-being.',
        parameters: {
            type: Type.OBJECT,
            properties: {
                query: { type: Type.STRING, description: 'The user\'s general question about pregnancy, e.g., "what are some healthy snacks?" or "safe exercises for second trimester".' },
            },
            required: ['query'],
        },
    },

    // UI CONTROL TOOLS (Client-side)
    {
        name: 'start_breathing_exercise',
        description: 'Initiates a guided breathing exercise UI for the user to help them relax or calm down.',
        parameters: { type: Type.OBJECT, properties: {} },
    },
    {
        name: 'request_seat_aid',
        description: 'Displays a full-screen message on the user\'s device to help them request a seat from other passengers.',
        parameters: { type: Type.OBJECT, properties: {} },
    },
    {
        name: 'show_route_map',
        description: 'Displays a static map of the current transport route on the screen. Call this if the user asks to see the map.',
        parameters: { type: Type.OBJECT, properties: {} },
    },
];
