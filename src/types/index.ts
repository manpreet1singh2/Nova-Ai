export interface MessageType {
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type LanguageType = 'en' | 'hi';