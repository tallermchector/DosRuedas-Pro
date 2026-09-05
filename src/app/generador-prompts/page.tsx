'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  Wand2,
  Copy,
  Layers,
  Terminal,
  Activity,
  Camera,
  MapPin,
  FileCode,
  Box,
  Loader2,
  Check,
  Search,
  Type,
  Compass,
  Sliders,
  Code2
} from 'lucide-react';
import type { AssetPromptInput, AssetPromptOutput } from '@/ai/flows/generate-asset-prompt';
import { PROMPT_LIBRARY, type PromptLibraryItem } from '@/data/prompt-library';
import { reviewCatalog, CatalogItem } from '@/lib/reviewCatalog';
import { generatePromptFromCatalogItem } from '@/lib/prompt-engine';

export default function GeneradorPromptsPage() {
  // Main Navigation Mode
  const [mainMode, setMainMode] = useState<'ui-components' | 'visual-assets'>('ui-components');

  // --- UI/UX Components Generator State (35 reviewCatalog items) ---
  const [selectedCatalogId, setSelectedCatalogId] = useState<string>(() => reviewCatalog[0]?.id || '');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [filterPage, setFilterPage] = useState<string>('Todas');
  const [copiedCatalogPrompt, setCopiedCatalogPrompt] = useState<boolean>(false);

  const pages = useMemo(() => {
    return ['Todas', ...Array.from(new Set(reviewCatalog.map((i) => i.page)))];
  }, []);

  const filteredCatalogItems = useMemo(() => {
    const q = catalogSearch.toLowerCase().trim();
    return reviewCatalog.filter((item) => {
      const matchPage = filterPage === 'Todas' || item.page === filterPage;
      const matchQuery =
        !q ||
        item.sectionTitle.toLowerCase().includes(q) ||
        item.componentName.toLowerCase().includes(q) ||
        item.componentPath.toLowerCase().includes(q) ||
        item.page.toLowerCase().includes(q) ||
        item.elementsToReview.some((el) => el.toLowerCase().includes(q));
      return matchPage && matchQuery;
    });
  }, [filterPage, catalogSearch]);

  const selectedCatalogItem = useMemo(() => {
    return (
      reviewCatalog.find((item) => item.id === selectedCatalogId) ||
      filteredCatalogItems[0] ||
      reviewCatalog[0]
    );
  }, [selectedCatalogId, filteredCatalogItems]);

  const generatedCatalogPrompt = useMemo(() => {
    return selectedCatalogItem ? generatePromptFromCatalogItem(selectedCatalogItem) : '';
  }, [selectedCatalogItem]);

  const handleCopyCatalogPrompt = useCallback(async () => {
    if (!generatedCatalogPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedCatalogPrompt);
      setCopiedCatalogPrompt(true);
      setTimeout(() => setCopiedCatalogPrompt(false), 2000);
    } catch (err) {
      console.error('Error copying prompt:', err);
    }
  }, [generatedCatalogPrompt]);

  // --- Visual Assets & R2I Generator State ---
  const [activeTab, setActiveTab] = useState<'fotos' | 'marca' | 'tipografia'>('fotos');
  const [assetSearchQuery, setAssetSearchQuery] = useState('');
  const [selectedAssetCategory, setSelectedAssetCategory] = useState<string>('all');
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  const [formData, setFormData] = useState<AssetPromptInput>({
    assetType: 'rider-commercial-photo',
    subjectAndAction: '',
    locationContext: 'Mar del Plata, Argentina (Chauvín / Rambla / Güemes)',
    cameraAndMedium: 'Sony A7R IV, 35mm f/2, commercial photography, sharp focus on technical softshell fabrics',
    aspectRatio: '16:9',
    targetFile: '',
    uiLocation: '',
    additionalNotes: ''
  });

  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<AssetPromptOutput | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedAlt, setCopiedAlt] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const currentTabItems = useMemo(() => {
    return PROMPT_LIBRARY.filter((item) => item.sourceGroup === activeTab);
  }, [activeTab]);

  const assetCategories = useMemo(() => {
    const cats = Array.from(new Set(currentTabItems.map((item) => item.category)));
    return ['all', ...cats];
  }, [currentTabItems]);

  const filteredAssetItems = useMemo(() => {
    const q = assetSearchQuery.toLowerCase().trim();
    return currentTabItems.filter((item) => {
      const matchCat = selectedAssetCategory === 'all' || item.category === selectedAssetCategory;
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.uiDestination.toLowerCase().includes(q) ||
        item.targetFile.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [currentTabItems, selectedAssetCategory, assetSearchQuery]);

  const handleLoadItemToForm = (item: PromptLibraryItem) => {
    setFormData({
      assetType: item.assetType,
      subjectAndAction: item.subjectAndAction,
      locationContext: item.locationContext,
      cameraAndMedium: item.cameraAndMedium,
      aspectRatio: item.aspectRatio,
      targetFile: item.targetFile,
      uiLocation: item.uiDestination,
      additionalNotes: item.additionalNotes || ''
    });

    const workbenchEl = document.getElementById('r2i-workbench');
    if (workbenchEl) {
      workbenchEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInstantCopy = async (item: PromptLibraryItem) => {
    try {
      await navigator.clipboard.writeText(item.fullPromptText);
      setCopiedItemId(item.id);
      setTimeout(() => setCopiedItemId(null), 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subjectAndAction.trim()) {
      setErrorMsg('Por favor describe el sujeto y la acción principal.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al generar el prompt con Genkit.');
      }

      setGeneratedResult(data);
    } catch (err: unknown) {
      console.error('Error generating asset prompt:', err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Error conectando con el motor Genkit de Gemini. Verifica tu GEMINI_API_KEY en .env.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = async () => {
    if (!generatedResult) return;
    try {
      await navigator.clipboard.writeText(generatedResult.promptText);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyAlt = async () => {
    if (!generatedResult) return;
    try {
      await navigator.clipboard.writeText(generatedResult.altTextEs);
      setCopiedAlt(true);
      setTimeout(() => setCopiedAlt(false), 2000);
    } catch (err) {
      console.error('Failed to copy alt text', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#021440] text-white selection:bg-[#FFF12E] selection:text-[#021440] font-sans relative overflow-x-hidden pb-20">
      {/* Procedural Route Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFF12E 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#0636A5] blur-[160px] rounded-full opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FFF12E] blur-[200px] rounded-full opacity-10 mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Header Navigation */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold tracking-wider transition-all border border-white/10 hover:border-[#FFF12E]/50 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>COMMAND CENTER</span>
            </Link>

            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0636A5]/40 hover:bg-[#0636A5]/70 text-[#FFF12E] text-xs font-semibold tracking-wider transition-all border border-[#FFF12E]/30 hover:border-[#FFF12E] cursor-pointer"
            >
              <Type className="w-3.5 h-3.5" />
              <span>CATÁLOGO T1-T23</span>
            </Link>
          </div>

          <div
            className="flex items-center gap-3 text-xs text-slate-300"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              CONTRATO VISUAL 2026
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#FFF12E]">35 SECCIONES CATALOGADAS</span>
          </div>
        </header>

        {/* Hero Section & Main Mode Switcher */}
        <div className="mt-8 mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0636A5]/80 border border-[#FFF12E]/30 shadow-lg mb-4">
            <Sparkles className="w-4 h-4 text-[#FFF12E]" />
            <span
              className="text-xs uppercase tracking-widest text-[#FFF12E] font-bold"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              CATÁLOGO 2026 · ENVIOS DOS RUEDAS
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[0.95] drop-shadow-md"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            GENERADOR DE PROMPTS <span className="text-[#FFF12E]">UI/UX & ASSETS</span>
          </h1>

          <p
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Generá prompts autocontenidos listos para asistentes de código (v0, Claude 3.7, Cursor, Bolt) con el contrato visual inmutable de Envíos DosRuedas, o explorá los prompts de assets y fotografía R2I.
          </p>

          {/* Selector de Modo Principal */}
          <div className="mt-6 inline-flex p-1.5 rounded-2xl bg-[#031E5C] border border-white/15 shadow-xl">
            <button
              onClick={() => setMainMode('ui-components')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                mainMode === 'ui-components'
                  ? 'bg-[#FFF12E] text-[#052C87] shadow-[0_0_20px_rgba(255,241,46,0.35)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              <Code2 className="w-4 h-4" />
              <span>35 COMPONENTES UI/UX (REVIEW CATALOG)</span>
            </button>

            <button
              onClick={() => setMainMode('visual-assets')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                mainMode === 'visual-assets'
                  ? 'bg-[#FFF12E] text-[#052C87] shadow-[0_0_20px_rgba(255,241,46,0.35)]'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              <Camera className="w-4 h-4" />
              <span>ASSETS VISUALES & R2I (68 PRESETS)</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECCIÓN A: GENERADOR DE PROMPTS UI/UX (35 SECCIONES)    */}
        {/* ======================================================== */}
        {mainMode === 'ui-components' && (
          <div className="space-y-6">
            {/* Filtro de páginas y buscador */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#04236B]/60 backdrop-blur-xl border border-white/15 p-4 rounded-2xl">
              {/* Filtro de páginas en pastillas */}
              <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-thin">
                {pages.map((p) => (
                  <button
                    key={p}
                    onClick={() => setFilterPage(p)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-['Bebas_Neue'] tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                      filterPage === p
                        ? 'bg-[#FFF12E] text-[#052C87] shadow-[0_0_15px_rgba(255,241,46,0.3)]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {p.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Buscador */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Buscar componente o sección..."
                  className="w-full pl-10 pr-4 py-1.5 rounded-xl bg-[#021440]/90 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FFF12E] transition-all"
                />
              </div>
            </div>

            {/* Layout Grid: Lista de componentes (4 cols) + Prompt Terminal (8 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Lista lateral de componentes */}
              <div className="lg:col-span-4 space-y-2.5 max-h-[720px] overflow-y-auto pr-2 scrollbar-thin">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1 pb-1">
                  <span>{filteredCatalogItems.length} componentes encontrados</span>
                  <span className="font-mono text-[#FFF12E]">reviewCatalog</span>
                </div>

                {filteredCatalogItems.map((item) => {
                  const isSelected = item.id === selectedCatalogItem?.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedCatalogId(item.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#052C87] border-[#FFF12E] shadow-[0_0_20px_rgba(255,241,46,0.2)]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-[#FFF12E] uppercase font-bold tracking-wider">
                          {item.page}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.elementsToReview.length} tokens
                        </span>
                      </div>
                      <div className="font-bold text-sm text-white mt-1 leading-snug">
                        {item.sectionTitle}
                      </div>
                      <div className="text-xs text-white/50 font-mono mt-1.5 flex items-center gap-1.5 truncate">
                        <FileCode className="w-3.5 h-3.5 text-[#FFF12E]/70 shrink-0" />
                        <span className="truncate">{item.componentName}</span>
                        <span className="text-white/25">·</span>
                        <span className="truncate text-slate-400">{item.componentPath}</span>
                      </div>
                    </button>
                  );
                })}

                {filteredCatalogItems.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-xs bg-white/5 rounded-2xl border border-dashed border-white/15">
                    No se encontraron componentes para "{catalogSearch}".
                  </div>
                )}
              </div>

              {/* Panel central de visualización del prompt */}
              <div className="lg:col-span-8 bg-[#052C87] rounded-3xl border border-white/20 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div>
                  {/* Header de visualización del prompt */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-[#FFF12E]" />
                        <span className="font-['Bebas_Neue'] text-lg tracking-wider text-white">
                          PROMPT DE IMPLEMENTACIÓN FRONTEND (NEXT.JS 16)
                        </span>
                      </div>
                      {selectedCatalogItem && (
                        <p className="text-xs text-slate-300 mt-0.5">
                          {selectedCatalogItem.page} · {selectedCatalogItem.sectionTitle} ({selectedCatalogItem.componentName})
                        </p>
                      )}
                    </div>

                    <button
                      onClick={handleCopyCatalogPrompt}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#FFF12E] text-[#052C87] font-['Bebas_Neue'] tracking-wider text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,241,46,0.35)] cursor-pointer self-start sm:self-center"
                    >
                      {copiedCatalogPrompt ? (
                        <>
                          <Check className="w-4 h-4 text-[#052C87]" />
                          <span>¡COPIADO!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#052C87]" />
                          <span>COPIAR PROMPT AUTOCONTENIDO</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Área del prompt con formato terminal */}
                  <div className="bg-[#02123B] p-5 rounded-2xl border border-white/10 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto max-h-[500px] overflow-y-auto scrollbar-thin">
                    <pre className="whitespace-pre-wrap selection:bg-[#FFF12E] selection:text-[#021440]">
                      {generatedCatalogPrompt}
                    </pre>
                  </div>
                </div>

                {/* Metadatos y tokens del componente evaluado */}
                {selectedCatalogItem && (
                  <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/60 font-mono flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#FFF12E]" />
                        Tokens y Especificaciones Inmutables del Catálogo:
                      </span>
                      <span className="text-[11px] font-mono text-[#FFF12E]">
                        {selectedCatalogItem.componentPath}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {selectedCatalogItem.elementsToReview.map((el, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-[#FFF12E] font-medium"
                        >
                          {el}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SECCIÓN B: ASSETS VISUALES & WORKBENCH R2I (68 PRESETS) */}
        {/* ======================================================== */}
        {mainMode === 'visual-assets' && (
          <div className="space-y-12">
            {/* SECCIÓN 1: EXPLORADOR INTERACTIVO DE PRESETS (~68 ASSETS) */}
            <section>
              <div className="rounded-3xl bg-[#04236B]/60 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                {/* Header del explorador */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-[#FFF12E] uppercase tracking-wider mb-1">
                      <Compass className="w-4 h-4" />
                      <span>BIBLIOTECA COMPLETA DE ASSETS DE MARCA</span>
                    </div>
                    <h2
                      className="text-2xl sm:text-3xl font-black uppercase text-white tracking-wide"
                      style={{ fontFamily: "'Anton', sans-serif" }}
                    >
                      EXPLORADOR DE PROMPTS CATALOGADOS
                    </h2>
                  </div>

                  {/* Tabs por origen de archivo */}
                  <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#021440] border border-white/10">
                    <button
                      onClick={() => {
                        setActiveTab('fotos');
                        setSelectedAssetCategory('all');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                        activeTab === 'fotos'
                          ? 'bg-[#FFF12E] text-[#021440] shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>FOTOS WEB (1-21)</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('marca');
                        setSelectedAssetCategory('all');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                        activeTab === 'marca'
                          ? 'bg-[#FFF12E] text-[#021440] shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      <Box className="w-3.5 h-3.5" />
                      <span>ASSETS DE MARCA (A1-H1)</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('tipografia');
                        setSelectedAssetCategory('all');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                        activeTab === 'tipografia'
                          ? 'bg-[#FFF12E] text-[#021440] shadow-md'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      <Type className="w-3.5 h-3.5" />
                      <span>TIPOGRAFÍA 3D (T1-T23)</span>
                    </button>
                  </div>
                </div>

                {/* Barra de Filtros & Búsqueda */}
                <div className="py-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
                  {/* Buscador */}
                  <div className="relative w-full sm:max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={assetSearchQuery}
                      onChange={(e) => setAssetSearchQuery(e.target.value)}
                      placeholder="Buscar por código, título, archivo destino o ubicación UI..."
                      className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#021440]/80 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FFF12E] transition-all"
                    />
                  </div>

                  {/* Selector de Categorías / Píldoras */}
                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
                    {assetCategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedAssetCategory(cat)}
                        className={`px-3 py-1 rounded-lg text-[11px] font-medium tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                          selectedAssetCategory === cat
                            ? 'bg-white/20 text-[#FFF12E] border border-[#FFF12E]/40'
                            : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        {cat === 'all' ? 'Todos' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid de Cards de Assets */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[560px] overflow-y-auto pr-1">
                  {filteredAssetItems.map((item) => {
                    const isCopied = copiedItemId === item.id;
                    return (
                      <div
                        key={item.id}
                        className="flex flex-col justify-between p-5 rounded-2xl bg-[#021440]/80 border border-white/10 hover:border-[#FFF12E]/50 hover:bg-[#0636A5]/30 transition-all duration-300 shadow-lg group relative"
                      >
                        <div>
                          {/* Top Badges */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-1.5">
                              <span
                                className="px-2 py-0.5 rounded-md bg-[#FFF12E] text-[#021440] font-black text-xs uppercase"
                                style={{ fontFamily: "'Anton', sans-serif" }}
                              >
                                {item.code}
                              </span>
                              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                                {item.category}
                              </span>
                            </div>

                            <span
                              className="text-[10px] text-[#628FF9] font-mono"
                              style={{ fontFamily: "'Geist Mono', monospace" }}
                            >
                              {item.aspectRatio} · {item.resolution}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className="text-base font-bold text-white uppercase tracking-tight mb-2 group-hover:text-[#FFF12E] transition-colors"
                            style={{ fontFamily: "'Bebas Neue', cursive" }}
                          >
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">{item.description}</p>

                          {/* Destination metadata */}
                          <div className="p-2 rounded-lg bg-black/30 border border-white/5 mb-4 text-[11px] text-slate-400 space-y-1">
                            <div className="flex items-center gap-1 truncate">
                              <MapPin className="w-3 h-3 text-[#FFF12E] shrink-0" />
                              <span className="truncate text-slate-300">{item.uiDestination}</span>
                            </div>
                            <div className="flex items-center gap-1 truncate font-mono text-[10px] text-[#628FF9]">
                              <FileCode className="w-3 h-3 shrink-0" />
                              <span className="truncate">{item.targetFile}</span>
                            </div>
                          </div>
                        </div>

                        {/* Dual Action Buttons: Instant Copy + Load into Form */}
                        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                          <button
                            onClick={() => handleInstantCopy(item)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                              isCopied
                                ? 'bg-[#22c55e] text-white shadow-md'
                                : 'bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10'
                            }`}
                            style={{ fontFamily: "'Bebas Neue', cursive" }}
                            title="Copiar prompt listo para usar"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{isCopied ? '¡COPIADO!' : '1-CLIC COPIAR'}</span>
                          </button>

                          <button
                            onClick={() => handleLoadItemToForm(item)}
                            className="py-2 px-3 rounded-xl bg-[#0636A5] hover:bg-[#FFF12E] text-white hover:text-[#021440] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-[#FFF12E]/30 hover:border-[#FFF12E] cursor-pointer shadow-md"
                            style={{ fontFamily: "'Bebas Neue', cursive" }}
                            title="Cargar al formulario para editar con IA"
                          >
                            <Wand2 className="w-3.5 h-3.5" />
                            <span>PERSONALIZAR</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {filteredAssetItems.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-sm">
                    No se encontraron prompts que coincidan con la búsqueda "{assetSearchQuery}".
                  </div>
                )}
              </div>
            </section>

            {/* SECCIÓN 2: WORKBENCH FORMULARIO R2I + GENKIT GEMINI AI */}
            <div id="r2i-workbench" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Form & Settings */}
              <div className="lg:col-span-6 space-y-6">
                <div className="rounded-3xl bg-[#04236B]/60 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
                    <div>
                      <h3
                        className="text-2xl font-black uppercase text-white tracking-wide"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                      >
                        CONFIGURADOR DE ASSET (R2I)
                      </h3>
                      <p className="text-xs text-slate-300">
                        Ajusta los parámetros y genera con la Plantilla Maestra y Gemini
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-[#021440] border border-[#FFF12E]/30 flex items-center justify-center text-[#FFF12E]">
                      <Sliders className="w-5 h-5" />
                    </div>
                  </div>

                  <form onSubmit={handleGenerate} className="space-y-4 text-xs">
                    {/* Asset Type */}
                    <div>
                      <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Tipo de Recurso Visual
                      </label>
                      <select
                        value={formData.assetType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            assetType: e.target.value as AssetPromptInput['assetType']
                          })
                        }
                        className="w-full p-3 rounded-xl bg-[#021440] border border-white/15 text-white focus:outline-none focus:border-[#FFF12E] transition-all cursor-pointer font-medium"
                      >
                        <option value="rider-commercial-photo">📸 Fotografía Comercial de Rider / Escena Urbana</option>
                        <option value="typography-3d">✨ Tipografía 3D Extruida & Lettering de Marca</option>
                        <option value="3d-packaging-fleet">📦 Paquetería 3D, Cajas Kraft & Flota de Scooters</option>
                        <option value="isometric-map-hub">🗺️ Mapa Isométrico de Mar del Plata & Hub Chauvín</option>
                        <option value="duotone-icon-set">⚡ Set de Iconos Duotono (#0636A5 / #FFF12E)</option>
                        <option value="custom">🛠️ Personalizado (Custom Asset)</option>
                      </select>
                    </div>

                    {/* Subject & Action */}
                    <div>
                      <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                        <span>Sujeto, Objeto y Acción Principal *</span>
                        <span className="text-[#FFF12E] font-mono text-[11px]">R2I Core</span>
                      </label>
                      <textarea
                        rows={4}
                        value={formData.subjectAndAction}
                        onChange={(e) => setFormData({ ...formData, subjectAndAction: e.target.value })}
                        placeholder="Ej: Repartidor en scooter entregando caja kraft con cinta azul a una clienta en la puerta de su casa..."
                        className="w-full p-3 rounded-xl bg-[#021440] border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#FFF12E] transition-all text-xs leading-relaxed"
                        required
                      />
                    </div>

                    {/* Setting / Location */}
                    <div>
                      <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Entorno & Locación (Mar del Plata)
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-[#FFF12E] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={formData.locationContext || ''}
                          onChange={(e) => setFormData({ ...formData, locationContext: e.target.value })}
                          placeholder="Ej: Rambla Casino Central, Güemes, Hub Friuli 1972..."
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#021440] border border-white/15 text-white focus:outline-none focus:border-[#FFF12E] transition-all"
                        />
                      </div>
                    </div>

                    {/* Two columns: Camera & Aspect Ratio */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Cámara / Motor Render
                        </label>
                        <div className="relative">
                          <Camera className="w-4 h-4 text-[#FFF12E] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={formData.cameraAndMedium || ''}
                            onChange={(e) => setFormData({ ...formData, cameraAndMedium: e.target.value })}
                            placeholder="Ej: Sony A7R IV 35mm f/2..."
                            className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#021440] border border-white/15 text-white focus:outline-none focus:border-[#FFF12E] transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Relación de Aspecto (--ar)
                        </label>
                        <select
                          value={formData.aspectRatio}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              aspectRatio: e.target.value as AssetPromptInput['aspectRatio']
                            })
                          }
                          className="w-full p-2.5 rounded-xl bg-[#021440] border border-white/15 text-white focus:outline-none focus:border-[#FFF12E] transition-all cursor-pointer font-mono"
                        >
                          <option value="16:9">16:9 (Hero / Banner / Paisaje)</option>
                          <option value="4:3">4:3 (Tarjetas / Bento Grids)</option>
                          <option value="1:1">1:1 (Cuadrado / Iconos / 3D)</option>
                          <option value="3:2">3:2 (Tipografías / Renders 2K)</option>
                          <option value="4:5">4:5 (Vertical / Retrato)</option>
                          <option value="9:16">9:16 (Stories / Mobile)</option>
                        </select>
                      </div>
                    </div>

                    {/* Two columns: Target File & UI Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Nombre de Archivo Destino
                        </label>
                        <input
                          type="text"
                          value={formData.targetFile || ''}
                          onChange={(e) => setFormData({ ...formData, targetFile: e.target.value })}
                          placeholder="express-hero-rider.webp"
                          className="w-full p-2.5 rounded-xl bg-[#021440] border border-white/15 text-white font-mono focus:outline-none focus:border-[#FFF12E] transition-all text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                          Componente UI de Destino
                        </label>
                        <input
                          type="text"
                          value={formData.uiLocation || ''}
                          onChange={(e) => setFormData({ ...formData, uiLocation: e.target.value })}
                          placeholder="ExpressHero.tsx / Hero"
                          className="w-full p-2.5 rounded-xl bg-[#021440] border border-white/15 text-white focus:outline-none focus:border-[#FFF12E] transition-all text-xs"
                        />
                      </div>
                    </div>

                    {/* Submit Action Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FFF12E] via-[#FFD700] to-[#FFF12E] text-[#021440] font-black uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(255,241,46,0.3)] hover:shadow-[0_0_35px_rgba(255,241,46,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontFamily: "'Bebas Neue', cursive" }}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>PROCESANDO CON GENKIT & GEMINI AI...</span>
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-5 h-5" />
                            <span>GENERAR PROMPT CON PLANTILLA MAESTRA R2I</span>
                          </>
                        )}
                      </button>
                    </div>

                    {errorMsg && (
                      <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs">
                        {errorMsg}
                      </div>
                    )}
                  </form>
                </div>
              </div>

              {/* Right Column: Master Output Display */}
              <div className="lg:col-span-6 space-y-6">
                {!generatedResult && !loading && (
                  <div className="rounded-3xl bg-[#04236B]/40 backdrop-blur-xl border border-dashed border-white/20 p-8 text-center flex flex-col items-center justify-center min-h-[480px]">
                    <div className="w-16 h-16 rounded-full bg-[#021440] border border-[#FFF12E]/30 flex items-center justify-center text-[#FFF12E] mb-4">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h3
                      className="text-xl font-bold uppercase text-white mb-2"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      ESPERANDO GENERACIÓN DE ASSET
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                      Selecciona uno de los 68 presets del explorador o completa el formulario para obtener el prompt
                      estructurado con las 4 referencias de marca vinculadas.
                    </p>
                  </div>
                )}

                {loading && (
                  <div className="rounded-3xl bg-[#04236B]/40 backdrop-blur-xl border border-white/15 p-8 text-center flex flex-col items-center justify-center min-h-[480px]">
                    <Loader2 className="w-12 h-12 text-[#FFF12E] animate-spin mb-4" />
                    <h3
                      className="text-xl font-bold uppercase text-[#FFF12E] mb-2"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      CALIBRANDO REFERENCIAS R2I...
                    </h3>
                    <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                      Vinculando Logo (#0636A5/#FFF12E), Tríptico de Personaje, Chaquetas Softshell y Uniforme con Gemini.
                    </p>
                  </div>
                )}

                {generatedResult && !loading && (
                  <div className="rounded-3xl bg-[#04236B]/80 backdrop-blur-xl border border-[#FFF12E]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                    {/* Card Title */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                      <div>
                        <span
                          className="text-xs font-bold uppercase text-[#FFF12E] tracking-wider"
                          style={{ fontFamily: "'Bebas Neue', cursive" }}
                        >
                          PROMPT ESTRUCTURADO R2I GENERADO
                        </span>
                        <h3
                          className="text-2xl font-black uppercase text-white"
                          style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                          {generatedResult.title}
                        </h3>
                      </div>

                      <button
                        onClick={handleCopyPrompt}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFF12E] hover:bg-white text-[#021440] text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer self-start sm:self-center"
                        style={{ fontFamily: "'Bebas Neue', cursive" }}
                      >
                        {copiedPrompt ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedPrompt ? '¡COPIADO!' : 'COPIAR PROMPT'}</span>
                      </button>
                    </div>

                    <div className="mt-5 space-y-5">
                      {/* Full Raw Prompt Box */}
                      <div className="relative">
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                          <span className="font-bold text-slate-300 uppercase">Prompt Completo (Midjourney / Flux / Gemini)</span>
                          <span
                            className="text-[#FFF12E] font-mono"
                            style={{ fontFamily: "'Geist Mono', monospace" }}
                          >
                            {generatedResult.parameters.aspectRatio}
                          </span>
                        </div>

                        <pre
                          className="p-4 rounded-2xl bg-[#021440] border border-white/15 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap selection:bg-[#FFF12E] selection:text-[#021440] max-h-48 overflow-y-auto"
                          style={{ fontFamily: "'Geist Mono', monospace" }}
                        >
                          <code>{generatedResult.promptText}</code>
                        </pre>
                      </div>

                      {/* 5-Block Breakdown */}
                      <div>
                        <h4
                          className="text-sm font-black uppercase text-[#FFF12E] tracking-wider mb-3 flex items-center gap-1.5"
                          style={{ fontFamily: "'Bebas Neue', cursive" }}
                        >
                          <Layers className="w-4 h-4" />
                          DESGLOSE ESTRUCTURADO R2I
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                          <div className="p-3 rounded-xl bg-[#021440] border border-white/10">
                            <span className="text-[#FFF12E] font-bold block mb-1">1. Sujeto</span>
                            <p className="text-slate-300">{generatedResult.coreStructure.subjectAndReferences}</p>
                          </div>
                          <div className="p-3 rounded-xl bg-[#021440] border border-white/10">
                            <span className="text-[#FFF12E] font-bold block mb-1">2. Entorno</span>
                            <p className="text-slate-300">{generatedResult.coreStructure.settingContext}</p>
                          </div>
                        </div>
                      </div>

                      {/* Copy Alt Action */}
                      <button
                        onClick={handleCopyAlt}
                        className="flex items-center gap-2 text-[11px] text-slate-400 hover:text-[#FFF12E] transition-colors"
                      >
                        {copiedAlt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedAlt ? 'Alt copiado' : 'Copiar texto Alt (HTML)'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Operational Footer Card */}
        <div className="mt-12 rounded-2xl bg-[#04236B]/40 backdrop-blur-md border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#021440] border border-[#FFF12E]/30 flex items-center justify-center text-[#FFF12E]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p
                className="font-bold uppercase text-white tracking-wider"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                ENVÍOS DOSRUEDAS · GENERADOR DE PROMPTS Y CONTRATO VISUAL 2026
              </p>
              <p className="text-slate-400">
                Sincronizado con reviewCatalog (35 secciones) y PROMPT_LIBRARY (68 presets R2I)
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-4 text-[11px]"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            <span>BASE MDQ · FRIULI 1972</span>
            <span className="text-[#FFF12E]">●</span>
            <span>MODEL: GEMINI 2.5 / MULTI-FALLBACK</span>
          </div>
        </div>
      </div>
    </div>
  );
}

