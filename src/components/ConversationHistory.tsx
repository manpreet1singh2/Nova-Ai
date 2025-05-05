import React from 'react';
import { MessageType } from '../types';

interface ConversationHistoryProps {
  messages: MessageType[];
  darkMode: boolean;
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ messages, darkMode }) => {
  return (
    <div className="space-y-4">
      {messages.length === 0 && (
        <div className="text-center py-8">
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Ask me a question or say "Hello" to get started
          </p>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
            I can answer questions, tell jokes, check weather, and more!
          </p>
        </div>
      )}
      
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[80%] rounded-2xl px-4 py-3 animate-fadeIn ${
              message.sender === 'user' 
                ? darkMode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-500 text-white' 
                : darkMode 
                  ? 'bg-gray-700 text-white' 
                  : 'bg-gray-200 text-gray-800'
            }`}
          >
            <p>{message.text}</p>
            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationHistory;