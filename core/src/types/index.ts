export enum ConversationState {
  IDLE,
  LISTENING,
  PROCESSING,
  SPEAKING,
  BREATHING,
  DISPLAYING_CARD,
  SHOWING_MAP,
}

export enum FeatureCategory {
  COMMUTE = 'commute',
  HEALTH = 'health',
  NUTRITION = 'nutrition',
  WELLNESS = 'wellness',
  PREPARATION = 'preparation',
  EMERGENCY = 'emergency',
  GENERAL = 'general',
}

export interface UserProfile {
  weekOfPregnancy?: number;
  dueDate?: Date;
  preferences?: UserPreferences;
  medicalHistory?: MedicalInfo;
}

export interface UserPreferences {
  language?: string;
  voicePreference?: string;
  notificationsEnabled?: boolean;
}

export interface MedicalInfo {
  allergies?: string[];
  conditions?: string[];
  medications?: string[];
}

export interface ToolCall {
  id: string;
  name: string;
  args: Record<string, any>;
}

export interface ToolResponse {
  id: string;
  name: string;
  response: {
    result: string;
  };
}

export interface ConversationConfig {
  apiKey: string;
  systemInstruction?: string;
  voiceName?: string;
  userProfile?: UserProfile;
}

export interface AudioBlob {
  data: string;
  mimeType: string;
}
