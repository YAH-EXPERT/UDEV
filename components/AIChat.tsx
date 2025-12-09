import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Cpu, Mic, Volume2, StopCircle, Loader2 } from 'lucide-react';
import { chatWithGemini, generateSpeech } from '../services/geminiService';
import { ChatMessage, Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useChat } from '../context/ChatContext';

// Helper to decode Base64
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper to decode PCM data
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      // Convert PCM 16-bit to Float32
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const AIChat: React.FC = () => {
  const { isChatOpen, toggleChat } = useChat();
  const { setLanguage, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [hasChosenLang, setHasChosenLang] = useState(false);
  
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSend(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isChatOpen, hasChosenLang]);

  const startListening = () => {
    if (recognitionRef.current) {
      setIsListening(true);
      // Set lang based on current selection
      recognitionRef.current.lang = language === 'fr' ? 'fr-FR' : language === 'mg' ? 'mg-MG' : 'en-US'; 
      recognitionRef.current.start();
    } else {
      alert("Voice input not supported in this browser.");
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    setIsSpeaking(false);
  };

  const speakText = async (text: string) => {
    stopSpeaking(); // Stop any previous audio
    setIsSpeaking(true);

    try {
      // Attempt to use High-Quality Gemini TTS for EN/FR
      const audioData = await generateSpeech(text, language);

      if (audioData) {
        // Use Gemini Audio
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const buffer = await decodeAudioData(decode(audioData), ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsSpeaking(false);
        source.start(0);
      } else {
        // Fallback to Browser TTS (Standard Google Voices in Chrome)
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'fr' ? 'fr-FR' : language === 'mg' ? 'mg-MG' : 'en-US'; 
        
        // Try to find a "Google" voice if available in browser
        const voices = window.speechSynthesis.getVoices();
        const googleVoice = voices.find(v => v.name.includes('Google') && v.lang.startsWith(language === 'fr' ? 'fr' : 'en'));
        if (googleVoice) utterance.voice = googleVoice;

        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {
      console.error("Audio Playback Error", e);
      setIsSpeaking(false);
    }
  };

  const handleLanguageChoice = (lang: Language) => {
    setLanguage(lang);
    setHasChosenLang(true);
    let greeting = "";
    if (lang === 'mg') greeting = "Manao ahoana! MGAI aho. Afaka manampy anao amin'ny tetikasanao aho.";
    else if (lang === 'fr') greeting = "Bonjour ! Je suis MGAI. Je suis là pour vous aider avec vos projets.";
    else greeting = "Hello! I am MGAI. I am here to help you with your projects.";
    
    setMessages([{ role: 'model', text: greeting }]);
    speakText(greeting);
  };

  const handleSend = async (manualText?: string) => {
    const textToSend = manualText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Prepare history
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const responseText = await chatWithGemini(userMsg.text, history, language);
    
    const replyText = responseText || (language === 'mg' ? "Miala tsiny, misy olana." : "Error reconnecting.");
    setMessages(prev => [...prev, { role: 'model', text: replyText }]);
    setIsLoading(false);
    
    // Auto speak response
    speakText(replyText);
  };

  return (
    <>
      <motion.button
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full shadow-lg shadow-cyan-500/20 text-white cursor-hover"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
      >
        {isChatOpen ? <X size={24} /> : <Cpu size={24} />}
      </motion.button>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-50 w-80 md:w-96 h-[550px] glass-panel rounded-2xl flex flex-col overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-900/50"
          >
            {/* Header */}
            <div className="p-4 bg-black/60 border-b border-white/10 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isLoading || isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-cyan-400'}`} />
                <span className="font-display font-bold text-sm tracking-widest text-cyan-100">MGAI INTERFACE</span>
              </div>
              <div className="flex gap-2">
                 <button onClick={stopSpeaking} className={`transition-colors ${isSpeaking ? 'text-green-400 animate-pulse' : 'text-white/30 hover:text-white'}`} title="Toggle Voice">
                   <Volume2 size={16} />
                 </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-black/20 relative">
              
              {!hasChosenLang ? (
                 <div className="flex flex-col items-center justify-center h-full gap-6">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30 mb-2">
                      <Cpu size={32} className="text-cyan-400" />
                    </div>
                    <p className="text-center text-cyan-100 mb-4 font-light">Select Language / Safidio ny teny</p>
                    <div className="grid grid-cols-1 gap-3 w-full px-8">
                       <button onClick={() => handleLanguageChoice('mg')} className="py-3 px-6 bg-cyan-900/30 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-white font-bold transition-all flex items-center justify-center gap-2">
                          <span>🇲🇬</span> Malagasy
                       </button>
                       <button onClick={() => handleLanguageChoice('fr')} className="py-3 px-6 bg-cyan-900/30 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-white font-bold transition-all flex items-center justify-center gap-2">
                          <span>🇫🇷</span> Français
                       </button>
                       <button onClick={() => handleLanguageChoice('en')} className="py-3 px-6 bg-cyan-900/30 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg text-white font-bold transition-all flex items-center justify-center gap-2">
                          <span>🇺🇸</span> English
                       </button>
                    </div>
                 </div>
              ) : (
                <>
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-cyan-600/20 text-cyan-50 border border-cyan-500/30 rounded-tr-sm'
                            : 'bg-slate-900/80 text-slate-200 border border-slate-700/50 rounded-tl-sm'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-900/80 p-3 rounded-2xl rounded-tl-sm border border-slate-700/50 flex gap-2 items-center">
                        <Loader2 size={14} className="animate-spin text-cyan-400" />
                        <span className="text-xs text-slate-400">Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input */}
            {hasChosenLang && (
              <div className="p-4 bg-black/60 border-t border-white/10 flex gap-2 items-center backdrop-blur-md">
                <button
                   onClick={isListening ? () => recognitionRef.current?.stop() : startListening}
                   className={`p-2 rounded-full transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50' : 'bg-white/5 text-cyan-400 hover:bg-cyan-500/20'}`}
                >
                  {isListening ? <StopCircle size={20} /> : <Mic size={20} />}
                </button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={language === 'mg' ? "Manorata..." : "Type a message..."}
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-slate-500"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="text-cyan-400 hover:text-cyan-200 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;