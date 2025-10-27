# Services Directory

Clean, organized service files for Access.ai

## Structure

```
services/
├── index.ts           # Main export file
├── geminiService.ts   # Backward compatibility (re-exports index)
├── commute.ts         # Commute & mobility tools
├── health.ts          # Health & medical tools
├── nutrition.ts       # Nutrition & diet tools
├── babyPrep.ts        # Baby preparation tools
├── wellness.ts        # Wellness & exercise tools
└── education.ts       # Week-by-week information
```

## Files Overview

### `commute.ts` (6 functions)
- `getComplexRoute()` - Route planning with deep reasoning
- `getRealtimeInfo()` - Transit delays with search grounding
- `findAmenity()` - Station facilities
- `findNearbyPlaces()` - Nearby locations
- `getWeather()` - Weather forecasts
- `getTravelCardInfo()` - Travel card information

### `health.ts` (3 functions)
- `getPregnancyCommuteAdvice()` - Travel safety tips
- `getPregnancyMedicalInfo()` - Medical questions (with disclaimers)
- `getGeneralPregnancyInfo()` - General pregnancy advice

### `nutrition.ts` (3 functions)
- `checkFoodSafety()` - "Can I eat this?" checker
- `getMealPlan()` - Meal planning
- `getNutritionAdvice()` - Nutrition questions

### `babyPrep.ts` (3 functions)
- `getHospitalBagChecklist()` - What to pack
- `getBabyNameSuggestions()` - Name ideas
- `getNurseryAdvice()` - Nursery planning

### `wellness.ts` (2 functions)
- `getExerciseAdvice()` - Safe exercises by trimester
- `getSleepAdvice()` - Sleep tips

### `education.ts` (1 function)
- `getWeekByWeekInfo()` - Weekly pregnancy development

## Usage

### Import from main service file (recommended)
```typescript
import { checkFoodSafety, getComplexRoute } from '../services/geminiService';
```

### Import from specific category (also works)
```typescript
import { checkFoodSafety } from '../services/nutrition';
import { getComplexRoute } from '../services/commute';
```

### Import from index (also works)
```typescript
import { checkFoodSafety, getComplexRoute } from '../services';
```

## Adding New Functions

1. **Choose the right category file** (or create a new one)
2. **Add your function** with proper error handling
3. **Export it** in that file
4. **Add export** to `services/index.ts`
5. **Test** that imports still work

Example:
```typescript
// In services/nutrition.ts
export async function trackWaterIntake(glasses: number): Promise<string> {
    // Implementation
}

// In services/index.ts
export { trackWaterIntake } from './nutrition';
```

## Benefits of This Structure

✅ **Organized** - Easy to find functions by category
✅ **Maintainable** - Smaller files, easier to edit
✅ **Scalable** - Add new categories easily
✅ **Backward Compatible** - Old imports still work
✅ **Team Friendly** - Multiple people can work on different files

## Total Functions: 21

- Commute: 6
- Health: 3
- Nutrition: 3
- Baby Prep: 3
- Wellness: 2
- Education: 1
- UI Actions: 3 (handled in hooks)
