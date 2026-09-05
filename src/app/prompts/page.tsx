'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  Layers,
  Terminal,
  FileText,
  Search,
  Copy,
  CheckCircle2,
  Check,
  Zap,
  Truck,
  ShieldCheck,
  Store,
  Package,
  Award,
  Tag,
  Radio,
  Bookmark,
  TrendingUp,
  Box,
  Hash,
  Filter,
  Compass,
  HelpCircle,
  Share2,
  Lock,
  Scale,
  Calculator
} from 'lucide-react';
import {
  PROMPTS_CATALOG,
  TYPE_ANCHOR,
  type PromptItem,
  type PromptCategory
} from '@/data/prompts-catalog';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Zap,
  Truck,
  ShieldCheck,
  Store,
  Package,
  Award,
  Tag,
  Sparkles,
  Radio,
  Bookmark,
  TrendingUp,
  Box,
  CheckCircle2,
  Hash,
  Compass,
  FileText,
  HelpCircle,
  Share2,
  Lock,
  Scale,
  Calculator
};

const CATEGORIES: ('todos' | PromptCategory)[] = [
  'todos',
  'Hero Sitemap',
  'Servicios',
  'Sellos',
  'Frases Hero',
  'Parches & Wordmarks',
  'Cifras 3D',
  'Embalaje',
  'Social & Status'
];

interface PromptCardProps {
  prompt: PromptItem;
  onCopy: (prompt: PromptItem, withAnchor: boolean) => void;
  isCopied: boolean;
  copiedType: 'anchor' | 'full' | null;
}

