/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { 
  Brain, 
  ChevronRight, 
  Layout, 
  Library, 
  Play, 
  BookOpen, 
  CheckCircle,
  Clock,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { ACADEMIC_REFERENCES } from '../data/references';
import { ProgressState } from '../types';

interface DashboardViewProps {
  progress: ProgressState;
  onNavigate: (view: 'game' | 'lesson', selection?: number) => void;
}

export default function DashboardView({ progress, onNavigate }: DashboardViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      {/* Hero / Welcome */}
      <section className="relative overflow-hidden rounded-3xl bg-blue-600 p-12 text-white shadow-2xl shadow-blue-200">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            Aprendizagem Sem Erro
          </div>
          <h2 className="text-5xl font-black mb-4 leading-tight">Domine o Formato Acadêmico Brincando.</h2>
          <p className="text-blue-100 text-lg mb-8 leading-relaxed">
            Aprenda a construir referências APA 7 e ABNT com feedbacks imediatos e domine a escrita técnica através de pequenos passos.
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => onNavigate('game')}
              className="px-8 py-4 bg-white text-blue-600 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              Começar Desafio
            </button>
            <button 
              onClick={() => onNavigate('lesson')}
              className="px-8 py-4 bg-blue-500 text-white rounded-2xl font-black text-lg hover:bg-blue-400 transition-all active:scale-95 flex items-center gap-2 border border-blue-400"
            >
              <BookOpen className="w-5 h-5" />
              Aulas Práticas
            </button>
          </div>
        </div>
      </section>

      {/* Learning Track Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black flex items-center gap-3">
            <Brain className="text-blue-600" />
            Sua Trilha de Conhecimento
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Module 1: APA 7 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all cursor-pointer group"
            onClick={() => onNavigate('game', 0)}
          >
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
              <Library className="w-6 h-6" />
            </div>
            <div className="flex justify-between items-start mb-2">
               <h4 className="text-xl font-black">Citações APA 7</h4>
               {progress.citations > 0 && <CheckCircle className="text-green-500 w-6 h-6" />}
            </div>
            <p className="text-sm text-gray-500 mb-6">Pratique a construção de referências no formato da American Psychological Association.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <Clock className="w-4 h-4" /> 
                5-10 min
              </div>
              <ChevronRight className="text-blue-300 group-hover:text-blue-600 transition-colors" />
            </div>
          </motion.div>

          {/* Module 2: ABNT */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all cursor-pointer group"
            onClick={() => {
                const abntIndex = ACADEMIC_REFERENCES.findIndex(r => r.format === 'ABNT');
                onNavigate('game', abntIndex);
            }}
          >
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
              <Layout className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black mb-2">Citações ABNT</h4>
            <p className="text-sm text-gray-500 mb-6">Domine as normas brasileiras para trabalhos acadêmicos de forma rápida e visual.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <Clock className="w-4 h-4" /> 
                5-10 min
              </div>
              <ChevronRight className="text-amber-300 group-hover:text-amber-600 transition-colors" />
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-3xl border-2 border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all cursor-pointer group"
            onClick={() => onNavigate('library' as any)}
          >
            <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
              <Library className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-black mb-2">Biblioteca</h4>
            <p className="text-sm text-gray-500 mb-6">Consulte exemplos reais formatados para usar como base nos seus trabalhos.</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <Bookmark className="w-4 h-4" /> 
                Referência
              </div>
              <ChevronRight className="text-purple-300 group-hover:text-purple-600 transition-colors" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Section for Reports */}
      <section>
        <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black flex items-center gap-3">
                <Sparkles className="text-green-600" />
                Escrita Experimental & Laboratório
            </h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate('lesson')}
                className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-3xl text-white shadow-xl cursor-pointer group"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-white/20 transition-all" />
                <BookOpen className="w-12 h-12 mb-6" />
                <h4 className="text-2xl font-black mb-2">Manual do Relatório</h4>
                <p className="text-green-50 text-sm mb-6 leading-relaxed">Aprenda a descrever o método, apresentar resultados e discutir dados conforme a análise do comportamento.</p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/20 w-fit px-3 py-1 rounded-full">
                    15 Lições • Nível Iniciante
                </div>
            </motion.div>

            <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden bg-white border-2 border-gray-100 p-8 rounded-3xl shadow-sm hover:border-blue-200 transition-all group opacity-60 cursor-not-allowed"
            >
                <div className="flex justify-between items-start mb-6">
                    <Brain className="w-12 h-12 text-blue-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest bg-gray-100 text-gray-500 px-2 py-1 rounded">Em Breve</span>
                </div>
                <h4 className="text-2xl font-black mb-2 text-gray-900">Análise de Dados Pro</h4>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">Criação de gráficos de frequência acumulada e estatística inferencial básica em APA.</p>
            </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
