import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MessageType } from '../types';
import { getResponseForPrompt } from '../utils/assistantUtils';

interface AssistantContextType {
  messages: MessageType[];
  addUserMessage: (message: string) => void;
  isListening: boolean;
  toggleListening: () => void;
  processingResponse: boolean;
  currentLanguage: 'en' | 'hi';
  setLanguage: (language: 'en' | 'hi') => void;
}

const AssistantContext = createContext<AssistantContextType | undefined>(undefined);

export const AssistantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [processingResponse, setProcessingResponse] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi'>('en');

  // Mock speech recognition functionality
  useEffect(() => {
    if (!isListening) return;
    
    // In a real implementation, this would connect to the Web Speech API
    const timer = setTimeout(() => {
      // Auto-stop listening after 5 seconds (simulated)
      setIsListening(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [isListening]);

  const addUserMessage = useCallback((text: string) => {
    const userMessage: MessageType = {
      sender: 'user',
      text,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setProcessingResponse(true);
    
    // Simulate assistant thinking and responding
    setTimeout(() => {
      const response = getResponseForPrompt(text, currentLanguage);
      
      const assistantMessage: MessageType = {
        sender: 'assistant',
        text: response,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setProcessingResponse(false);
      
      // Text-to-speech would be triggered here in a real implementation
    }, 1000);
  }, [currentLanguage]);

  const toggleListening = useCallback(() => {
    setIsListening(prev => !prev);
  }, []);

  const setLanguage = useCallback((language: 'en' | 'hi') => {
    setCurrentLanguage(language);
  }, []);

  return (
    <AssistantContext.Provider 
      value={{ 
        messages, 
        addUserMessage, 
        isListening, 
        toggleListening,
        processingResponse,
        currentLanguage,
        setLanguage
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
};

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (context === undefined) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};