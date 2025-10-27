import { GoogleGenAI } from "@google/genai";

// ============================================
// WEEK-BY-WEEK INFORMATION
// ============================================

export async function getWeekByWeekInfo(week: number): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `Provide week ${week} pregnancy information. Include: baby's development, mom's body changes, tips for the week, and what to expect. Keep it warm, encouraging, and informative. Format in a conversational way.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getWeekByWeekInfo:", error);
        return `I'm having trouble getting week ${week} information right now. Each week brings new developments for you and your baby. Check with your healthcare provider for personalized information!`;
    }
}
