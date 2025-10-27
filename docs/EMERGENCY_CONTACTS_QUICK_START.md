# Emergency Contacts - Quick Start Guide

## 🚀 Getting Started

### Step 1: Configure Your Contacts (Optional but Recommended)

While Access.ai comes with default emergency contacts, you should configure them with your actual information:

1. **Open Settings** (coming soon - manual configuration for now)
2. **Edit each contact:**
   - **Partner**: Your spouse/partner's name and mobile number
   - **Doctor**: Your OB/GYN's office number
   - **Family**: A trusted family member's number
   - **Emergency**: 911 (pre-configured, or your local emergency number)

### Step 2: Using Voice Commands

Simply speak naturally to Access.ai:

#### Show All Contacts
- *"Show me my emergency contacts"*
- *"I need to see emergency numbers"*
- *"Display emergency contacts"*

#### Call Specific Person
- *"Call my partner"*
- *"I need to call my doctor"*
- *"Call my spouse"*
- *"Contact my family member"*

#### Emergency Situations
- *"Emergency! Call 911"*
- *"Help! I need emergency services"*
- *"Call emergency services now"*

## 📱 How Calling Works

When you request to call someone:

1. **Voice Recognition**: AI understands who you want to call
2. **Contact Match**: System finds the contact by relationship
3. **Card Display**: Emergency contacts card appears
4. **Auto-Dial**: If specific contact requested, call initiates automatically
5. **One-Tap Call**: Tap any contact to call manually

## 🎯 Real-World Examples

### Example 1: Labor Pains
```
You: "I think I'm having contractions. Call my partner."

AI: "I'm calling your partner right away. Stay calm, help is on the way."

[Emergency Contacts card appears with auto-call to Partner]
[Your phone dials partner's number]
```

### Example 2: Need Doctor Advice
```
You: "I have a medical question. Call my doctor."

AI: "I'll call your OB/GYN now."

[Emergency Contacts card appears with auto-call to Doctor]
[Your phone dials doctor's office]
```

### Example 3: Emergency Situation
```
You: "Help! Something's wrong! Emergency!"

AI: "Calling emergency services immediately. Stay on the line."

[Emergency Contacts card appears with auto-call to 911]
[Your phone dials 911]
```

### Example 4: Just Checking Contacts
```
You: "Show me my emergency contacts."

AI: "Here are your emergency contacts."

[Emergency Contacts card appears]
[You can tap any contact to call]
```

## ⚙️ Manual Configuration

If the settings UI isn't available yet, you can configure contacts via browser console:

```javascript
// Open browser console (F12)

// Configure your partner
const contacts = JSON.parse(localStorage.getItem('emergency_contacts') || '[]');
contacts[0] = {
  id: 'partner',
  name: 'John Doe',
  relationship: 'Partner/Spouse',
  phoneNumber: '+11234567890',
  isPrimary: true
};

// Configure your doctor
contacts[1] = {
  id: 'doctor',
  name: 'Dr. Jane Smith',
  relationship: 'OB/GYN',
  phoneNumber: '+19876543210',
  isPrimary: false
};

// Save
localStorage.setItem('emergency_contacts', JSON.stringify(contacts));

// Verify
console.log('Contacts saved:', contacts);
```

## 📞 Phone Number Format

**Important**: Use full international format with country code:

✅ **Correct:**
- `+11234567890` (US)
- `+442071234567` (UK)
- `+61212345678` (Australia)

❌ **Incorrect:**
- `123-456-7890` (missing +1)
- `(123) 456-7890` (missing +)
- `1234567890` (missing country code)

## 🎨 UI Features

### Emergency Contacts Card
- **Gradient Background**: Purple/indigo for visibility
- **Contact Cards**: White translucent with hover effects
- **Primary Badge**: Shows which contacts are primary
- **Formatted Numbers**: Displays as (123) 456-7890
- **Call Icons**: 📱 for ready, 📞 for calling
- **Close Button**: × to dismiss (or tap outside)

### Animations
- **Slide Up**: Card enters from bottom
- **Hover Scale**: Contacts grow slightly on hover
- **Calling State**: Icon changes to 📞 when calling

## 🛡️ Privacy & Security

- ✅ **Local Storage Only**: Your contacts never leave your device
- ✅ **No Cloud Backup**: No server storage
- ✅ **No Sharing**: Access.ai doesn't share contact data
- ✅ **User Control**: You can edit/delete anytime

## 🧪 Testing Your Setup

### Test 1: Check Stored Contacts
```javascript
// Browser console (F12)
console.log(JSON.parse(localStorage.getItem('emergency_contacts')));
```

### Test 2: Test Voice Command
1. Start conversation (click microphone)
2. Say: *"Show emergency contacts"*
3. Card should appear

### Test 3: Test Auto-Call
1. Ensure partner has phone number configured
2. Say: *"Call my partner"*
3. Card appears and tel: link opens
4. Your phone should start dialing

### Test 4: Manual Tap
1. Show emergency contacts
2. Tap any contact with phone number
3. Your phone should start dialing

## ❗ Troubleshooting

### Contact Card Not Showing
- **Check**: Voice command clarity
- **Check**: Microphone permissions
- **Try**: "Show emergency contacts" (exact phrase)

### Call Not Initiating
- **Check**: Phone number includes +1 (or country code)
- **Check**: Browser supports tel: links
- **Try**: Manually tap contact on card

### Contact Data Lost
- **Check**: Browser not in incognito mode
- **Check**: localStorage not cleared
- **Re-save**: Use manual configuration code above

### Wrong Contact Called
- **Check**: Contact relationship matches request
- **Edit**: Update relationship field to match your words
- **Example**: If you say "call my husband", relationship should include "husband" or "partner"

## 🆘 Emergency Contact Best Practices

1. **Test Before You Need It**: Make a test call to verify setup
2. **Keep Updated**: Update phone numbers when they change
3. **Use Primary Wisely**: Mark 1-2 most critical contacts as primary
4. **Include Country Code**: Always use full international format
5. **Medical Emergency**: Keep doctor's emergency/after-hours number
6. **Location**: Consider adding location-sharing contacts
7. **Backup Plan**: Have paper backup of emergency numbers

## 🚨 In a Real Emergency

**If you need immediate help:**

1. **Say**: *"Emergency! Call 911"* (or local emergency number)
2. **Or**: Use your phone directly - don't wait
3. **Stay Calm**: The AI will help, but your safety is priority #1

**Remember**: Access.ai is a helpful tool, but in life-threatening emergencies, always call emergency services directly if you can.

## 📚 Related Features

- **Nearby Hospitals**: *"Find nearby hospitals"*
- **Pregnancy Medical Info**: *"What are signs of labor?"*
- **Breathing Exercise**: *"Help me relax"* (for anxiety)
- **Seat Request Card**: *"I need a seat"* (on public transport)

## 💡 Tips & Tricks

1. **Natural Language**: Just talk naturally - AI understands context
2. **Urgency Detection**: AI recognizes urgency and prioritizes
3. **Multiple Contacts**: You can add more in localStorage
4. **Custom Relationships**: Use any relationship label you want
5. **Voice or Text**: Works with both voice and text input

## 🎯 Next Steps

1. ✅ Configure your emergency contacts
2. ✅ Test with voice command
3. ✅ Verify calling works
4. ✅ Practice for peace of mind
5. ✅ Update as needed

---

**Need Help?** Check the full documentation in `docs/EMERGENCY_CONTACTS.md`
