import { GoogleGenAI } from "@google/genai";

// ============================================
// BABY PREPARATION TOOLS
// ============================================

const hospitalBagItems = {
    forMom: [
        "ID and insurance cards",
        "Birth plan copies",
        "Comfortable pajamas or nightgown",
        "Robe and slippers",
        "Nursing bras",
        "Toiletries (toothbrush, shampoo, etc.)",
        "Phone charger",
        "Snacks",
        "Going-home outfit",
        "Maternity pads"
    ],
    forBaby: [
        "Car seat (installed!)",
        "Going-home outfit (2 sizes)",
        "Blanket",
        "Diapers (hospital usually provides)",
        "Wipes",
        "Pacifiers (if using)",
        "Baby hat and mittens"
    ],
    forPartner: [
        "Snacks and drinks",
        "Change of clothes",
        "Phone charger",
        "Camera",
        "Pillow",
        "Entertainment (book, tablet)"
    ]
};

export async function getHospitalBagChecklist(): Promise<string> {
    const checklist = `Here's your hospital bag checklist:

**For Mom:**
${hospitalBagItems.forMom.map(item => `• ${item}`).join('\n')}

**For Baby:**
${hospitalBagItems.forBaby.map(item => `• ${item}`).join('\n')}

**For Your Partner:**
${hospitalBagItems.forPartner.map(item => `• ${item}`).join('\n')}

Pro tip: Pack around 36 weeks, and keep it by the door!`;
    
    return checklist;
}

export async function getBabyNameSuggestions(preferences: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Suggest 5 baby names based on these preferences: ${preferences}. For each name, include the meaning and origin. Keep it friendly and conversational.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getBabyNameSuggestions:", error);
        return "I'm having trouble with name suggestions right now. Some timeless options include Emma, Olivia, Liam, and Noah. What style of names do you prefer?";
    }
}

export async function getNurseryAdvice(query: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `You are a nursery planning expert. Answer this question about nursery setup: "${query}". Focus on safety, practicality, and budget-friendly options. Be warm and supportive.`,
        });
        return response.text;
    } catch (error) {
        console.error("Error in getNurseryAdvice:", error);
        return "I'm sorry, I couldn't get that information right now. For nursery basics, focus on a safe crib, changing table, and storage. Safety is the top priority!";
    }
}
