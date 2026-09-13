'use client';

import React, { useState, useMemo, useTransition } from 'react';
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
  ExternalLink,
  ChevronRight,
  Info,
  Laptop,
  Smartphone,
  Monitor,
  Flame
} from 'lucide-react';
import {
  WEB_COMPONENTS_CATALOG,
  CATEGORY_DEFINITIONS,
  getAllPages,
  filterWebComponents,
  type WebComponentItem,
  type ComponentCategory
} from '@/data/web-components-catalog';
import {
  optimizeWebPrompt,
  type WebPromptInput,
  type WebPromptOutput,
  buildDeterministicWebPrompt
} from '@/ai/flows/optimize-web-prompt';

export default function CrearPromptsWebsView() {
  // Navigation & filtering state
  const [selectedPage, setSelectedPage] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected component for prompt generation
  const [selectedItem, setSelectedItem] = useState<WebComponentItem>(
    WEB_COMPONENTS_CATALOG[0]
  );

  // Visual presets
  const [glowNeon, setGlowNeon] = useState<boolean>(true);
  const [doubleBezel, setDoubleBezel] = useState<boolean>(false);
  const [glassmorphism, setGlassmorphism] = useState<boolean>(true);
  const [navySurface, setNavySurface] = useState<boolean>(true);
  const [animationType, setAnimationType] = useState<'framer-motion' | 'tailwind-css' | 'none'>('framer-motion');
  const [targetDevice, setTargetDevice] = useState<'responsive-hybrid' | 'mobile-first' | 'desktop-enterprise'>('responsive-hybrid');
  const [customDirectives, setCustomDirectives] = useState<string>('');

  // Generation & Output state
  const [isPending, startTransition] = useTransition();
  const [output, setOutput] = useState<WebPromptOutput>(() => {
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
        navySurface: true,
        animationType: 'framer-motion',
        targetDevice: 'responsive-hybrid',
      },
    });
  });

  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'breakdown' | 'tokens'>('prompt');

  // Filtered components list
  const filteredList = useMemo(() => {
    return filterWebComponents({
      page: selectedPage,
      category: selectedCategory,
      searchQuery,
    });
  }, [selectedPage, selectedCategory, searchQuery]);

  const allPages = useMemo(() => getAllPages(), []);

  // Handle select item
  const handleSelectItem = (item: WebComponentItem) => {
    setSelectedItem(item);
    // Auto preset DoubleBezel if it's UI kit double bezel
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
            navySurface,
            animationType,
            targetDevice,
          },
          customDirectives: customDirectives.trim() || undefined,
        };

        const result = await optimizeWebPrompt(input);
        setOutput(result);
      } catch (err) {
        console.error('Error optimizing prompt with Genkit:', err);
        // Fallback to deterministic
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
            navySurface,
            animationType,
            targetDevice,
          },
          customDirectives: customDirectives.trim() || undefined,
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
      // ignore
    }
  };

  // Category Icon Resolver
  const getCategoryIcon = (cat: ComponentCategory) => {
    switch (cat) {
      case 'hero': return <Sparkles className="w-4 h-4 text-[#FFF12E]" />;
      case 'cards': return <Layers className="w-4 h-4 text-blue-400" />;
      case 'bento': return <LayoutGrid className="w-4 h-4 text-cyan-400" />;
      case 'form': return <FileText className="w-4 h-4 text-emerald-400" />;
      case 'cta': return <Send className="w-4 h-4 text-[#FFF12E]" />;
      case 'table': return <TableIcon className="w-4 h-4 text-amber-400" />;
      case 'stats': return <Activity className="w-4 h-4 text-rose-400" />;
      case 'stepper': return <GitCommit className="w-4 h-4 text-purple-400" />;
      case 'faq': return <HelpCircle className="w-4 h-4 text-teal-400" />;
      case 'slider': return <Sliders className="w-4 h-4 text-indigo-400" />;
      case 'uikit': return <Box className="w-4 h-4 text-[#FFF12E]" />;
      case 'legal': return <Shield className="w-4 h-4 text-slate-400" />;
      default: return <Layers className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#030c1e] text-slate-100 font-body antialiased relative">
      {/* Glow gradient backdrops */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#0636A5]/25 blur-[160px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#FFF12E]/10 blur-[180px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 md:py-8 flex flex-col gap-6">
        {/* Top Navbar */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#FFF12E]/40 transition-all text-slate-300 hover:text-white"
              title="Volver al Command Center"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#FFF12E] text-[#0636A5]">
                  AI Web Prompts Engine
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <Cpu className="w-3.5 h-3.5 text-[#FFF12E]" /> Genkit · Gemini 2.5 Flash
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black font-headline uppercase tracking-tight text-white mt-1">
                Crear Prompts Webs <span className="text-[#FFF12E]">· Secciones & Componentes</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerate}
              disabled={isPending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF12E] text-[#0636A5] font-headline text-sm uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,241,46,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {isPending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
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

        {/* Main Split-Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: Controls, Category & Component Selector (5 Cols) */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Panel 1: Filter & Search Selector */}
            <div className="p-5 rounded-3xl bg-[#052C87]/70 backdrop-blur-md border border-white/10 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#FFF12E] flex items-center gap-2 font-headline">
                  <Layers className="w-4 h-4" />
                  1. Seleccionar Sección de docs/contenido
                </h2>
                <span className="text-xs font-mono text-slate-400">
                  {filteredList.length} disponibles
                </span>
              </div>

              {/* Page Filter Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Página Objetivo:
                </label>
                <select
                  value={selectedPage}
                  onChange={(e) => setSelectedPage(e.target.value)}
                  aria-label="Página Objetivo"
                  className="w-full bg-[#031E5C] border border-white/15 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#FFF12E] transition-colors"
                >
                  <option value="all">Todas las páginas ({allPages.length})</option>
                  {allPages.map(page => (
                    <option key={page} value={page}>{page}</option>
                  ))}
                </select>
              </div>

              {/* Component Categories Badges */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Tipo de Componente:
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-[#FFF12E] text-[#0636A5] font-bold shadow-sm'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    Todos
                  </button>
                  {CATEGORY_DEFINITIONS.map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => setSelectedCategory(cat.key)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                        selectedCategory === cat.key
                          ? 'bg-[#FFF12E] text-[#0636A5] font-bold shadow-sm'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {getCategoryIcon(cat.key)}
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar componente, texto, hero, bento..."
                  className="w-full bg-[#031E5C] border border-white/15 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-[#FFF12E] transition-colors"
                />
              </div>

              {/* Components List */}
              <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
                {filteredList.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">
                    No se encontraron componentes con los filtros aplicados.
                  </p>
                ) : (
                  filteredList.map((item) => {
                    const isSelected = selectedItem.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectItem(item)}
                        className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-2 ${
                          isSelected
                            ? 'bg-[#0636A5] border-[#FFF12E] shadow-[0_0_15px_rgba(255,241,46,0.2)]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex flex-col gap-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono bg-white/10 text-slate-200">
                              {item.category}
                            </span>
                            <span className="text-xs text-slate-300 truncate max-w-[200px]">
                              {item.page}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-white truncate">
                            {item.componentName}
                          </h3>
                          <p className="text-xs text-slate-400 truncate">
                            {item.sectionTitle}
                          </p>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-[#FFF12E] translate-x-1' : 'text-slate-500'}`} />
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Panel 2: Baseline Content from docs/contenido */}
            <div className="p-5 rounded-3xl bg-[#052C87]/70 backdrop-blur-md border border-white/10 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#FFF12E] flex items-center gap-2 font-headline">
                  <FileText className="w-4 h-4" />
                  2. Contenido Base Seleccionado
                </h2>
                <span className="text-[11px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  {selectedItem.componentPath}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#031E5C]/90 border border-white/10 flex flex-col gap-2.5">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Textos & Requerimientos:
                  </span>
                  <p className="text-xs text-slate-200 whitespace-pre-line font-body leading-relaxed bg-black/30 p-2.5 rounded-xl">
                    {selectedItem.currentText}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Elementos de Diseño a Revisar ({selectedItem.elementsToReview.length}):
                  </span>
                  <ul className="flex flex-col gap-1">
                    {selectedItem.elementsToReview.map((el, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-[#FFF12E] font-bold">•</span>
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Panel 3: Visual Presets & Controls */}
            <div className="p-5 rounded-3xl bg-[#052C87]/70 backdrop-blur-md border border-white/10 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#FFF12E] flex items-center gap-2 font-headline">
                  <SlidersHorizontal className="w-4 h-4" />
                  3. Modificadores & Presets Visuales
                </h2>
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setGlowNeon(!glowNeon)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    glowNeon
                      ? 'bg-[#FFF12E]/15 border-[#FFF12E] text-white'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold font-headline uppercase flex items-center gap-1 text-white">
                      <Flame className="w-3.5 h-3.5 text-[#FFF12E]" /> Glow Neón
                    </span>
                    <span className="text-[10px] text-slate-300">#FFF12E en CTAs</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${glowNeon ? 'border-[#FFF12E] bg-[#FFF12E]' : 'border-slate-500'}`}>
                    {glowNeon && <Check className="w-3 h-3 text-[#0636A5] stroke-[3]" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDoubleBezel(!doubleBezel)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    doubleBezel
                      ? 'bg-[#FFF12E]/15 border-[#FFF12E] text-white'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold font-headline uppercase flex items-center gap-1 text-white">
                      <Box className="w-3.5 h-3.5 text-[#FFF12E]" /> Double Bezel
                    </span>
                    <span className="text-[10px] text-slate-300">Borde concéntrico</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${doubleBezel ? 'border-[#FFF12E] bg-[#FFF12E]' : 'border-slate-500'}`}>
                    {doubleBezel && <Check className="w-3 h-3 text-[#0636A5] stroke-[3]" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setGlassmorphism(!glassmorphism)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    glassmorphism
                      ? 'bg-[#FFF12E]/15 border-[#FFF12E] text-white'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold font-headline uppercase flex items-center gap-1 text-white">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Glassmorphism
                    </span>
                    <span className="text-[10px] text-slate-300">Backdrop blur</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${glassmorphism ? 'border-[#FFF12E] bg-[#FFF12E]' : 'border-slate-500'}`}>
                    {glassmorphism && <Check className="w-3 h-3 text-[#0636A5] stroke-[3]" />}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setNavySurface(!navySurface)}
                  className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    navySurface
                      ? 'bg-[#FFF12E]/15 border-[#FFF12E] text-white'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold font-headline uppercase flex items-center gap-1 text-white">
                      <Shield className="w-3.5 h-3.5 text-blue-300" /> Navy #052C87
                    </span>
                    <span className="text-[10px] text-slate-300">Cero grises genéricos</span>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${navySurface ? 'border-[#FFF12E] bg-[#FFF12E]' : 'border-slate-500'}`}>
                    {navySurface && <Check className="w-3 h-3 text-[#0636A5] stroke-[3]" />}
                  </div>
                </button>
              </div>

              {/* Animation Engine */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Motor de Animación:
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
                      className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                        animationType === anim.id
                          ? 'bg-[#FFF12E] text-[#0636A5] shadow-sm'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {anim.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Viewport Priority */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
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
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${
                          targetDevice === dev.id
                            ? 'bg-[#FFF12E] text-[#0636A5] shadow-sm'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
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
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Instrucciones o Requerimientos Adicionales:
                </label>
                <textarea
                  value={customDirectives}
                  onChange={(e) => setCustomDirectives(e.target.value)}
                  placeholder="Ej: Incluir tooltip explicativo, usar badge con icono de camión, agregar microinteracción en hover..."
                  rows={2}
                  className="w-full bg-[#031E5C] border border-white/15 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FFF12E] transition-colors"
                />
              </div>

              {/* Big Action Button */}
              <button
                onClick={handleGenerate}
                disabled={isPending}
                className="w-full mt-2 py-3 rounded-2xl bg-[#FFF12E] text-[#0636A5] font-headline text-base font-black uppercase tracking-wider shadow-[0_0_25px_rgba(255,241,46,0.35)] hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {isPending ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Generando con Gemini 2.5...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-5 h-5" />
                    Optimizar Prompt con Genkit
                  </>
                )}
              </button>
            </div>

          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: Natural Language Prompt Display & Details (7 Cols) */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 flex flex-col gap-4">

            {/* Output Panel Container */}
            <div className="p-6 rounded-3xl bg-[#052C87]/80 backdrop-blur-md border border-white/15 shadow-2xl flex flex-col gap-4">
              
              {/* Output Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFF12E] animate-pulse" />
                    <span className="text-xs font-mono text-[#FFF12E] uppercase font-bold tracking-wider">
                      Prompt Optimizado Listo
                    </span>
                  </div>
                  <h2 className="text-lg md:text-xl font-headline font-black uppercase text-white mt-0.5">
                    {output?.title || 'Prompt de Ingeniería Frontend'}
                  </h2>
                </div>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-headline text-xs uppercase tracking-wider font-bold transition-all shadow-md ${
                    copied
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 hover:bg-[#FFF12E] text-white hover:text-[#0636A5] border border-white/20'
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
              <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                <button
                  onClick={() => setActiveTab('prompt')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-headline uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'prompt'
                      ? 'bg-[#FFF12E] text-[#0636A5]'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  Prompt en Lenguaje Natural
                </button>
                <button
                  onClick={() => setActiveTab('breakdown')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-headline uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'breakdown'
                      ? 'bg-[#FFF12E] text-[#0636A5]'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  Desglose Arquitectónico
                </button>
                <button
                  onClick={() => setActiveTab('tokens')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-headline uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 ${
                    activeTab === 'tokens'
                      ? 'bg-[#FFF12E] text-[#0636A5]'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Tokens DosRuedas
                </button>
              </div>

              {/* Tab 1: Full Prompt Content */}
              {activeTab === 'prompt' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>Formato: Markdown para Agentes de Código (Cursor / Claude / Antigravity)</span>
                    <span>{output?.optimizedPrompt ? output.optimizedPrompt.split(/\s+/).length : 0} palabras</span>
                  </div>

                  <div className="relative rounded-2xl bg-[#021440] border border-white/15 p-4 overflow-hidden">
                    <pre className="text-xs font-mono text-slate-200 leading-relaxed whitespace-pre-wrap max-h-[580px] overflow-y-auto pr-2 selection:bg-[#FFF12E] selection:text-[#0636A5]">
                      {output?.optimizedPrompt}
                    </pre>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-slate-400 italic">
                      💡 Pegá este prompt directamente en tu editor o agente autónomo para obtener el TSX con diseño corporativo exacto.
                    </p>
                    <button
                      onClick={handleCopy}
                      className="shrink-0 text-xs text-[#FFF12E] hover:underline font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copiar ahora
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Architectural Breakdown */}
              {activeTab === 'breakdown' && output?.promptBreakdown && (
                <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-1">
                  <div className="p-3.5 rounded-2xl bg-[#031E5C] border border-white/10">
                    <span className="text-[11px] font-bold text-[#FFF12E] uppercase tracking-wider block mb-1">
                      Rol y Misión
                    </span>
                    <p className="text-xs text-slate-200">
                      {output.promptBreakdown.roleDefinition}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#031E5C] border border-white/10">
                    <span className="text-[11px] font-bold text-[#FFF12E] uppercase tracking-wider block mb-1">
                      Contexto Operativo Mar del Plata
                    </span>
                    <p className="text-xs text-slate-200">
                      {output.promptBreakdown.dosRuedasContext}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#031E5C] border border-white/10">
                    <span className="text-[11px] font-bold text-[#FFF12E] uppercase tracking-wider block mb-1">
                      Estructura Técnica y Dependencias
                    </span>
                    <p className="text-xs text-slate-200">
                      {output.promptBreakdown.technicalStructure}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#031E5C] border border-white/10">
                    <span className="text-[11px] font-bold text-[#FFF12E] uppercase tracking-wider block mb-1">
                      Accesibilidad & WCAG 2.2 AA
                    </span>
                    <p className="text-xs text-slate-200">
                      {output.promptBreakdown.accessibilityWcag}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#031E5C] border border-white/10">
                    <span className="text-[11px] font-bold text-[#FFF12E] uppercase tracking-wider block mb-2">
                      Íconos Sugeridos (Lucide React)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {output.promptBreakdown.suggestedIcons.map((icon, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-full text-xs font-mono bg-white/10 text-white border border-white/10 flex items-center gap-1">
                          <Check className="w-3 h-3 text-[#FFF12E]" /> {icon}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Design Tokens Applied */}
              {activeTab === 'tokens' && (
                <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-[#0636A5] border border-white/20 flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Brand Primary</span>
                      <span className="text-base font-black font-headline text-white">#0636A5 (Speed Blue)</span>
                      <span className="text-xs text-slate-200">Navy egipcio real para identidad y headers</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FFF12E] text-[#0636A5] border border-black/10 flex flex-col gap-1 shadow-lg">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">Brand Accent</span>
                      <span className="text-base font-black font-headline">#FFF12E / #FFEC01</span>
                      <span className="text-xs font-medium">Amarillo Cinético de alto voltaje para CTAs y resplandor</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#052C87] border border-white/15 flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Dark Surface</span>
                      <span className="text-base font-black font-headline text-white">#052C87 (Midnight Navy)</span>
                      <span className="text-xs text-slate-300">Superficie base de tarjetas en sustitución de gris neutro</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#031E5C] border border-white/15 flex flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Deep Contrast</span>
                      <span className="text-base font-black font-headline text-white">#031E5C (Deep Navy)</span>
                      <span className="text-xs text-slate-300">Fondos de inputs y cajas de código con alto contraste</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#031E5C] border border-white/10 flex flex-col gap-3">
                    <span className="text-xs font-bold text-[#FFF12E] uppercase tracking-wider font-headline">
                      Regla Tipográfica 2026
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase block">Display / Título</span>
                        <span className="text-sm font-bold text-white uppercase font-headline">Anton</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase block">Badges & CTAs</span>
                        <span className="text-sm font-bold text-white uppercase font-headline">Bebas Neue</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase block">Párrafos & Body</span>
                        <span className="text-sm font-bold text-white">Outfit</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <span className="text-[10px] text-slate-400 uppercase block">Cifras & Datos</span>
                        <span className="text-sm font-bold font-mono text-[#FFF12E]">Geist Mono</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Quick Preview Card */}
            {output?.previewSummary && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#FFF12E] shrink-0" />
                  <span>{output.previewSummary}</span>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={isPending}
                  className="shrink-0 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-[11px] transition-all flex items-center gap-1"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isPending ? 'animate-spin' : ''}`} />
                  Regenerar
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
