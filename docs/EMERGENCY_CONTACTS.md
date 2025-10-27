# Emergency Contacts Feature

## Overview
The Emergency Contacts feature allows pregnant users to quickly access and call important contacts during emergencies or urgent situations. This feature leverages Google's Gemini Agents to provide intelligent, voice-activated emergency contact management.

## Features

### 1. **Voice-Activated Emergency Calling**
Users can simply say:
- "Call my partner"
- "Call my doctor"
- "Show emergency contacts"
- "I need to call someone"
- "Emergency - call 911"

The AI will automatically understand the intent and display the emergency contacts or initiate a call.

### 2. **Pre-configured Emergency Contacts**
Default contacts include:
- **Partner/Spouse** (Primary)
- **OB/GYN Doctor**
- **Emergency Services (911)** (Primary)
- **Family Member**

### 3. **Auto-Call Feature**
When the AI detects urgency, it can automatically initiate a call to the specified contact using the `call_emergency_contact` tool.

### 4. **Emergency Contacts Card UI**
Beautiful, accessible overlay displaying:
- Contact names with relationship labels
- Phone numbers (formatted)
- Primary contact badges
- One-tap calling
- Animated slide-up entrance

### 5. **Settings Management**
Users can configure their emergency contacts through the Settings panel:
- Edit contact names
- Update phone numbers
- Change relationship labels
- Mark contacts as primary

## Technical Implementation

### Architecture

```
services/emergencyContacts.ts          # Core service layer
  ├── getEmergencyContacts()           # Fetch from localStorage
  ├── saveEmergencyContacts()          # Persist to localStorage
  ├── updateEmergencyContact()         # Update single contact
  ├── makeCall()                       # Initiate tel: link
  └── formatPhoneNumber()              # Format display

components/
  ├── EmergencyContactsCard.tsx        # Main contact display
  └── EmergencyContactsSettings.tsx    # Configuration UI

hooks/useLiveConversation.ts           # Gemini Agent integration
  ├── show_emergency_contacts          # Tool declaration
  ├── call_emergency_contact           # Tool declaration
  └── Handler logic                    # State management
```

### Gemini Agent Tools

#### `show_emergency_contacts`
```typescript
{
  name: 'show_emergency_contacts',
  description: 'Display emergency contacts screen',
  parameters: {
    autoCall: string // Optional: auto-call specific contact
  }
}
```

#### `call_emergency_contact`
```typescript
{
  name: 'call_emergency_contact',
  description: 'Initiate call to specific emergency contact',
  parameters: {
    contactType: string // Required: "partner", "doctor", "emergency", "family"
  }
}
```

### Usage Examples

**Example 1: Show Emergency Contacts**
```
User: "Show me my emergency contacts"
AI: [Calls show_emergency_contacts tool]
UI: Displays EmergencyContactsCard overlay
```

**Example 2: Call Partner**
```
User: "I need to call my partner"
AI: [Calls call_emergency_contact with contactType="partner"]
UI: Displays EmergencyContactsCard with auto-call to partner
System: Initiates tel: link to partner's phone
```

**Example 3: Emergency Situation**
```
User: "Help! I need emergency services!"
AI: [Calls call_emergency_contact with contactType="emergency"]
UI: Displays EmergencyContactsCard with auto-call to 911
System: Initiates tel:911
```

## Data Persistence

Emergency contacts are stored in `localStorage` under the key `emergency_contacts`:

```json
[
  {
    "id": "partner",
    "name": "John Doe",
    "relationship": "Partner/Spouse",
    "phoneNumber": "+1234567890",
    "isPrimary": true
  },
  {
    "id": "doctor",
    "name": "Dr. Smith",
    "relationship": "OB/GYN",
    "phoneNumber": "+1987654321",
    "isPrimary": false
  }
]
```

## Conversation State

Added new state: `SHOWING_EMERGENCY_CONTACTS`

```typescript
export enum ConversationState {
  // ... existing states
  SHOWING_EMERGENCY_CONTACTS,
}
```

## User Flow

1. **Initial Setup** (Optional)
   - User opens Settings → Emergency Contacts
   - Configures contact names and phone numbers
   - Contacts saved to localStorage

2. **Voice Request**
   - User says "Call my doctor"
   - Gemini AI understands intent
   - AI calls `call_emergency_contact` tool
   - mapData stores `{ autoCall: "doctor" }`

3. **UI Display**
   - `conversationState` → `SHOWING_EMERGENCY_CONTACTS`
   - `EmergencyContactsCard` renders
   - Card reads `autoCall` from props
   - Finds matching contact by relationship

4. **Auto-Call**
   - If contact has phone number
   - `makeCall(phoneNumber)` executes
   - Browser opens `tel:+1234567890`
   - User's phone initiates call

5. **Manual Selection**
   - If no auto-call specified
   - User sees all contacts
   - Taps any contact to call
   - Same tel: link flow

## Security & Privacy

- **Local Storage Only**: Contact data never sent to servers
- **No Cloud Sync**: Data stays on device
- **User Control**: User can edit/delete anytime
- **No Audio Recording**: Voice commands processed by Gemini, not stored

## Accessibility

- **High Contrast**: White text on gradient background
- **Large Touch Targets**: 16px padding buttons
- **Screen Reader Support**: Semantic HTML structure
- **Keyboard Navigation**: Tab through contacts
- **Visual Feedback**: Hover states and animations

## Browser Compatibility

### Tel: Link Support
- ✅ iOS Safari - Native dialer opens
- ✅ Android Chrome - Native dialer opens
- ✅ Desktop Chrome - Opens default calling app (Skype, Google Voice, etc.)
- ✅ Desktop Safari - FaceTime or default app
- ⚠️ Desktop Firefox - Prompts to select app

### LocalStorage Support
- ✅ All modern browsers (Chrome, Firefox, Safari, Edge)
- Storage limit: ~5-10MB (more than enough for contacts)

## Future Enhancements

1. **SMS Integration**: Add `sms:` links for texting
2. **Location Sharing**: Share GPS location with emergency contact
3. **Voice Messages**: Pre-recorded emergency voice messages
4. **Multiple Numbers**: Store home, mobile, work numbers
5. **Contact Groups**: Group contacts by urgency level
6. **Call History**: Log of emergency calls made
7. **Quick Actions**: Swipe actions for fast calling
8. **Medical Info Card**: Share medical history during calls

## Testing Checklist

- [ ] Voice command: "Show emergency contacts"
- [ ] Voice command: "Call my partner"
- [ ] Voice command: "Call my doctor"
- [ ] Voice command: "Emergency - call 911"
- [ ] Manual tap on contact to call
- [ ] Edit contact in Settings
- [ ] Save and persist contact data
- [ ] Auto-call on card display
- [ ] Close card and return to conversation
- [ ] Tel: link opens on mobile
- [ ] LocalStorage data persists after refresh

## Support

For issues or questions:
1. Check browser console for errors
2. Verify localStorage has `emergency_contacts` key
3. Ensure phone numbers include country code (+1 for US)
4. Test tel: links manually: `<a href="tel:+1234567890">Test</a>`

## Credits

- **AI Agent**: Google Gemini 2.5 Flash
- **UI Framework**: React 19 + TypeScript
- **Styling**: Inline styles with CSS animations
- **Icons**: Emoji for accessibility
