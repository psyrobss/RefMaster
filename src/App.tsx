/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  Star
} from 'lucide-react';
import { ACADEMIC_REFERENCES } from './data/references';
import { cn } from './lib/utils';
import Chatbot from './components/Chatbot';
import DashboardView from './views/DashboardView';
import GameView from './views/GameView';
import LessonView from './views/LessonView';
import LibraryView from './views/LibraryView';
import { ProgressState, ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedReferenceIndex, setSelectedReferenceIndex] = useState(0);
  const [progress, setProgress] = useState<ProgressState>({
    citations: 0,
    lessons: 0,
    points: 0
  });

  const handleNavigation = (view: ViewState, selection?: number) => {
    if (selection !== undefined) setSelectedReferenceIndex(selection);
    setCurrentView(view);
  };

  const handleGameComplete = () => {
    const nextIdx = selectedReferenceIndex + 1;
    const isFinished = nextIdx >= ACADEMIC_REFERENCES.length;
    
    setProgress(prev => ({ 
      ...prev, 
      citations: prev.citations + 1,
      points: prev.points + 50 
    }));

    if (isFinished) {
      setCurrentView('dashboard');
    } else {
      setSelectedReferenceIndex(nextIdx);
    }
  };

  const handleLessonComplete = (points: number) => {
    setProgress(prev => ({ 
      ...prev, 
      lessons: prev.lessons + 1,
      points: prev.points + points 
    }));
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-gray-900 font-sans selection:bg-blue-100">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView('dashboard')}
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-gray-900">RefMaster</h1>
              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Acadêmico & Experimental</p>
            </div>
          </div>

          <nav className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-500 uppercase tracking-wider">
              <button onClick={() => setCurrentView('dashboard')} className="hover:text-blue-600 transition-colors">Trilha</button>
              <button 
                onClick={() => setCurrentView('library')} 
                className={cn(
                    "hover:text-blue-600 transition-colors",
                    currentView === 'library' && "text-blue-600"
                )}
              >
                Biblioteca
              </button>
            </div>
            
            <div className="flex items-center gap-4 border-l border-gray-100 pl-8">
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-gray-400 uppercase">Pontos</span>
                <span className="text-lg font-black text-amber-500 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-500" />
                  {progress.points}
                </span>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 md:py-12">
        <AnimatePresence mode="wait">
          {currentView === 'dashboard' && (
            <DashboardView 
              progress={progress} 
              onNavigate={(view, sel) => handleNavigation(view, sel)} 
            />
          )}

          {currentView === 'game' && (
            <GameView 
              selectedIndex={selectedReferenceIndex}
              onBack={() => setCurrentView('dashboard')}
              onComplete={handleGameComplete}
            />
          )}

          {currentView === 'lesson' && (
            <LessonView 
              onBack={() => setCurrentView('dashboard')}
              onComplete={handleLessonComplete}
            />
          )}

          {currentView === 'library' && (
            <LibraryView 
              onBack={() => setCurrentView('dashboard')}
            />
          )}
        </AnimatePresence>
      </main>

      <Chatbot />
      
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>© 2026 RefMaster Education • Ensino de Psicologia Experimental</p>
        <div className="flex justify-center gap-6 mt-4 font-bold uppercase tracking-widest text-[10px]">
          <span>Acessível</span>
          <span>Open Source</span>
          <span>Aprendizagem-sem-Erros</span>
        </div>
      </footer>
    </div>
  );
}
