'use client';

import React, { useState, useMemo, useTransition, useDeferredValue } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  Wand2,
  Copy,
  Check,
  Search,
  Layers,
  LayoutGrid,
  FileText,
  Send,
  Table as TableIcon,
  Activity,
  GitCommit,
  HelpCircle,
  Sliders,
  Box,
  Shield,
  SlidersHorizontal,
  Code2,
  Terminal,
  Cpu,
  RefreshCw,
  ChevronRight,
  Info,
  Laptop,
  Smartphone,
  Monitor,
  Flame,
  CheckCircle2
} from 'lucide-react';
import {
  WEB_COMPONENTS_CATALOG,
  CATEGORY_DEFINITIONS,
  ALL_PAGES,
  filterWebComponents,
  type WebComponentItem,
  type ComponentCategory
} from '@/data/web-components-catalog';
import { optimizeWebPrompt } from '@/ai/flows/optimize-web-prompt';
import {
  type WebPromptInput,
  type WebPromptOutput,
  buildDeterministicWebPrompt,
} from '@/ai/flows/web-prompt-builder';

// Category Icon Helper (Hoisted outside component to avoid recreation during render)
function CategoryIcon({ category }: { category: ComponentCategory }) {
  switch (category) {
    case 'hero':
      return <Sparkles className="w-3.5 h-3.5 text-[#FFF12E]" />;
    case 'cards':
      return <Layers className="w-3.5 h-3.5 text-white" />;
    case 'bento':
      return <LayoutGrid className="w-3.5 h-3.5 text-[#FFF12E]" />;
    case 'form':
      return <FileText className="w-3.5 h-3.5 text-white" />;
    case 'cta':
      return <Send className="w-3.5 h-3.5 text-[#FFF12E]" />;
    case 'table':
      return <TableIcon className="w-3.5 h-3.5 text-white" />;
    case 'stats':
      return <Activity className="w-3.5 h-3.5 text-[#FFF12E]" />;
    case 'stepper':
      return <GitCommit className="w-3.5 h-3.5 text-white" />;
    case 'faq':
      return <HelpCircle className="w-3.5 h-3.5 text-white" />;
    case 'slider':
      return <Sliders className="w-3.5 h-3.5 text-[#FFF12E]" />;
    case 'uikit':
      return <Box className="w-3.5 h-3.5 text-[#FFF12E]" />;
    case 'legal':
      return <Shield className="w-3.5 h-3.5 text-white/80" />;
    default:
      return <Layers className="w-3.5 h-3.5 text-white" />;
  }
}

