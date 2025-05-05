import React from 'react';
import { useAssistant } from '../contexts/AssistantContext';

interface LanguageSelectorProps {
  darkMode: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ darkMode }) => {
  const { currentLanguage, setLanguage } = useAssistant();

  return (
    <select
      value={currentLanguage}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
      className={`text-sm p-1.5 rounded-md ${
        darkMode 
          ? 'bg-gray-700 text-white border-gray-600' 
          : 'bg-white text-gray-800 border-gray-200'
      } border outline-none transition-colors`}
      aria-label="Select language"
    >
      <option value="en">English</option>
      <option value="hi">हिंदी</option>
    </select>
  );
};

export default LanguageSelector;