# Maps Integration Guide

## Setup

1. Add your Google Maps API key to `.env.local`:
```bash
GEMINI_API_KEY=your_gemini_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
```

2. Enable required APIs in Google Cloud Console:
   - Maps JavaScript API
   - Places API (New)
   - Geocoding API

## Features

### Live Maps with Nearby Places
When users ask for nearby amenities (hospitals, pharmacies, restaurants), the app:

1. **Gets user's GPS location** automatically
2. **Uses Gemini Maps grounding** to find actual places
3. **Displays interactive map** with:
   - User's current location (blue pulse marker)
   - Nearby places (red pins)
   - Distance calculations
   - Walking/driving time estimates

### User Flow

**Voice:** "Where's the nearest hospital?"
1. AI finds nearby hospitals using Maps grounding
2. Lists top 3-5 with distances
3. Offers to show on map
4. User can say "Show me on a map"
5. Interactive map opens with all locations

### Implementation

**Key Files:**
- `services/commute.ts` - Maps grounding integration
- `components/LiveMap.tsx` - Interactive map component
- `hooks/useLiveConversation.ts` - Tool orchestration

**Clean Code Principles:**
- No hardcoded API keys (env variables only)
- Minimal comments
- Error handling for location permissions
- Fallback UI for denied permissions
- Distance calculations using Haversine formula

## Testing

Try these commands:
- "Where is the nearest hospital?"
- "Find pharmacies near me"
- "Show me restaurants nearby"
- "Can you show that on a map?"

## Security

- ✅ API keys in environment variables
- ✅ No sensitive data in source code
- ✅ Client-side geolocation (no server storage)
- ✅ HTTPS required for geolocation API
