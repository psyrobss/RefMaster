/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, X, MessageSquare, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../lib/utils';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Types
interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      role: 'bot', 
      text: 'Olá! Sou seu tutor assistente. Posso tirar dúvidas sobre normas APA/ABNT ou sobre como escrever seu relatório experimental. Em que posso ajudar?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const model = 'gemini-3-flash-preview';
      const prompt = `Você é um tutor especializado em normas acadêmicas (APA 7 e ABNT) e em escrita de relatórios de Psicologia Experimental (especificamente sobre comportamento operante em caixa de Skinner).
      Sua função é ajudar estudantes a entenderem como formatar referências, como descrever sujeitos, equipamentos e resultados.
      Sempre cite as normas corretamente. Se não souber algo, recomende consultar os manuais oficiais.
      
      Histórico da conversa:
      ${messages.map(m => `${m.role === 'user' ? 'Estudante' : 'Tutor'}: ${m.text}`).join('\n')}
      
      Estudante: ${input}`;

      const result = await genAI.models.generateContent({
        model,
        contents: prompt,
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: result.text || 'Desculpe, tive um problema ao processar sua resposta.'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { 
        id: 'err', 
        role: 'bot', 
        text: 'Desculpe, estou com dificuldades de conexão no momento.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] flex flex-col border border-gray-200 overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Tutor RefMaster</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Online • Especialista em APA/ABNT
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    message.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                    message.role === 'bot' ? "bg-blue-100 text-blue-600" : "bg-gray-200 text-gray-500"
                  )}>
                    {message.role === 'bot' ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm shadow-sm",
                    message.role === 'bot' ? "bg-white border border-gray-100" : "bg-blue-600 text-white"
                  )}>
                    <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2">
                      <ReactMarkdown>
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-gray-100 text-sm text-gray-400">
                    Pensando...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-top border-gray-100 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ex: Como citar com 3 autores em APA?"
                  className="flex-1 px-4 py-2 rounded-full bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 text-sm outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-300 transition-all shadow-md"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300",
          isOpen ? "bg-red-500 hover:bg-red-600 rotate-90" : "bg-blue-600 hover:bg-blue-700"
        )}
      >
        {isOpen ? <X className="text-white w-8 h-8" /> : <MessageSquare className="text-white w-8 h-8" />}
      </motion.button>
    </div>
  );
}
