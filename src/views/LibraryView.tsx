/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ChevronLeft, Info, ExternalLink, Search, Bookmark } from 'lucide-react';
import { ACADEMIC_REFERENCES } from '../data/references';
import { useState } from 'react';
import { cn } from '../lib/utils';

interface LibraryViewProps {
  onBack: () => void;
}

export default function LibraryView({ onBack }: LibraryViewProps) {
  const [filter, setFilter] = useState<'ALL' | 'APA' | 'ABNT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = ACADEMIC_REFERENCES.filter(r => {
    const matchesFormat = filter === 'ALL' || r.format === filter;
    const matchesSearch = r.fullText.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-12"
    >
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h3 className="text-4xl font-black text-gray-900">Biblioteca vira-folha</h3>
            <p className="text-gray-500">Exemplos reais formatados para consulta rápida.</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="Buscar autor ou título..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full sm:w-64"
                />
            </div>
            <div className="flex bg-gray-100 p-1 rounded-xl">
                {['ALL', 'APA', 'ABNT'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={cn(
                            "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                            filter === f ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        {f === 'ALL' ? 'Todos' : f}
                    </button>
                ))}
            </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filtered.map((ref) => (
          <motion.div
            key={ref.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group relative bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-lg",
                  ref.format === 'APA' ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"
                )}>
                    <Bookmark className="w-5 h-5 fill-current" />
                </div>
                <span className={cn(
                  "text-[10px] font-black uppercase tracking-tighter",
                  ref.format === 'APA' ? "text-blue-600" : "text-amber-600"
                )}>
                  Padrão {ref.format}
                </span>
              </div>
              <a 
                href={ref.sourceUrl} 
                target="_blank" 
                rel="noreferrer"
                className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600 transition-all"
                title="Acessar documento original"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <p className="text-lg text-gray-800 leading-relaxed font-medium mb-6">
              {ref.parts.map((part, i) => (
                <span key={i} className={cn(
                    part.type === 'title' ? (ref.format === 'APA' ? "italic underline decoration-blue-100" : "font-black") : 
                    part.type === 'journal' ? "italic" : ""
                )}>
                    {part.text}{' '}
                </span>
              ))}
            </p>

            <div className="flex items-center gap-6 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Info className="w-4 h-4" />
                    <span>Referência extraída de base científica</span>
                </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
            <div className="py-20 text-center">
                <p className="text-gray-400 italic">Nenhum exemplo encontrado para os critérios selecionados.</p>
            </div>
        )}
      </div>

      <div className="mt-12 bg-blue-50 p-6 rounded-2xl border border-blue-100">
          <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Dica Pro
          </h4>
          <p className="text-sm text-blue-800">
              Na **ABNT**, o destaque (negrito) vai no título da obra. Se for artigo, o título da **revista** fica em negrito. Se for livro, o título do **livro** fica em negrito. Na **APA**, usa-se apenas itálico.
          </p>
      </div>
    </motion.div>
  );
}
