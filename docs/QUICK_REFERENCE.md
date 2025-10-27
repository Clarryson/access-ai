# Quick Reference - Access.ai PA Features

## 🎤 What Users Can Ask Now

### 🥗 Nutrition & Diet
- "Can I eat [food]?" (sushi, cheese, coffee, etc.)
- "Give me a meal plan for [preference]" (vegetarian, high protein, etc.)
- "How much [nutrient] do I need?" (calcium, iron, protein, etc.)
- "What are good foods for [concern]?" (nausea, energy, etc.)

### 👶 Baby Preparation
- "What should I pack in my hospital bag?"
- "Suggest some baby names" (can add preferences)
- "Help me plan my nursery"
- "What are nursery essentials?"
- "How do I set up a nursery on a budget?"

### 🧘 Wellness & Exercise
- "I'm feeling stressed/anxious" → Offers breathing exercise
- "Safe exercises for [trimester]?"
- "Can I do yoga/run/swim?"
- "I can't sleep" → Gives sleep tips
- "Help with insomnia"

### 📚 Education
- "What's happening at week [number]?"
- "Tell me about [trimester]"
- "What should I expect this week?"

### 🏥 Health (Existing)
- "Is [symptom] normal?"
- "When should I call my doctor?"
- "Tell me about [condition]"

### 🚌 Commute (Existing)
- "Plan a route from [A] to [B]"
- "Where is the nearest hospital?"
- "Find a restroom at [station]"
- "Help me ask for a seat"
- "Show me a map"
- "What's the weather?"

## 🛠️ Available Tools (20 total)

### Nutrition (3)
1. `check_food_safety` - Is this food safe?
2. `get_meal_plan` - Create meal plans
3. `get_nutrition_advice` - Nutrition questions

### Baby Prep (3)
4. `get_hospital_bag_checklist` - What to pack
5. `get_baby_name_suggestions` - Name ideas
6. `get_nursery_advice` - Nursery planning

### Wellness (2)
7. `get_exercise_advice` - Safe exercises
8. `get_sleep_advice` - Sleep tips

### Education (1)
9. `get_week_by_week_info` - Weekly development

### Health (3)
10. `get_pregnancy_commute_advice` - Travel safety
11. `get_pregnancy_medical_info` - Medical questions
12. `get_general_pregnancy_info` - General advice

### Commute (6)
13. `get_transport_route` - Route planning
14. `get_realtime_updates` - Transit delays
15. `find_amenity` - Station facilities
16. `find_nearby_places` - Nearby locations
17. `get_weather` - Weather info
18. `get_travel_card_info` - Travel cards

### UI Actions (3)
19. `start_breathing_exercise` - Breathing UI
20. `request_seat_aid` - Seat request card
21. `show_route_map` - Route visualization

## 🎯 Best Demo Questions

1. **"Can I eat sushi?"** - Shows food safety
2. **"What's happening at week 20?"** - Shows education
3. **"I'm feeling stressed"** - Shows breathing exercise
4. **"What should I pack in my hospital bag?"** - Shows preparation
5. **"Where is the nearest hospital?"** - Shows commute safety

## 🚀 Quick Start Testing

```bash
npm run dev
```

Then try these in order:
1. Click microphone
2. Say: "Can I eat sushi?"
3. Wait for response
4. Say: "What should I pack in my hospital bag?"
5. Say: "I'm feeling anxious"
6. Watch breathing exercise activate!

## 📊 Feature Coverage

| Category | Tools | Status |
|----------|-------|--------|
| Nutrition | 3 | ✅ Done |
| Baby Prep | 3 | ✅ Done |
| Wellness | 2 | ✅ Done |
| Education | 1 | ✅ Done |
| Health | 3 | ✅ Existing |
| Commute | 6 | ✅ Existing |
| UI Actions | 3 | ✅ Existing |
| **TOTAL** | **21** | **✅ Ready** |

## 🐛 If Something Breaks

1. **Check console** for errors
2. **Verify API key** in .env.local
3. **Check imports** in geminiService.ts
4. **Test microphone** permissions
5. **Try in Chrome/Edge** (best support)

## 💡 Tips for Demo

- **Speak clearly** and naturally
- **Wait for response** before next question
- **Have backup** questions ready
- **Show variety** of features
- **Explain as you go** what's happening

## 📝 What Changed

### Files Modified
- `services/geminiService.ts` - Added 9 new functions
- `hooks/useLiveConversation.ts` - Updated system instruction + 11 new tools
- `App.tsx` - Updated tagline and suggestions
- `metadata.json` - Updated description

### New Capabilities
- Food safety checking
- Meal planning
- Hospital bag checklist
- Baby name suggestions
- Nursery advice
- Exercise guidance
- Sleep tips
- Week-by-week info

---

**Everything is ready! Just test and polish.** 🎉
