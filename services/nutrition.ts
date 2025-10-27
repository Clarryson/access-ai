import { GoogleGenAI } from "@google/genai";

// ============================================
// NUTRITION & DIET TOOLS
// ============================================

const safeFoodsDb = {
    safe: {
        fruits: ["apples", "bananas", "oranges", "berries", "melons", "grapes (washed)"],
        vegetables: ["carrots", "broccoli", "spinach (cooked)", "sweet potatoes", "bell peppers"],
        proteins: ["cooked chicken", "cooked beef", "cooked pork", "eggs (fully cooked)", "beans", "lentils"],
        dairy: ["pasteurized milk", "hard cheeses", "yogurt", "cottage cheese"],
        grains: ["whole wheat bread", "brown rice", "oatmeal", "quinoa", "pasta"],
        seafood: ["salmon (cooked)", "shrimp (cooked)", "tilapia", "cod", "canned tuna (limit)"]
    },
    avoid: {
        rawMeat: ["raw fish (sushi)", "raw eggs", "rare steak", "deli meats (unless heated)", "pâté"],
        unpasteurized: ["soft cheeses (brie, feta, blue)", "unpasteurized milk", "raw milk cheese"],
        highMercury: ["shark", "swordfish", "king mackerel", "tilefish", "bigeye tuna"],
        other: ["alcohol", "raw sprouts", "unwashed produce", "excessive caffeine (>200mg/day)"]
    },
    moderation: ["caffeine (1-2 cups coffee)", "artificial sweeteners", "processed foods", "high-sodium foods"]
};

export async function checkFoodSafety(food: string): Promise<string> {
    const foodLower = food.toLowerCase();
    
    // Check if food is in safe list
    for (const [category, items] of Object.entries(safeFoodsDb.safe)) {
        if (items.some(item => foodLower.includes(item.toLowerCase()))) {
            return `Yes, ${food} is generally safe during pregnancy! It's a good source of nutrition. Just make sure it's properly washed and cooked if needed.`;
        }
    }
    
    // Check if food is in avoid list
    for (const [category, items] of Object.entries(safeFoodsDb.avoid)) {
        if (items.some(item => foodLower.includes(item.toLowerCase()))) {
            return `I'd recommend avoiding ${food} during pregnancy due to potential risks like bacteria or high mercury. There are safer alternatives I can suggest if you'd like!`;
        }
    }
    
    // Check moderation list
    if (safeFoodsDb.moderation.some(item => foodLower.includes(item.toLowerCase()))) {
        return `${food} is okay in moderation during pregnancy. Just be mindful of portion sizes and frequency.`;
    }
    
    // Use AI for unknown foods
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `As a pregnancy nutrition expert, is "${food}" safe to eat during pregnancy? Provide a clear yes/no answer with a brief explanation. If there are any precautions, mention them. Keep it friendly and reassuring.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error in checkFoodSafety:", error);
        return "I'm not sure about that specific food. To be safe, I'd recommend checking with your doctor or a registered dietitian.";
    }
}

export async function getMealPlan(preferences: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Create a simple, nutritious meal plan for a pregnant woman. Preferences: ${preferences}. Include breakfast, lunch, dinner, and 2 snacks. Focus on foods rich in folate, iron, calcium, and protein. Keep it practical and easy to prepare. Format as a friendly, conversational response.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getMealPlan:", error);
        return "I'm having trouble creating a meal plan right now. In general, focus on fruits, vegetables, whole grains, lean proteins, and dairy. Stay hydrated and take your prenatal vitamins!";
    }
}

export async function getNutritionAdvice(query: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a pregnancy nutrition expert. Answer this question in a friendly, supportive way: "${query}". Provide practical advice and emphasize the importance of consulting with their healthcare provider for personalized guidance.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getNutritionAdvice:", error);
        return "I'm sorry, I couldn't retrieve that information right now. Please consult with your doctor or a registered dietitian for personalized nutrition advice.";
    }
}
