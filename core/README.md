# @access-ai/core

AI engine for Access.ai - A comprehensive personal assistant for pregnant women.

## Overview

This package contains the core AI logic, tools, and configurations that power Access.ai across multiple platforms (web, mobile, API).

## Features

- **Gemini AI Integration**: Pre-configured system instructions and function declarations
- **Tool Registry**: Organized tools for commute, health, nutrition, wellness, preparation, and emergency support
- **Type Safety**: Full TypeScript support with exported types
- **Platform Agnostic**: Can be used in web, Node.js, or as part of an API

## Installation

```bash
npm install @access-ai/core
```

Or for local development:

```bash
cd access-ai-core
npm link

cd ../your-project
npm link @access-ai/core
```

## Usage

### Basic Import

```typescript
import {
  SYSTEM_INSTRUCTION,
  functionDeclarations,
  handleToolCall,
  ConversationState,
  FeatureCategory
} from '@access-ai/core';
```

### Using in Web Client

```typescript
import { GoogleGenAI } from '@google/genai';
import { SYSTEM_INSTRUCTION, functionDeclarations } from '@access-ai/core';

const ai = new GoogleGenAI({ apiKey: YOUR_API_KEY });

const session = await ai.live.connect({
  model: 'gemini-2.5-flash-native-audio-preview-09-2025',
  config: {
    systemInstruction: SYSTEM_INSTRUCTION,
    tools: [{ functionDeclarations }],
    // ... other config
  }
});
```

### Using in API Server

```typescript
import { handleToolCall } from '@access-ai/core';

// When you receive a function call from Gemini
const result = await handleToolCall(
  functionCall.name,
  functionCall.args,
  apiKey
);
```

## Tool Categories

### Commute & Mobility
- `get_transport_route` - Route planning
- `get_realtime_updates` - Transit delays
- `find_amenity` - Station facilities
- `find_nearby_places` - Hospitals, pharmacies, etc.
- `get_weather` - Weather forecasts
- `get_travel_card_info` - Travel card information

### Health & Wellness
- `get_pregnancy_commute_advice` - Safety tips
- `get_pregnancy_medical_info` - Medical information (with disclaimers)
- `get_general_pregnancy_info` - General pregnancy advice

### UI Control (Client-side)
- `start_breathing_exercise` - Trigger breathing UI
- `request_seat_aid` - Display seat request card
- `show_route_map` - Show route visualization

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev
```

## License

MIT
