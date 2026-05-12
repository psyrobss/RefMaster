/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { REPORT_LESSONS } from '../data/lessons';
import LessonModule from '../components/LessonModule';

interface LessonViewProps {
  onBack: () => void;
  onComplete: (points: number) => void;
}

export default function LessonView({ onBack, onComplete }: LessonViewProps) {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number | null>(null);

  if (selectedLessonIndex === null) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="py-12"
      >
        <div className="mb-8 flex items-center gap-4">
          <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h3 className="text-3xl font-black">Módulos de Escrita Experimental</h3>
        </div>

        <div className="grid gap-6">
          {REPORT_LESSONS.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              whileHover={{ x: 10 }}
              onClick={() => setSelectedLessonIndex(idx)}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md cursor-pointer flex justify-between items-center group"
            >
              <div>
                <h4 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {idx + 1}. {lesson.title}
                </h4>
                <p className="text-gray-500">{lesson.description}</p>
              </div>
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ChevronRight className="w-6 h-6" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-12"
    >
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => setSelectedLessonIndex(null)}
          className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h3 className="text-2xl font-black">{REPORT_LESSONS[selectedLessonIndex].title}</h3>
      </div>

      <LessonModule 
        lesson={REPORT_LESSONS[selectedLessonIndex]}
        onComplete={() => onComplete(150)}
      />
    </motion.div>
  );
}
