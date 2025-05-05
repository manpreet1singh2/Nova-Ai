import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Volume2, X } from 'lucide-react';
import { useAssistant } from '../contexts/AssistantContext';
import WaveformVisualizer from './WaveformVisualizer';
import ConversationHistory from './ConversationHistory';
import CommandSuggestions from './CommandSuggestions';
import LanguageSelector from './LanguageSelector';

interface AssistantInterfaceProps {
  darkMode: boolean;
}

const AssistantInterface: React.FC<AssistantInterfaceProps> = ({ darkMode }) => {
  const { 
    messages, 
    addUserMessage, 
    isListening, 
    toggleListening,
    processingResponse,
    currentLanguage,
  } = useAssistant();
  
  const [inputText, setInputText] = useState('');
  const [showCommands, setShowCommands] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      addUserMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white/90 text-gray-800'} backdrop-blur-md`}>
      <div className="flex justify-between items-center p-4 border-b border-opacity-20 border-gray-300">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full animate-pulse ${isListening ? 'bg-green-500' : processingResponse ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
          <h1 className="text-xl font-semibold">Sentra</h1>
        </div>
        <div className="flex items-center space-x-2">
          <LanguageSelector darkMode={darkMode} />
          <button
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
            onClick={() => setShowCommands(!showCommands)}
            aria-label="Show command suggestions"
          >
            {showCommands ? (
              <X className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {showCommands ? (
          <CommandSuggestions onSelectCommand={(cmd) => {
            setInputText(cmd);
            setShowCommands(false);
            inputRef.current?.focus();
          }} />
        ) : (
          <ConversationHistory messages={messages} darkMode={darkMode} />
        )}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="border-t border-opacity-20 border-gray-300">
        {isListening && (
          <div className="p-4 flex justify-center">
            <WaveformVisualizer darkMode={darkMode} />
          </div>
        )}
        
        <div className="p-4 flex items-center space-x-2">
          <button
            onClick={toggleListening}
            className={`p-3 rounded-full ${isListening ? 'bg-red-500 text-white' : darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} transition-all duration-300 hover:shadow-lg`}
            aria-label={isListening ? 'Stop listening' : 'Start listening'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask me anything in ${currentLanguage === 'en' ? 'English' : 'हिंदी'}...`}
            className={`flex-1 p-3 rounded-lg ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800 placeholder-gray-500'} outline-none transition-all focus:ring-2 focus:ring-blue-500`}
          />
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`p-3 rounded-full ${darkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} ${!inputText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:shadow-lg'} transition-all duration-300`}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssistantInterface;