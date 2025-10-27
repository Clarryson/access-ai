// Commute tools
export {
    getComplexRoute,
    getRealtimeInfo,
    findAmenity,
    findNearbyPlaces,
    getWeather,
    getTravelCardInfo
} from './commute';

// Health tools
export {
    getPregnancyCommuteAdvice,
    getPregnancyMedicalInfo,
    getGeneralPregnancyInfo
} from './health';

// Tool handler for executing function calls
export async function handleToolCall(
    functionName: string,
    args: Record<string, any>,
    apiKey: string
): Promise<string> {
    try {
        switch (functionName) {
            // Commute tools
            case 'get_transport_route':
                const { getComplexRoute } = await import('./commute');
                return await getComplexRoute(`From ${args.origin} to ${args.destination}`, apiKey);
            
            case 'get_realtime_updates':
                const { getRealtimeInfo } = await import('./commute');
                return await getRealtimeInfo(args.query, apiKey);
            
            case 'find_amenity':
                const { findAmenity } = await import('./commute');
                return await findAmenity(args.amenity, args.location);
            
            case 'find_nearby_places':
                const { findNearbyPlaces } = await import('./commute');
                return await findNearbyPlaces(args.place_type, args.location);
            
            case 'get_weather':
                const { getWeather } = await import('./commute');
                return await getWeather(args.location);
            
            case 'get_travel_card_info':
                const { getTravelCardInfo } = await import('./commute');
                return await getTravelCardInfo(args.query, apiKey);
            
            // Health tools
            case 'get_pregnancy_commute_advice':
                const { getPregnancyCommuteAdvice } = await import('./health');
                return await getPregnancyCommuteAdvice(args.topic, apiKey);
            
            case 'get_pregnancy_medical_info':
                const { getPregnancyMedicalInfo } = await import('./health');
                return await getPregnancyMedicalInfo(args.query, apiKey);
            
            case 'get_general_pregnancy_info':
                const { getGeneralPregnancyInfo } = await import('./health');
                return await getGeneralPregnancyInfo(args.query, apiKey);
            
            default:
                return `Unknown function: ${functionName}`;
        }
    } catch (error) {
        console.error(`Error executing tool ${functionName}:`, error);
        return "I'm sorry, I couldn't process that request.";
    }
}

// Client-side UI tools (handled by the client, not the core)
export const CLIENT_SIDE_TOOLS = [
    'start_breathing_exercise',
    'request_seat_aid',
    'show_route_map'
];

export function isClientSideTool(functionName: string): boolean {
    return CLIENT_SIDE_TOOLS.includes(functionName);
}