export default function CrearPromptsWebsView() {
  // Navigation & filtering state
  const [selectedPage, setSelectedPage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Vercel Best Practice: rerender-use-deferred-value keeps input typing 100% responsive
  const deferredSearchQuery = useDeferredValue(searchQuery);

  // Selected component for prompt generation
  const [selectedItem, setSelectedItem] = useState<WebComponentItem>(
    WEB_COMPONENTS_CATALOG[0]
  );

  // Visual presets according to Design System
  const [glowNeon, setGlowNeon] = useState<boolean>(true);
  const [doubleBezel, setDoubleBezel] = useState<boolean>(false);
  const [glassmorphism, setGlassmorphism] = useState<boolean>(true);
  const [whiteSurface, setWhiteSurface] = useState<boolean>(true);
  const [animationType, setAnimationType] = useState<'framer-motion' | 'tailwind-css' | 'none'>('framer-motion');
  const [targetDevice, setTargetDevice] = useState<'responsive-hybrid' | 'mobile-first' | 'desktop-enterprise'>('responsive-hybrid');
  const [customDirectives, setCustomDirectives] = useState<string>('');

  // Generation & Output state
  const [isPending, startTransition] = useTransition();
  const [output, setOutput] = useState<WebPromptOutput>(() => {
    // Vercel Best Practice: rerender-lazy-state-init
    return buildDeterministicWebPrompt({
      componentName: WEB_COMPONENTS_CATALOG[0].componentName,
      pageName: WEB_COMPONENTS_CATALOG[0].page,
      category: WEB_COMPONENTS_CATALOG[0].category,
      componentPath: WEB_COMPONENTS_CATALOG[0].componentPath,
      baselineContent: WEB_COMPONENTS_CATALOG[0].currentText,
      elementsToReview: WEB_COMPONENTS_CATALOG[0].elementsToReview,
      visualPresets: {
        glowNeon: true,
        doubleBezel: false,
        glassmorphism: true,
        whiteSurface: true,
        animationType: 'framer-motion',
        targetDevice: 'responsive-hybrid',
      },
    });
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'breakdown' | 'tokens'>('prompt');

  // Filtered components list with fast precomputed index
  const filteredList = useMemo(() => {
    return filterWebComponents({
      page: selectedPage,
      category: selectedCategory,
      searchQuery: deferredSearchQuery,
    });
  }, [selectedPage, selectedCategory, deferredSearchQuery]);

  // Handle select item
  const handleSelectItem = (item: WebComponentItem) => {
    setSelectedItem(item);
    if (item.id === 'uikit-double-bezel') {
      setDoubleBezel(true);
    }
  };

  // Trigger Genkit optimization
  const handleGenerate = () => {
    startTransition(async () => {
      try {
        const input: WebPromptInput = {
          componentName: selectedItem.componentName,
          pageName: selectedItem.page,
          category: selectedItem.category,
          componentPath: selectedItem.componentPath,
          baselineContent: selectedItem.currentText,
          elementsToReview: selectedItem.elementsToReview,
          visualPresets: {
            glowNeon,
            doubleBezel,
            glassmorphism,
            whiteSurface,
            animationType,
            targetDevice,
          },
          customDirectives: customDirectives.trim() ? customDirectives.trim() : undefined,
        };

        const result = await optimizeWebPrompt(input);
        setOutput(result);
      } catch (err) {
        console.error('Error optimizing prompt with Genkit, using official fallback:', err);
        const fallback = buildDeterministicWebPrompt({
          componentName: selectedItem.componentName,
          pageName: selectedItem.page,
          category: selectedItem.category,
          componentPath: selectedItem.componentPath,
          baselineContent: selectedItem.currentText,
          elementsToReview: selectedItem.elementsToReview,
          visualPresets: {
            glowNeon,
            doubleBezel,
            glassmorphism,
            whiteSurface,
            animationType,
            targetDevice,
          },
          customDirectives: customDirectives.trim() ? customDirectives.trim() : undefined,
        });
        setOutput(fallback);
      }
    });
  };

  // Copy prompt to clipboard
  const handleCopy = async () => {
    if (!output?.optimizedPrompt) return;
    try {
      await navigator.clipboard.writeText(output.optimizedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Ignore clipboard write failure
    }
  };

  return (
    <div className="min-h-[100dvh] bg-[#0C59F2] text-white font-body antialiased relative selection:bg-[#FFF12E] selection:text-[#0C59F2]">
      {/* Subtle brand glow lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 right-10 w-[550px] h-[550px] bg-[#FFF12E]/15 blur-[180px] rounded-full" />
        <div className="absolute -bottom-32 left-10 w-[600px] h-[600px] bg-white/10 blur-[180px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col gap-6 md:gap-8">
        
        {/* ============================================================ */}
        {/* HEADER / COMMAND BAR (Envíos DosRuedas Design System) */}
        {/* ============================================================ */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/20">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-3 rounded-full bg-white/10 border border-white/30 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all"
              title="Volver al Command Center"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-headline uppercase tracking-wider bg-[#FFF12E] text-[#0C59F2] font-bold shadow-[0_0_20px_rgba(255,241,46,0.35)]">
                  Design System Triad · #0C59F2 · #FFF12E · #FFFFFF
                </span>
                <span className="text-xs text-white/80 flex items-center gap-1 font-mono font-semibold">
                  <Cpu className="w-3.5 h-3.5 text-[#FFF12E]" /> Genkit · Gemini 2.5 Flash
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-headline font-normal uppercase tracking-tight text-white mt-1 leading-[0.98]">
                Crear Prompts Webs <span className="text-[#FFF12E]">· Secciones & UI Kit</span>
              </h1>
            </div>
          </div>

          {/* Primary Action CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFF12E] text-[#0C59F2] font-headline text-base uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(255,241,46,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isPending ? (
                <>
                  <div className="animate-spin">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  Optimizando con Genkit...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Optimizar Prompt
                </>
              )}
            </button>
          </div>
        </header>

        {/* ============================================================ */}
        {/* MAIN SPLIT-SCREEN BENTO (12 Columns: 5 Left / 7 Right) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: Controls, Catalog & Presets (5 Cols) */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Section 1: Selector de docs/contenido */}
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-headline uppercase tracking-wider text-[#FFF12E] flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  1. Componente de docs/contenido
                </h2>
                <span className="text-xs font-mono font-semibold text-white/80 bg-white/10 px-2.5 py-0.5 rounded-full">
                  {filteredList.length} disponibles
                </span>
              </div>

              {/* Page Filter Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-headline uppercase tracking-wider text-white/90">
                  Página Objetivo:
                </label>
                <select
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(e.target.value)}
                  aria-label="Página Objetivo"
                  className="w-full bg-white text-[#0C59F2] font-semibold border border-white/30 rounded-2xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFF12E] transition-all"
                >
                  <option value="all">Todas las páginas ({ALL_PAGES.length})</option>
                  {ALL_PAGES.map(page => (
                    <option key={page} value={page}>{page}</option>
                  ))}
                </select>
              </div>

              {/* Category Badges Filter */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-headline uppercase tracking-wider text-white/90">
                  Categoría de Componente:
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1 rounded-full text-xs font-headline uppercase tracking-wider transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-[#FFF12E] text-[#0C59F2] font-bold shadow-[0_0_15px_rgba(255,241,46,0.35)]'
                        : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                    }`}
                  >
                    Todos
                  </button>
                  {CATEGORY_DEFINITIONS.map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-headline uppercase tracking-wider transition-all ${
                        selectedCategory === cat.key
                          ? 'bg-[#FFF12E] text-[#0C59F2] font-bold shadow-[0_0_15px_rgba(255,241,46,0.35)]'
                          : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                      }`}
                    >
                      <CategoryIcon category={cat.key} />
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fast Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar componente, hero, bento, cotizador..."
                  className="w-full bg-white/15 border border-white/30 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#FFF12E] focus:bg-white/20 transition-all"
                />
              </div>

              {/* Components List */}
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
                {filteredList.length === 0 ? (
                  <p className="text-xs text-white/70 text-center py-6">
                    No se encontraron componentes con los filtros aplicados.
                  </p>
                ) : (
                  filteredList.map((item) => {
                    const isSelected = selectedItem.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-white text-[#0C59F2] border-[#FFF12E] shadow-[0_0_20px_rgba(255,241,46,0.3)] scale-[1.01]'
                            : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                        }`}
                      >
                        <div className="flex flex-col gap-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-headline uppercase tracking-wider ${
                              isSelected ? 'bg-[#0C59F2] text-white' : 'bg-white/20 text-white'
                            }`}>
                              {item.category}
                            </span>
                            <span className={`text-xs truncate font-medium ${isSelected ? 'text-[#0C59F2]/80' : 'text-white/80'}`}>
                              {item.page}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold truncate">
                            {item.componentName}
                          </h3>
                          <p className={`text-xs truncate ${isSelected ? 'text-[#0C59F2]/70' : 'text-white/70'}`}>
                            {item.sectionTitle}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#0C59F2] translate-x-1' : 'text-white/50'}`} />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Section 2: Baseline Content from docs/contenido */}
            <div className="p-6 rounded-3xl bg-white text-[#0C59F2] shadow-[0_20px_40px_-15px_rgba(12,89,242,0.15)] border border-[#0C59F2]/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-headline uppercase tracking-wider text-[#0C59F2] flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  2. Contenido Base Oficial
                </h2>
                <span className="text-[11px] font-mono font-semibold text-[#0C59F2]/80 bg-[#0C59F2]/10 px-2.5 py-0.5 rounded-full">
                  {selectedItem.componentPath}
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#0C59F2]/5 border border-[#0C59F2]/15 flex flex-col gap-3">
                <div>
                  <span className="text-[11px] font-headline uppercase tracking-wider text-[#0C59F2]/70 block mb-1">
                    Textos & Requerimientos:
                  </span>
                  <p className="text-xs text-[#0C59F2] whitespace-pre-line font-body leading-relaxed bg-white p-3 rounded-xl border border-[#0C59F2]/10">
                    {selectedItem.currentText}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-headline uppercase tracking-wider text-[#0C59F2]/70 block mb-1">
                    Criterios Mandatorios de Revisión ({selectedItem.elementsToReview.length}):
                  </span>
                  <ul className="flex flex-col gap-1.5">
                    {selectedItem.elementsToReview.map((el, idx) => (
                      <li key={idx} className="text-xs text-[#0C59F2] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0C59F2] shrink-0 mt-0.5" />
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 3: Modificadores & Presets Visuales */}
            <div className="p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-headline uppercase tracking-wider text-[#FFF12E] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  3. Presets del Design System
                </h2>
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGlowNeon(prev => !prev)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    glowNeon
                      ? 'bg-white text-[#0C59F2] border-[#FFF12E] shadow-[0_0_15px_rgba(255,241,46,0.3)]'
                      : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/15'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-headline uppercase flex items-center gap-1 font-bold">
                      <Flame className="w-3.5 h-3.5 text-[#FFF12E]" /> Glow Neón
                    </span>
                    <span className={`text-[10px] ${glowNeon ? 'text-[#0C59F2]/70' : 'text-white/70'}`}>
                      shadow-glow-yellow
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${glowNeon ? 'border-[#0C59F2] bg-[#FFF12E]' : 'border-white/50'}`}>
                    {glowNeon ? <Check className="w-3 h-3 text-[#0C59F2] stroke-[3]" /> : null}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setWhiteSurface(prev => !prev)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    whiteSurface
                      ? 'bg-white text-[#0C59F2] border-[#FFF12E] shadow-[0_0_15px_rgba(255,241,46,0.3)]'
                      : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/15'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-headline uppercase flex items-center gap-1 font-bold">
                      <Box className="w-3.5 h-3.5 text-[#0C59F2]" /> Card Blanca
                    </span>
                    <span className={`text-[10px] ${whiteSurface ? 'text-[#0C59F2]/70' : 'text-white/70'}`}>
                      #FFFFFF + #0C59F2
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${whiteSurface ? 'border-[#0C59F2] bg-[#FFF12E]' : 'border-white/50'}`}>
                    {whiteSurface ? <Check className="w-3 h-3 text-[#0C59F2] stroke-[3]" /> : null}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDoubleBezel(prev => !prev)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    doubleBezel
                      ? 'bg-white text-[#0C59F2] border-[#FFF12E] shadow-[0_0_15px_rgba(255,241,46,0.3)]'
                      : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/15'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-headline uppercase flex items-center gap-1 font-bold">
                      <Box className="w-3.5 h-3.5 text-[#FFF12E]" /> Double Bezel
                    </span>
                    <span className={`text-[10px] ${doubleBezel ? 'text-[#0C59F2]/70' : 'text-white/70'}`}>
                      Borde concéntrico
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${doubleBezel ? 'border-[#0C59F2] bg-[#FFF12E]' : 'border-white/50'}`}>
                    {doubleBezel ? <Check className="w-3 h-3 text-[#0C59F2] stroke-[3]" /> : null}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setGlassmorphism(prev => !prev)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    glassmorphism
                      ? 'bg-white text-[#0C59F2] border-[#FFF12E] shadow-[0_0_15px_rgba(255,241,46,0.3)]'
                      : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/15'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-headline uppercase flex items-center gap-1 font-bold">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFF12E]" /> Glassmorphic
                    </span>
                    <span className={`text-[10px] ${glassmorphism ? 'text-[#0C59F2]/70' : 'text-white/70'}`}>
                      bg-white/10 blur
                    </span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${glassmorphism ? 'border-[#0C59F2] bg-[#FFF12E]' : 'border-white/50'}`}>
                    {glassmorphism ? <Check className="w-3 h-3 text-[#0C59F2] stroke-[3]" /> : null}
                  </div>
                </button>
              </div>

              {/* Animation Engine */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-headline uppercase tracking-wider text-white/90">
                  Física de Animación (Spring Physics):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'framer-motion', label: 'Framer Motion' },
                    { id: 'tailwind-css', label: 'Tailwind CSS' },
                    { id: 'none', label: 'Estático' }
                  ].map(anim => (
                    <button
                      key={anim.id}
                      type="button"
                      onClick={() => setAnimationType(anim.id as 'framer-motion' | 'tailwind-css' | 'none')}
                      className={`py-2 px-3 rounded-2xl text-xs font-headline uppercase tracking-wider font-bold transition-all ${
                        animationType === anim.id
                          ? 'bg-[#FFF12E] text-[#0C59F2] shadow-[0_0_15px_rgba(255,241,46,0.3)]'
                          : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                      }`}
                    >
                      {anim.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport Priority */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-headline uppercase tracking-wider text-white/90">
                  Dispositivo Prioritario:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'responsive-hybrid', label: 'Híbrido', icon: Monitor },
                    { id: 'mobile-first', label: 'Mobile', icon: Smartphone },
                    { id: 'desktop-enterprise', label: 'Desktop', icon: Laptop }
                  ].map(dev => {
                    const Icon = dev.icon;
                    return (
                      <button
                        key={dev.id}
                        type="button"
                        onClick={() => setTargetDevice(dev.id as 'responsive-hybrid' | 'mobile-first' | 'desktop-enterprise')}
                        className={`py-2 px-2.5 rounded-2xl text-xs font-headline uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-1.5 ${
                          targetDevice === dev.id
                            ? 'bg-[#FFF12E] text-[#0C59F2] shadow-[0_0_15px_rgba(255,241,46,0.3)]'
                            : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{dev.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Free-form custom directives */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-headline uppercase tracking-wider text-white/90">
                  Instrucciones o Requerimientos Adicionales:
                </label>
                <textarea
                  value={customDirectives}
                  onChange={(e) => setCustomDirectives(e.target.value)}
                  placeholder="Ej: Incluir tooltip explicativo, usar badge Express 30-90 min, acentuar con resplandor amarillo..."
                  rows={2}
                  className="w-full bg-white text-[#0C59F2] placeholder-[#0C59F2]/50 border border-white/30 rounded-2xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#FFF12E] transition-all"
                />
              </div>

              {/* Big Action CTA */}
              <button
                onClick={handleGenerate}
                disabled={isPending}
                className="w-full mt-2 py-3.5 rounded-full bg-[#FFF12E] text-[#0C59F2] font-headline text-lg font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(255,241,46,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isPending ? (
                  <>
                    <div className="animate-spin">
                      <RefreshCw className="w-5 h-5" />
                    </div>
                    Optimizando con Gemini 2.5...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Optimizar Prompt Oficial
                  </>
                )}
              </button>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Output Display & Design System Verification (7 Cols) */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* Output Card */}
            <div className="p-6 md:p-8 rounded-3xl bg-white text-[#0C59F2] shadow-[0_20px_40px_-15px_rgba(12,89,242,0.2)] border border-[#0C59F2]/10 flex flex-col gap-4">
              
              {/* Output Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#0C59F2]/15">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#0C59F2] animate-pulse" />
                    <span className="text-xs font-headline uppercase font-bold tracking-wider text-[#0C59F2]">
                      Prompt Optimizado Listo
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-headline font-normal uppercase text-[#0C59F2] mt-0.5 leading-none">
                    {output?.title ? output.title : 'Prompt de Ingeniería Frontend'}
                  </h2>
                </div>

                {/* Copy CTA Pill */}
                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-headline text-xs uppercase tracking-wider font-bold transition-all shadow-md ${
                    copied
                      ? 'bg-[#0C59F2] text-white'
                      : 'bg-[#FFF12E] text-[#0C59F2] hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,241,46,0.35)]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      ¡Copiado al Portapapeles!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copiar Prompt Completo
                    </>
                  )}
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b border-[#0C59F2]/10 pb-3">
                <button
                  onClick={() => setActiveTab('prompt')}
                  className={`px-4 py-2 rounded-full text-xs font-headline uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'prompt'
                      ? 'bg-[#0C59F2] text-white shadow-sm'
                      : 'text-[#0C59F2]/80 hover:bg-[#0C59F2]/10'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Prompt en Lenguaje Natural
                </button>
                <button
                  onClick={() => setActiveTab('breakdown')}
                  className={`px-4 py-2 rounded-full text-xs font-headline uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'breakdown'
                      ? 'bg-[#0C59F2] text-white shadow-sm'
                      : 'text-[#0C59F2]/80 hover:bg-[#0C59F2]/10'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Desglose Técnico
                </button>
                <button
                  onClick={() => setActiveTab('tokens')}
                  className={`px-4 py-2 rounded-full text-xs font-headline uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'tokens'
                      ? 'bg-[#0C59F2] text-white shadow-sm'
                      : 'text-[#0C59F2]/80 hover:bg-[#0C59F2]/10'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Tríada de Diseño Oficial
                </button>
              </div>

              {/* Tab 1: Full Prompt Content */}
              {activeTab === 'prompt' ? (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-[#0C59F2]/70 font-mono">
                    <span>Formato: Markdown para Agentes de Código (Cursor / Claude / Antigravity)</span>
                    <span>{output?.optimizedPrompt ? output.optimizedPrompt.split(/\s+/).length : 0} palabras</span>
                  </div>

                  <div className="relative rounded-2xl bg-[#0C59F2]/5 border border-[#0C59F2]/15 p-4 overflow-hidden">
                    <pre className="text-xs font-mono text-[#0C59F2] leading-relaxed whitespace-pre-wrap max-h-[560px] overflow-y-auto pr-2 selection:bg-[#FFF12E] selection:text-[#0C59F2]">
                      {output?.optimizedPrompt}
                    </pre>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-[#0C59F2]/80 italic">
                      💡 Este prompt aplica estrictamente la tríada de marca (#0C59F2, #FFF12E, #FFFFFF) y física de resortes en GPU.
                    </p>
                    <button
                      onClick={handleCopy}
                      className="shrink-0 text-xs text-[#0C59F2] hover:underline font-bold font-headline uppercase tracking-wider flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copiar ahora
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Tab 2: Architectural Breakdown */}
              {activeTab === 'breakdown' && output?.promptBreakdown ? (
                <div className="flex flex-col gap-3 max-h-[580px] overflow-y-auto pr-1">
                  <div className="p-4 rounded-2xl bg-[#0C59F2]/5 border border-[#0C59F2]/10">
                    <span className="text-[11px] font-headline uppercase tracking-wider text-[#0C59F2] font-bold block mb-1">
                      Rol y Misión
                    </span>
                    <p className="text-xs text-[#0C59F2]/90">
                      {output.promptBreakdown.roleDefinition}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0C59F2]/5 border border-[#0C59F2]/10">
                    <span className="text-[11px] font-headline uppercase tracking-wider text-[#0C59F2] font-bold block mb-1">
                      Contexto Operativo Mar del Plata
                    </span>
                    <p className="text-xs text-[#0C59F2]/90">
                      {output.promptBreakdown.dosRuedasContext}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0C59F2]/5 border border-[#0C59F2]/10">
                    <span className="text-[11px] font-headline uppercase tracking-wider text-[#0C59F2] font-bold block mb-1">
                      Estructura Técnica y Rendimiento
                    </span>
                    <p className="text-xs text-[#0C59F2]/90">
                      {output.promptBreakdown.technicalStructure}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0C59F2]/5 border border-[#0C59F2]/10">
                    <span className="text-[11px] font-headline uppercase tracking-wider text-[#0C59F2] font-bold block mb-1">
                      Accesibilidad & Criterio de Contraste
                    </span>
                    <p className="text-xs text-[#0C59F2]/90">
                      {output.promptBreakdown.accessibilityWcag}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#0C59F2]/5 border border-[#0C59F2]/10">
                    <span className="text-[11px] font-headline uppercase tracking-wider text-[#0C59F2] font-bold block mb-2">
                      Íconos Sugeridos (Lucide React - Sin Emojis)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {output.promptBreakdown.suggestedIcons.map((icon, idx) => (
                        <span key={idx} className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#0C59F2]/10 text-[#0C59F2] border border-[#0C59F2]/20 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0C59F2]" /> {icon}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Tab 3: Design Tokens Applied */}
              {activeTab === 'tokens' ? (
                <div className="flex flex-col gap-4 max-h-[580px] overflow-y-auto pr-1">
                  
                  {/* Strict 3-Color Triad Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-[#0C59F2] text-white border border-[#0C59F2] shadow-md flex flex-col gap-1">
                      <span className="text-[10px] font-headline uppercase tracking-wider text-white/80">Brand Blue</span>
                      <span className="text-base font-headline uppercase text-white font-normal leading-tight">#0C59F2</span>
                      <span className="text-xs text-white/90">Azul Eléctrico Institucional (Único azul permitido)</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FFF12E] text-[#0C59F2] border border-black/10 shadow-[0_0_20px_rgba(255,241,46,0.35)] flex flex-col gap-1">
                      <span className="text-[10px] font-headline uppercase tracking-wider opacity-80">Brand Yellow</span>
                      <span className="text-base font-headline uppercase font-normal leading-tight">#FFF12E</span>
                      <span className="text-xs font-medium">Amarillo Neón de Alta Visibilidad para CTAs</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white text-[#0C59F2] border border-[#0C59F2]/20 shadow-md flex flex-col gap-1">
                      <span className="text-[10px] font-headline uppercase tracking-wider text-[#0C59F2]/70">Brand White</span>
                      <span className="text-base font-headline uppercase font-normal leading-tight">#FFFFFF</span>
                      <span className="text-xs text-[#0C59F2]/80">Blanco Óptico Puro para superficies de tarjetas</span>
                    </div>
                  </div>

                  {/* Typography Rules */}
                  <div className="p-4 rounded-2xl bg-[#0C59F2]/5 border border-[#0C59F2]/15 flex flex-col gap-3">
                    <span className="text-xs font-headline uppercase tracking-wider text-[#0C59F2] font-bold">
                      Jerarquía Tipográfica Oficial
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="p-3 rounded-xl bg-white border border-[#0C59F2]/10 shadow-sm">
                        <span className="text-[10px] text-[#0C59F2]/70 uppercase block font-headline">Display / Hero</span>
                        <span className="text-sm font-headline text-[#0C59F2] uppercase">Anton</span>
                        <span className="text-[10px] text-[#0C59F2]/60 block font-mono">72px · 48px</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#0C59F2]/10 shadow-sm">
                        <span className="text-[10px] text-[#0C59F2]/70 uppercase block font-headline">Badges / CTAs</span>
                        <span className="text-sm font-headline text-[#0C59F2] uppercase">Bebas Neue</span>
                        <span className="text-[10px] text-[#0C59F2]/60 block font-mono">18px · 0.1em</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#0C59F2]/10 shadow-sm">
                        <span className="text-[10px] text-[#0C59F2]/70 uppercase block font-headline">Body / Párrafos</span>
                        <span className="text-sm font-bold text-[#0C59F2]">Outfit</span>
                        <span className="text-[10px] text-[#0C59F2]/60 block font-mono">16px · 1.6</span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-[#0C59F2]/10 shadow-sm">
                        <span className="text-[10px] text-[#0C59F2]/70 uppercase block font-headline">Datos / Tarifas</span>
                        <span className="text-sm font-bold font-mono text-[#0C59F2]">Geist Mono</span>
                        <span className="text-[10px] text-[#0C59F2]/60 block font-mono">14px · 600</span>
                      </div>
                    </div>
                  </div>

                  {/* Anti-Patterns Reminder */}
                  <div className="p-4 rounded-2xl bg-[#0C59F2]/5 border border-[#0C59F2]/15 flex flex-col gap-2">
                    <span className="text-xs font-headline uppercase tracking-wider text-[#0C59F2] font-bold">
                      Anti-Patrones Prohibidos
                    </span>
                    <ul className="text-xs text-[#0C59F2]/90 flex flex-col gap-1">
                      <li>❌ <strong>Múltiples tonos de azul:</strong> Cero navy (#052C87), cero slate o celestes. Únicamente #0C59F2.</li>
                      <li>❌ <strong>Negro absoluto (#000000):</strong> El contraste sobre blanco se resuelve siempre con #0C59F2.</li>
                      <li>❌ <strong>Emojis:</strong> Usar exclusivamente iconos de Lucide React con trazos coherentes.</li>
                    </ul>
                  </div>

                </div>
              ) : null}

            </div>

            {/* Quick Regenerate Card */}
            {output?.previewSummary ? (
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-between gap-3 text-xs text-white">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#FFF12E] shrink-0" />
                  <span>{output.previewSummary}</span>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={isPending}
                  className="shrink-0 px-4 py-2 rounded-full bg-white/20 hover:bg-[#FFF12E] hover:text-[#0C59F2] text-white font-headline text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <div className={isPending ? 'animate-spin' : ''}>
                    <RefreshCw className="w-3.5 h-3.5" />
                  </div>
                  Regenerar
                </button>
              </div>
            ) : null}

          </div>

        </div>

      </div>
    </div>
  );
}
