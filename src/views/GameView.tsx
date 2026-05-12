/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { ACADEMIC_REFERENCES } from '../data/references';
import ReferenceGame from '../components/ReferenceGame';

interface GameViewProps {
  selectedIndex: number;
  onBack: () => void;
  onComplete: () => void;
}

export default function GameView({ selectedIndex, onBack, onComplete }: GameViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="py-12"
    >
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={onBack}
          className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"
        >
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <div className="h-1 flex-1 bg-gray-100 rounded-full overflow-hidden">
           <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(selectedIndex / ACADEMIC_REFERENCES.length) * 100}%` }}
            className="h-full bg-blue-600" 
           />
        </div>
        <span className="text-sm font-bold text-gray-400">
          {selectedIndex + 1} / {ACADEMIC_REFERENCES.length}
        </span>
      </div>
      
      <ReferenceGame 
        data={ACADEMIC_REFERENCES[selectedIndex]} 
        onComplete={onComplete}
      />
    </motion.div>
  );
}
