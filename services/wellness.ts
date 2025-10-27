import { GoogleGenAI } from "@google/genai";

// ============================================
// WELLNESS & EXERCISE TOOLS
// ============================================

export async function getExerciseAdvice(trimester: string, query: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a prenatal fitness expert. The user is in ${trimester} and asks: "${query}". Provide safe exercise recommendations appropriate for this stage of pregnancy. Always remind them to check with their doctor before starting any exercise program.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getExerciseAdvice:", error);
        return "I'm sorry, I couldn't get that information. In general, walking, swimming, and prenatal yoga are great options. Always check with your doctor before starting any exercise program.";
    }
}

export async function getSleepAdvice(issue: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a pregnancy sleep expert. The user is having this sleep issue: "${issue}". Provide practical, safe tips for better sleep during pregnancy. Be empathetic and supportive.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getSleepAdvice:", error);
        return "I'm sorry, I couldn't get that information. Try sleeping on your left side with a pillow between your knees. Avoid screens before bed and keep your room cool and dark.";
    }
}
