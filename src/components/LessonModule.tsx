/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Lightbulb, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../lib/utils';
import { Lesson, LessonStep } from '../data/lessons';

interface LessonModuleProps {
  lesson: Lesson;
  onComplete: () => void;
}

export default function LessonModule({ lesson, onComplete }: LessonModuleProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  const step = lesson.steps[currentStepIndex];

  const handleOptionSelect = (index: number) => {
    if (isCorrect) return; // Prevent changing after correct answer
    
    setSelectedOption(index);
    if (index === step.correctOptionIndex) {
      setIsCorrect(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#4ade80', '#22c55e']
      });
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  const nextStep = () => {
    if (currentStepIndex < lesson.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowHint(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-12 bg-white rounded-3xl shadow-2xl text-center border border-green-100"
      >
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Lição Concluída!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Você dominou o conteúdo de <strong>{lesson.title}</strong>. 
          Suas habilidades de escrita técnica estão evoluindo!
        </p>
        <button
          onClick={onComplete}
          className="px-10 py-4 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          Retornar ao Painel
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8 overflow-hidden bg-gray-100 rounded-full h-3 flex">
        {lesson.steps.map((_, i) => (
          <div 
            key={i}
            className={cn(
              "flex-1 transition-all duration-500 h-full",
              i < currentStepIndex ? "bg-green-500" : 
              i === currentStepIndex ? "bg-blue-600" : "bg-gray-200"
            )}
          />
        ))}
      </div>

      <motion.div
        key={currentStepIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
      >
        <div className="p-8 bg-blue-600 text-white">
          <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-1">
            Passo {currentStepIndex + 1} de {lesson.steps.length}
          </p>
          <h2 className="text-2xl font-bold">{step.title}</h2>
        </div>

        <div className="p-8">
          <div className="prose prose-blue mb-8 max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed">
              {step.content}
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm">?</span>
              {step.question}
            </h3>

            <div className="grid gap-3">
              {step.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isCorrect === true}
                  className={cn(
                    "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 flex items-center justify-between group",
                    selectedOption === index ? (
                      index === step.correctOptionIndex 
                        ? "border-green-500 bg-green-50 shadow-md ring-2 ring-green-200"
                        : "border-red-500 bg-red-50 animate-shake"
                    ) : "border-gray-100 hover:border-blue-200 hover:bg-blue-50"
                  )}
                >
                  <span className={cn(
                    "font-medium",
                    selectedOption === index && index === step.correctOptionIndex ? "text-green-700" :
                    selectedOption === index ? "text-red-700" : "text-gray-700"
                  )}>
                    {option}
                  </span>
                  
                  {selectedOption === index && (
                    index === step.correctOptionIndex 
                      ? <CheckCircle2 className="w-6 h-6 text-green-500" />
                      : <XCircle className="w-6 h-6 text-red-500" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-bold px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
            >
              <Lightbulb className="w-5 h-5" />
              Ver Dica
            </button>

            {isCorrect && (
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={nextStep}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Continuar
                <CheckCircle2 className="w-5 h-5" />
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-sm italic"
              >
                <strong>Dica de Aprendizagem sem Erro:</strong> {step.hint}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
