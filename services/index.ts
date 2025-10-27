// ============================================
// ACCESS.AI SERVICE EXPORTS
// Organized by category for better maintainability
// ============================================

// Commute & Mobility
export {
    getComplexRoute,
    getRealtimeInfo,
    findAmenity,
    findNearbyPlaces,
    findNearbyPlacesWithCoords,
    getWeather,
    getTravelCardInfo
} from './commute';

// Health & Medical
export {
    getPregnancyCommuteAdvice,
    getPregnancyMedicalInfo,
    getGeneralPregnancyInfo
} from './health';

// Nutrition & Diet
export {
    checkFoodSafety,
    getMealPlan,
    getNutritionAdvice
} from './nutrition';

// Baby Preparation
export {
    getHospitalBagChecklist,
    getBabyNameSuggestions,
    getNurseryAdvice
} from './babyPrep';

// Wellness & Exercise
export {
    getExerciseAdvice,
    getSleepAdvice
} from './wellness';

// Education
export {
    getWeekByWeekInfo
} from './education';

// Maps & Geolocation
export {
    getCurrentLocation,
    findNearbyPlacesWithMaps,
    showLocationOnMap
} from './maps';