const PromptCard = React.memo(function PromptCard({
  prompt,
  onCopy,
  isCopied,
  copiedType
}: PromptCardProps) {
  const IconComponent = ICON_MAP[prompt.iconName] || Sparkles;

  return (
    <div className="group relative rounded-2xl p-3 bg-[#111827]/80 backdrop-blur-md border border-white/10 shadow-xl hover:border-[#0950F6]/60 transition-all duration-200 flex flex-col justify-between">
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[#1F2937]/90 to-[#0B0F19]/95 border border-white/5 p-5 flex flex-col flex-1">
        <div
          className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${prompt.colorGlow} blur-2xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity duration-300`}
        />

        <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B0F19] border border-[#FFF12E]/30 flex items-center justify-center text-[#FFF12E] shadow-inner group-hover:scale-105 group-hover:border-[#0950F6] transition-all duration-200">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-[#FFF12E] text-[#0B0F19] text-[10px] font-mono font-black tracking-wider">
                  {prompt.code}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFF12E] font-['Bebas_Neue']">
                  {prompt.badge}
                </span>
              </div>
              <h3 className="text-lg font-black uppercase text-white tracking-tight leading-tight mt-0.5 font-['Anton']">
                {prompt.titulo}
              </h3>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-3 min-h-[34px] relative z-10">
          {prompt.descripcion}
        </p>

        <div className="space-y-1.5 mb-3 p-2.5 rounded-xl bg-[#0B0F19]/80 border border-white/5 text-[11px] relative z-10 font-mono">
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">Archivo:</span>
            <span className="text-[#FFF12E] truncate max-w-[160px]">{prompt.targetFile}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span className="text-slate-400">Destino UI:</span>
            <span className="truncate max-w-[170px] text-white" title={prompt.targetComponent}>
              {prompt.targetComponent}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-300 pt-1 border-t border-white/5 text-[10px]">
            <span className="text-slate-400">Specs:</span>
            <span className="text-[#628FF9]">
              {prompt.aspectRatio} · {prompt.resolution} · {prompt.engine}
            </span>
          </div>
        </div>

        <div className="relative flex-1 mb-4 rounded-xl bg-[#0B0F19]/90 border border-white/10 p-3 flex flex-col font-mono">
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-white/10 text-[10px] text-slate-400">
            <div className="flex items-center gap-1 text-[#FFF12E]">
              <Terminal className="w-3 h-3" />
              <span>DIRECTIVA RAW</span>
            </div>
            <span className="text-[10px] text-[#628FF9] flex items-center gap-1">
              <Layers className="w-3 h-3" /> + Type Anchor
            </span>
          </div>

          <pre className="flex-1 text-slate-200 text-xs leading-relaxed max-h-36 overflow-y-auto whitespace-pre-wrap pr-1 scrollbar-thin scrollbar-thumb-white/20">
            <code>{prompt.promptBody}</code>
          </pre>
        </div>

        <div className="flex items-center gap-2 pt-1 border-t border-white/5 relative z-10">
          <button
            onClick={() => onCopy(prompt, true)}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-xl uppercase font-bold py-2.5 px-4 text-xs transition-all duration-200 cursor-pointer font-['Bebas_Neue'] tracking-wider ${
              isCopied && copiedType === 'full'
                ? 'bg-[#22c55e] text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                : 'bg-[#0950F6] hover:bg-[#0636A5] text-white hover:text-[#FFF12E] border border-[#0950F6]/50 shadow-[0_0_15px_rgba(9,80,246,0.3)]'
            }`}
          >
            {isCopied && copiedType === 'full' ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡PROMPT + ANCLA COPIADOS!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPIAR PROMPT COMPLETO</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

interface PromptFilterBarProps {
  categories: ('todos' | PromptCategory)[];
  activeCategory: string;
  onSelectCategory: (cat: 'todos' | PromptCategory) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
}

const PromptFilterBar = React.memo(function PromptFilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}: PromptFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between pt-2 pb-6 border-b border-white/10">
      <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {categories.map((cat) => {
          const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer font-['Bebas_Neue'] ${
                isSelected
                  ? 'bg-[#FFF12E] text-[#0B0F19] font-black border-[#FFF12E] shadow-[0_0_15px_rgba(255,241,46,0.35)]'
                  : 'bg-[#1F2937]/50 hover:bg-[#1F2937] text-slate-300 border-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <div className="relative min-w-[260px]">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Buscar código (T1), servicio, archivo..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-[#0B0F19]/90 border border-white/15 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#FFF12E] transition-colors font-sans"
        />
      </div>
    </div>
  );
});

export default function PromptsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<'anchor' | 'full' | null>(null);
  const [copiedAnchor, setCopiedAnchor] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<'todos' | PromptCategory>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }, []);

  const handleCopyPrompt = useCallback(
    async (prompt: PromptItem, withAnchor: boolean) => {
      const textToCopy = withAnchor
        ? `${TYPE_ANCHOR}\n\n${prompt.promptBody}`
        : prompt.promptBody;

      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopiedId(prompt.id);
        setCopiedType(withAnchor ? 'full' : 'anchor');
        showToast(`Prompt ${prompt.code} copiado al portapapeles`);
        setTimeout(() => {
          setCopiedId(null);
          setCopiedType(null);
        }, 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    },
    [showToast]
  );

  const handleCopyAnchorOnly = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(TYPE_ANCHOR);
      setCopiedAnchor(true);
      showToast('Ancla Tipográfica copiada al portapapeles');
      setTimeout(() => setCopiedAnchor(false), 2000);
    } catch (err) {
      console.error('Failed to copy anchor', err);
    }
  }, [showToast]);

  const filteredPrompts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return PROMPTS_CATALOG.filter((item) => {
      const matchCategory =
        activeCategory === 'todos' ||
        item.category.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch =
        !q ||
        item.code.toLowerCase().includes(q) ||
        item.titulo.toLowerCase().includes(q) ||
        item.descripcion.toLowerCase().includes(q) ||
        item.targetFile.toLowerCase().includes(q) ||
        item.targetComponent.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white relative overflow-hidden selection:bg-[#FFF12E] selection:text-[#0B0F19]">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFF12E 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full bg-[#0950F6]/20 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#0636A5]/20 blur-[150px] pointer-events-none" />
      </div>

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0950F6] text-white text-xs font-mono font-bold shadow-2xl border border-white/20 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#FFF12E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>COMMAND CENTER</span>
            </Link>

            <Link
              href="/generador-prompts"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0950F6]/30 hover:bg-[#0950F6]/60 text-[#FFF12E] border border-[#FFF12E]/30 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>GENERADOR PARAMÉTRICO</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 bg-[#111827] border border-white/15 px-3.5 py-1.5 rounded-full shadow-lg text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            <span className="text-[#FFF12E] font-bold">36 ASSETS TIPOGRÁFICOS & HERO ACTIVOS</span>
          </div>
        </div>

        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFF12E]/10 text-[#FFF12E] border border-[#FFF12E]/30 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              SISTEMA VISUAL & PROMPT ENGINEERING v6.0
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[0.95] mb-3 font-['Anton']">
            CATÁLOGO DE <span className="text-[#FFF12E]">PROMPTS 3D, SELLOS & HERO SITEMAP</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Directivas maestras de renderizado tipográfico 3D, sellos y copys de Hero para todas las páginas de <strong>Envíos DosRuedas</strong>. Cada tarjeta permite copiar el prompt completo con el ancla tipográfica de marca inyectada.
          </p>
        </header>

        {/* Ancla Tipográfica de Consistencia */}
        <div className="mb-8 rounded-2xl p-5 bg-[#111827]/80 border border-white/10 shadow-xl relative overflow-hidden backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FFF12E]" />
              <span className="font-bold uppercase tracking-wider text-xs text-white font-mono">
                ANCLA DE CONSISTENCIA TIPOGRÁFICA (GLOBAL TYPE ANCHOR)
              </span>
            </div>
            <button
              onClick={handleCopyAnchorOnly}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FFF12E] hover:text-white transition-colors cursor-pointer"
            >
              {copiedAnchor ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAnchor ? '¡Copiada!' : 'Copiar Solo Ancla'}</span>
            </button>
          </div>
          <p className="text-xs font-mono text-slate-300 leading-relaxed bg-[#0B0F19] p-3.5 rounded-xl border border-white/5 selection:bg-[#FFF12E] selection:text-[#0B0F19]">
            {TYPE_ANCHOR}
          </p>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <PromptFilterBar
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Grid de Cards de Prompts */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onCopy={handleCopyPrompt}
              isCopied={copiedId === prompt.id}
              copiedType={copiedId === prompt.id ? copiedType : null}
            />
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="py-16 text-center text-slate-400 text-sm bg-white/5 rounded-2xl border border-dashed border-white/15 mt-8">
            No se encontraron prompts para la categoría o búsqueda seleccionada.
          </div>
        )}

        {/* Footer Operativo */}
        <div className="mt-16 rounded-2xl bg-[#111827]/60 backdrop-blur-md border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0B0F19] border border-[#FFF12E]/30 flex items-center justify-center text-[#FFF12E]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p
                className="font-bold uppercase text-white tracking-wider"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                ENVÍOS DOSRUEDAS · SISTEMA DE ASSETS TIPOGRÁFICOS T1-T36
              </p>
              <p className="text-slate-400">Catálogo estructurado y conectado a las 13 rutas y componentes del proyecto</p>
            </div>
          </div>

          <div
            className="flex items-center gap-4 text-[11px]"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            <span>HUB FRIULI 1972 · CHAUVÍN · MDQ</span>
            <span className="text-[#FFEC01]">●</span>
            <span>MIDJOURNEY v6.0 RAW</span>
          </div>
        </div>
      </div>
    </div>
  );
}


