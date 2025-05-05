import { MessageType } from '../types';

const englishResponses: Record<string, string[]> = {
  greeting: [
    "Hi! I'm Sentra, your personal AI assistant. How can I help you today?",
    "Hello! Ready to make your day easier. What can I do for you?",
    "Greetings! I'm here to assist you with anything you need."
  ],
  weather: [
    "Let me check the current weather conditions for you.",
    "I'll fetch the latest weather information right away.",
    "Getting real-time weather data for your location."
  ],
  joke: [
    "Here's a good one: Why don't programmers like nature? It has too many bugs!",
    "What did the AI say to the coffee machine? 'You're brewing amazing!'",
    "Here's a tech joke: Why do developers prefer dark mode? Because light attracts bugs!"
  ],
  time: [
    `It's currently ${new Date().toLocaleTimeString()}.`,
    `The time is ${new Date().toLocaleTimeString()}.`,
    `Right now it's ${new Date().toLocaleTimeString()}.`
  ],
  capabilities: [
    "I can help you with tasks, answer questions, manage schedules, search information, and much more. Just ask!",
    "From setting reminders to answering complex questions, I'm here to make your life easier. What would you like to know?",
    "I can assist with information lookup, task management, scheduling, and pretty much anything you need help with."
  ],
  default: [
    "I understand what you're asking. Let me help you with that.",
    "I'll find the best way to assist you with this request.",
    "Let me work on that for you right away."
  ]
};

const hindiResponses: Record<string, string[]> = {
  greeting: [
    "नमस्ते! मैं सेंट्रा हूँ, आपका व्यक्तिगत AI सहायक। आज मैं आपकी कैसे मदद कर सकती हूँ?",
    "हैलो! आपका दिन आसान बनाने के लिए तैयार हूँ। मैं आपके लिए क्या कर सकती हूँ?",
    "प्रणाम! मैं आपकी हर ज़रूरत में मदद करने के लिए मौजूद हूँ।"
  ],
  weather: [
    "मैं आपके लिए मौसम की जानकारी चेक कर रही हूँ।",
    "अभी का मौसम बताती हूँ।",
    "वर्तमान मौसम की स्थिति प्राप्त कर रही हूँ।"
  ],
  joke: [
    "एक मजेदार बात: प्रोग्रामर प्रकृति को क्यों नहीं पसंद करते? क्योंकि उसमें बहुत सारे बग्स होते हैं!",
    "AI ने कॉफी मशीन से क्या कहा? 'आप अद्भुत ब्रू कर रहे हैं!'",
    "एक टेक जोक: डेवलपर्स डार्क मोड क्यों पसंद करते हैं? क्योंकि लाइट बग्स को आकर्षित करती है!"
  ],
  time: [
    `अभी का समय ${new Date().toLocaleTimeString()} है।`,
    `वर्तमान समय ${new Date().toLocaleTimeString()} है।`,
    `इस वक्त ${new Date().toLocaleTimeString()} बज रहे हैं।`
  ],
  capabilities: [
    "मैं कार्यों में मदद, सवालों के जवाब, शेड्यूल प्रबंधन, जानकारी खोज और बहुत कुछ कर सकती हूँ। बस पूछिए!",
    "रिमाइंडर सेट करने से लेकर जटिल प्रश्नों के उत्तर तक, मैं आपका जीवन आसान बनाने के लिए हूँ।",
    "मैं जानकारी खोजने, कार्य प्रबंधन, शेड्यूलिंग और लगभग हर चीज में आपकी मदद कर सकती हूँ।"
  ],
  default: [
    "मैं समझ रही हूँ आप क्या पूछ रहे हैं। मैं आपकी मदद करती हूँ।",
    "मैं इस अनुरोध में आपकी सहायता का सबसे अच्छा तरीका खोजूंगी।",
    "मैं तुरंत इस पर काम करती हूँ।"
  ]
};

export const getResponseForPrompt = (prompt: string, language: 'en' | 'hi'): string => {
  const responses = language === 'en' ? englishResponses : hindiResponses;
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('hello') || lowerPrompt.includes('hi') || 
      lowerPrompt.includes('नमस्ते') || lowerPrompt.includes('हैलो')) {
    return getRandomResponse(responses.greeting);
  } else if (lowerPrompt.includes('weather') || lowerPrompt.includes('मौसम')) {
    return getRandomResponse(responses.weather);
  } else if (lowerPrompt.includes('joke') || lowerPrompt.includes('चुटकुला')) {
    return getRandomResponse(responses.joke);
  } else if (lowerPrompt.includes('time') || lowerPrompt.includes('समय')) {
    return getRandomResponse(responses.time);
  } else if (lowerPrompt.includes('what can you do') || lowerPrompt.includes('help') || 
             lowerPrompt.includes('क्या कर सकते हो') || lowerPrompt.includes('मदद')) {
    return getRandomResponse(responses.capabilities);
  } else {
    return getRandomResponse(responses.default);
  }
};

const getRandomResponse = (responses: string[]): string => {
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
};

export const getSpeechUtterance = (text: string, language: 'en' | 'hi'): SpeechSynthesisUtterance => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language === 'en' ? 'en-US' : 'hi-IN';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  return utterance;
};