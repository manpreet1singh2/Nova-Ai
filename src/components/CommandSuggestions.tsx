import React from 'react';

interface CommandSuggestionsProps {
  onSelectCommand: (command: string) => void;
}

const CommandSuggestions: React.FC<CommandSuggestionsProps> = ({ onSelectCommand }) => {
  const commandCategories = [
    {
      title: "General Questions",
      commands: [
        "What's the weather like today?",
        "What time is it?",
        "Tell me a joke",
        "What can you do?"
      ]
    },
    {
      title: "Personal Assistant",
      commands: [
        "Set a reminder for tomorrow at 9 AM",
        "What's on my calendar today?",
        "Send an email to John",
        "Make a note about the meeting"
      ]
    },
    {
      title: "Fun & Entertainment",
      commands: [
        "Tell me a fun fact",
        "Play some music",
        "Show me the latest news",
        "Give me a movie recommendation"
      ]
    },
    {
      title: "Hindi Commands",
      commands: [
        "आज का मौसम कैसा है?",
        "मुझे एक चुटकुला सुनाओ",
        "समय क्या हुआ है?",
        "आप क्या कर सकते हैं?"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium">Try asking me...</h3>
        <p className="text-sm text-gray-500">Click any suggestion to use it</p>
      </div>
      
      {commandCategories.map((category, i) => (
        <div key={i} className="space-y-2">
          <h4 className="font-medium text-sm text-gray-500">{category.title}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {category.commands.map((command, j) => (
              <button
                key={j}
                onClick={() => onSelectCommand(command)}
                className="text-left p-3 rounded-lg bg-gray-100 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                {command}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommandSuggestions;