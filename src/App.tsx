import React, { useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import AssistantInterface from './components/AssistantInterface';
import { AssistantProvider } from './contexts/AssistantContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
      <div className="absolute top-4 right-4">
        <button 
          onClick={toggleDarkMode} 
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-800'} shadow-lg transition-all duration-300 hover:scale-110`}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      
      <AssistantProvider>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
          <AssistantInterface darkMode={darkMode} />
        </div>
      </AssistantProvider>
    </div>
  );
}

export default App;