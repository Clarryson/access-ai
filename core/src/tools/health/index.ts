import { GoogleGenAI } from "@google/genai";

// Simulated knowledge base for pregnancy-related commuting advice
const adviceDb = {
    safety: [
        "Hold onto handrails when standing or walking on a moving bus or train.",
        "Choose to stand away from the doors to avoid being jostled.",
        "If you feel dizzy or unwell, get off at the next stop and rest. Don't push yourself.",
        "Be aware of your surroundings, especially in crowded stations.",
        "Wear comfortable, non-slip shoes to prevent falls."
    ],
    comfort: [
        "Don't be shy about asking for a priority seat if you need one.",
        "Carry a water bottle to stay hydrated throughout your journey.",
        "Dress in layers so you can adjust to changing temperatures on the train or bus.",
        "Pack a small, healthy snack to keep your energy levels up.",
        "Use a small pillow or a rolled-up jacket for back support if you're sitting for a long time."
    ],
    health: [
        "Carry your doctor's contact information with you at all times.",
        "If you start to feel unwell, don't hesitate to ask for help from transport staff or fellow passengers.",
        "Avoid traveling during peak hours if possible to reduce stress and exposure to crowds.",
        "Practice deep breathing exercises if you feel anxious or overwhelmed."
    ]
};

export async function getPregnancyCommuteAdvice(topic: string, apiKey: string): Promise<string> {
    console.log(`Getting advice for topic: ${topic}`);
    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are an expert on pregnancy and commuting. Based on the user's query about "${topic}", select the most relevant tips from the knowledge base below and present them in a friendly, reassuring, and conversational way. If the query doesn't match a specific category, provide general advice.

            Knowledge Base:
            - Safety: ${adviceDb.safety.join("; ")}
            - Comfort: ${adviceDb.comfort.join("; ")}
            - Health: ${adviceDb.health.join("; ")}
            `,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getPregnancyCommuteAdvice:", error);
        return "I'm sorry, I couldn't retrieve that advice right now. The most important thing is to listen to your body and prioritize your safety.";
    }
}

// For general pregnancy medical questions
export async function getPregnancyMedicalInfo(query: string, apiKey: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `You are a helpful AI assistant providing general information about pregnancy. You are NOT a medical professional. Your answer MUST begin with the disclaimer: "I am not a medical professional, and this information is for educational purposes only. Please consult your doctor for any medical advice." Based on this, answer the following question in a clear, reassuring, and easy-to-understand way: "${query}"`,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getPregnancyMedicalInfo:", error);
        return "I'm sorry, I'm unable to provide information on that topic right now. Please consult a healthcare professional for any medical questions.";
    }
}

// For general, non-medical pregnancy questions
export async function getGeneralPregnancyInfo(query: string, apiKey: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: `You are a helpful and reassuring AI assistant for expectant mothers. Answer the following general, non-medical question about pregnancy (e.g., nutrition, exercise, lifestyle) in a supportive and informative way. End your response with a gentle reminder to consult a healthcare professional for personalized advice. Question: "${query}"`,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getGeneralPregnancyInfo:", error);
        return "I'm sorry, I was unable to find information on that topic. It's always best to speak with your doctor about any questions you have during your pregnancy.";
    }
}
