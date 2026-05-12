/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, RotateCcw, ArrowRight, ExternalLink, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';
import { ReferenceData, ReferencePart } from '../data/references';

interface ReferenceGameProps {
  data: ReferenceData;
  onComplete: () => void;
}

export default function ReferenceGame({ data, onComplete }: ReferenceGameProps) {
  const [shuffledParts, setShuffledParts] = useState<ReferencePart[]>([]);
  const [userOrder, setUserOrder] = useState<ReferencePart[]>([]);
  const [feedback, setFeedback] = useState<'neutral' | 'correct' | 'wrong'>('neutral');
  const [message, setMessage] = useState<string>('Selecione a próxima parte na ordem correta.');
  const [showHint, setShowHint] = useState(false);

  // Errorless learning: find what should be next
  const nextRequiredPart = data.parts[userOrder.length];

  const initializeGame = useCallback(() => {
    // Shuffle parts
    const shuffled = [...data.parts].sort(() => Math.random() - 0.5);
    setShuffledParts(shuffled);
    setUserOrder([]);
    setFeedback('neutral');
    setMessage('Monte a referência na ordem correta do formato ' + data.format);
    setShowHint(false);
  }, [data]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const playSound = (type: 'success' | 'error') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'success') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
      oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioContext.currentTime + 0.1); // C6
    } else {
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
    }

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  };

  const handleSelectPart = (part: ReferencePart) => {
    const correctNext = data.parts[userOrder.length];
    
    if (part.id === correctNext.id) {
      playSound('success');
      const newUserOrder = [...userOrder, part];
      setUserOrder(newUserOrder);
      setShuffledParts(prev => prev.filter(p => p.id !== part.id));
      setFeedback('correct');
      setMessage('Muito bem!');
      setShowHint(false);

      if (newUserOrder.length === data.parts.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
        setMessage('Perfeito! Referência completa.');
      }
      
      // Auto reset feedback
      setTimeout(() => setFeedback('neutral'), 800);
    } else {
      playSound('error');
      setFeedback('wrong');
      setMessage('Ops! Essa não é a próxima parte. Tente novamente.');
      setShowHint(true);
      setTimeout(() => setFeedback('neutral'), 1500);
    }
  };

  const handleReset = () => {
    initializeGame();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl border border-blue-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
            data.format === 'APA' ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"
          )}>
            Formato {data.format}
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">Desafio de Citação</h2>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={handleReset}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Reiniciar"
          >
            <RotateCcw className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Target Area (The Assembled Reference) */}
      <div className={cn(
        "min-h-[120px] p-6 rounded-xl border-2 border-dashed mb-8 transition-all duration-300",
        feedback === 'correct' ? "border-green-300 bg-green-50" : 
        feedback === 'wrong' ? "border-red-300 bg-red-50" : 
        "border-gray-200 bg-gray-50"
      )}>
        <div className="flex flex-wrap gap-2 items-center">
          {userOrder.length === 0 && (
            <p className="text-gray-400 italic">As partes selecionadas aparecerão aqui...</p>
          )}
          <AnimatePresence>
            {userOrder.map((part, index) => (
              <motion.span
                key={part.id}
                initial={{ opacity: 0, scale: 0.9, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                className={cn(
                  "px-2 py-1 rounded text-lg font-medium",
                  part.type === 'title' ? "italic underline decoration-blue-200" : 
                  part.type === 'journal' ? "italic text-blue-800" : 
                  "text-gray-800"
                )}
              >
                {part.text}
                {index === userOrder.length - 1 && userOrder.length < data.parts.length && (
                   <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="ml-1 inline-block w-1 h-6 bg-blue-500 animate-pulse align-middle" 
                   />
                )}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Available Parts */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-3 justify-center">
          {shuffledParts.map((part) => (
            <motion.button
              key={part.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectPart(part)}
              aria-label={`Parte da referência: ${part.text}`}
              className={cn(
                "px-4 py-2 bg-white border-2 border-blue-100 rounded-lg shadow-sm font-medium transition-all text-gray-700",
                "hover:border-blue-400 hover:shadow-md",
                showHint && part.id === nextRequiredPart.id ? "ring-4 ring-amber-300 border-amber-400 animate-bounce" : ""
              )}
            >
              {part.text}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Feedback Message */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center gap-3">
          {feedback === 'correct' ? <CheckCircle2 className="text-green-500" /> : 
           feedback === 'wrong' ? <AlertCircle className="text-red-500" /> : 
           <Star className="text-amber-400" />}
          <p className={cn(
            "font-medium",
            feedback === 'correct' ? "text-green-700" : 
            feedback === 'wrong' ? "text-red-700" : 
            "text-gray-600"
          )}>
            {message}
          </p>
        </div>

        {userOrder.length === data.parts.length && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <a 
              href={data.sourceUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:underline font-medium"
            >
              Ver Fonte <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onComplete}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Próximo <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      {showHint && (
        <p className="mt-4 text-sm text-amber-600 font-medium text-center">
          Dica Aprendizagem sem Erro: A próxima parte está destacada! Em {data.format}, 
          geralmente começamos com {data.parts[0].type === 'author' ? 'os autores' : 'o título'}.
        </p>
      )}
    </div>
  );
}
