'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowLeft,
  Wand2,
  Copy,
  CheckCircle2,
  Layers,
  Terminal,
  Activity,
  Image as ImageIcon,
  BookOpen,
  Camera,
  MapPin,
  FileCode,
  ShieldCheck,
  Box,
  RotateCcw,
  Loader2,
  Check,
  Search,
  Type,
  LayoutGrid,
  Info,
  Compass,
  Sliders
} from 'lucide-react';
import type { AssetPromptInput, AssetPromptOutput } from '@/ai/flows/generate-asset-prompt';
import { PROMPT_LIBRARY, type PromptLibraryItem } from '@/data/prompt-library';

export default function GeneradorPromptsPage() {
  // Explorer state
  const [activeTab, setActiveTab] = useState<'fotos' | 'marca' | 'tipografia'>('fotos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  // Form & Genkit AI state
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

  // Filter library items
  const currentTabItems = useMemo(() => {
    return PROMPT_LIBRARY.filter((item) => item.sourceGroup === activeTab);
  }, [activeTab]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(currentTabItems.map((item) => item.category)));
    return ['all', ...cats];
  }, [currentTabItems]);

  const filteredItems = useMemo(() => {
    return currentTabItems.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.uiDestination.toLowerCase().includes(q) ||
        item.targetFile.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [currentTabItems, selectedCategory, searchQuery]);

  // Load into form & scroll to workbench
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

  // Instant copy direct prompt
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
    <div className="min-h-screen bg-[#021440] text-white selection:bg-[#FFEC01] selection:text-[#021440] font-sans relative overflow-x-hidden pb-20">
      {/* Procedural Route Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #FFEC01 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#0636A5] blur-[160px] rounded-full opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#FFEC01] blur-[200px] rounded-full opacity-10 mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Header Navigation */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold tracking-wider transition-all border border-white/10 hover:border-[#FFEC01]/50 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>COMMAND CENTER</span>
            </Link>

            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0636A5]/40 hover:bg-[#0636A5]/70 text-[#FFEC01] text-xs font-semibold tracking-wider transition-all border border-[#FFEC01]/30 hover:border-[#FFEC01] cursor-pointer"
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
              R2I ENGINE · GENKIT READY
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#FFEC01]">68 PRESETS DISPONIBLES</span>
          </div>
        </header>

        {/* Hero Section */}
        <div className="mt-8 mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0636A5]/80 border border-[#FFEC01]/30 shadow-lg mb-4">
            <Sparkles className="w-4 h-4 text-[#FFEC01]" />
            <span
              className="text-xs uppercase tracking-widest text-[#FFEC01] font-bold"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              MOTOR INTELIGENTE DE PROMPTS R2I · SISTEMA DE DISEÑO OFICIAL
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[0.95] drop-shadow-md"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            GENERADOR & BIBLIOTECA <span className="text-[#FFEC01]">ENVÍOS DOSRUEDAS</span>
          </h1>

          <p
            className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Explora los <strong>68 prompts oficiales</strong> extraídos de la documentación de marca o utiliza la{' '}
            <span className="text-[#FFEC01] font-medium">Plantilla Maestra R2I</span> con Gemini y Genkit para calibrar
            nuevos assets con consistencia de personajes, flota y paleta corporativa.
          </p>
        </div>

        {/* ======================================================== */}
        {/* SECCIÓN 1: EXPLORADOR INTERACTIVO DE PRESETS (~68 ASSETS) */}
        {/* ======================================================== */}
        <section className="mb-14">
          <div className="rounded-3xl bg-[#04236B]/60 backdrop-blur-xl border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Header del explorador */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFEC01] uppercase tracking-wider mb-1">
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
                    setSelectedCategory('all');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'fotos'
                      ? 'bg-[#FFEC01] text-[#021440] shadow-md'
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
                    setSelectedCategory('all');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'marca'
                      ? 'bg-[#FFEC01] text-[#021440] shadow-md'
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
                    setSelectedCategory('all');
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'tipografia'
                      ? 'bg-[#FFEC01] text-[#021440] shadow-md'
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por código, título, archivo destino o ubicación UI..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#021440]/80 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#FFEC01] transition-all"
                />
              </div>

              {/* Selector de Categorías / Píldoras */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-[11px] font-medium tracking-wide uppercase transition-all whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-white/20 text-[#FFEC01] border border-[#FFEC01]/40'
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
              {filteredItems.map((item) => {
                const isCopied = copiedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between p-5 rounded-2xl bg-[#021440]/80 border border-white/10 hover:border-[#FFEC01]/50 hover:bg-[#0636A5]/30 transition-all duration-300 shadow-lg group relative"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="px-2 py-0.5 rounded-md bg-[#FFEC01] text-[#021440] font-black text-xs uppercase"
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
                        className="text-base font-bold text-white uppercase tracking-tight mb-2 group-hover:text-[#FFEC01] transition-colors"
                        style={{ fontFamily: "'Bebas Neue', cursive" }}
                      >
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-3">{item.description}</p>

                      {/* Destination metadata */}
                      <div className="p-2 rounded-lg bg-black/30 border border-white/5 mb-4 text-[11px] text-slate-400 space-y-1">
                        <div className="flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-[#FFEC01] shrink-0" />
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
                        className="py-2 px-3 rounded-xl bg-[#0636A5] hover:bg-[#FFEC01] text-white hover:text-[#021440] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all border border-[#FFEC01]/30 hover:border-[#FFEC01] cursor-pointer shadow-md"
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

            {filteredItems.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">
                No se encontraron prompts que coincidan con la búsqueda "{searchQuery}".
              </div>
            )}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECCIÓN 2: WORKBENCH FORMULARIO R2I + GENKIT GEMINI AI  */}
        {/* ======================================================== */}
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
                <div className="w-10 h-10 rounded-2xl bg-[#021440] border border-[#FFEC01]/30 flex items-center justify-center text-[#FFEC01]">
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
                    className="w-full p-3 rounded-xl bg-[#021440] border border-white/15 text-white focus:outline-none focus:border-[#FFEC01] transition-all cursor-pointer font-medium"
                  >
                    <option value="rider-commercial-photo">📸 Fotografía Comercial de Rider / Escena Urbana</option>
                    <option value="typography-3d">✨ Tipografía 3D Extruida & Lettering de Marca</option>
                    <option value="3d-packaging-fleet">📦 Paquetería 3D, Cajas Kraft & Flota de Scooters</option>
                    <option value="isometric-map-hub">🗺️ Mapa Isométrico de Mar del Plata & Hub Chauvín</option>
                    <option value="duotone-icon-set">⚡ Set de Iconos Duotono (#0636A5 / #FFEC01)</option>
                    <option value="custom">🛠️ Personalizado (Custom Asset)</option>
                  </select>
                </div>

                {/* Subject & Action */}
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span>Sujeto, Objeto y Acción Principal *</span>
                    <span className="text-[#FFEC01] font-mono text-[11px]">R2I Core</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.subjectAndAction}
                    onChange={(e) => setFormData({ ...formData, subjectAndAction: e.target.value })}
                    placeholder="Ej: Repartidor en scooter entregando caja kraft con cinta azul a una clienta en la puerta de su casa..."
                    className="w-full p-3 rounded-xl bg-[#021440] border border-white/15 text-white placeholder-slate-400 focus:outline-none focus:border-[#FFEC01] transition-all text-xs leading-relaxed"
                    required
                  />
                </div>

                {/* Setting / Location */}
                <div>
                  <label className="block font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Entorno & Locación (Mar del Plata)
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#FFEC01] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.locationContext || ''}
                      onChange={(e) => setFormData({ ...formData, locationContext: e.target.value })}
                      placeholder="Ej: Rambla Casino Central, Güemes, Hub Friuli 1972..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#021440] border border-white/15 text-white focus:outline-none focus:border-[#FFEC01] transition-all"
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
                      <Camera className="w-4 h-4 text-[#FFEC01] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.cameraAndMedium || ''}
                        onChange={(e) => setFormData({ ...formData, cameraAndMedium: e.target.value })}
                        placeholder="Ej: Sony A7R IV 35mm f/2..."
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#021440] border border-white/15 text-white focus:outline-none focus:border-[#FFEC01] transition-all"
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
                      className="w-full p-2.5 rounded-xl bg-[#021440] border border-white/15 text-white focus:outline-none focus:border-[#FFEC01] transition-all cursor-pointer font-mono"
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
                      className="w-full p-2.5 rounded-xl bg-[#021440] border border-white/15 text-white font-mono focus:outline-none focus:border-[#FFEC01] transition-all text-xs"
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
                      className="w-full p-2.5 rounded-xl bg-[#021440] border border-white/15 text-white focus:outline-none focus:border-[#FFEC01] transition-all text-xs"
                    />
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#FFEC01] via-[#FFD700] to-[#FFEC01] text-[#021440] font-black uppercase tracking-wider text-sm shadow-[0_0_25px_rgba(255,236,1,0.3)] hover:shadow-[0_0_35px_rgba(255,236,1,0.5)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
                <div className="w-16 h-16 rounded-full bg-[#021440] border border-[#FFEC01]/30 flex items-center justify-center text-[#FFEC01] mb-4">
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
                <Loader2 className="w-12 h-12 text-[#FFEC01] animate-spin mb-4" />
                <h3
                  className="text-xl font-bold uppercase text-[#FFEC01] mb-2"
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                >
                  CALIBRANDO REFERENCIAS R2I...
                </h3>
                <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                  Vinculando Logo (#0636A5/#FFEC01), Tríptico de Personaje, Chaquetas Softshell y Uniforme con Gemini.
                </p>
              </div>
            )}

            {generatedResult && !loading && (
              <div className="rounded-3xl bg-[#04236B]/80 backdrop-blur-xl border border-[#FFEC01]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Card Title */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                  <div>
                    <span
                      className="text-xs font-bold uppercase text-[#FFEC01] tracking-wider"
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFEC01] hover:bg-white text-[#021440] text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer self-start sm:self-center"
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
                        className="text-[#FFEC01] font-mono"
                        style={{ fontFamily: "'Geist Mono', monospace" }}
                      >
                        {generatedResult.parameters.aspectRatio}
                      </span>
                    </div>

                    <pre
                      className="p-4 rounded-2xl bg-[#021440] border border-white/15 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap selection:bg-[#FFEC01] selection:text-[#021440] max-h-48 overflow-y-auto"
                      style={{ fontFamily: "'Geist Mono', monospace" }}
                    >
                      <code>{generatedResult.promptText}</code>
                    </pre>
                  </div>

                  {/* 5-Block Breakdown */}
                  <div>
                    <h4
                      className="text-sm font-black uppercase text-[#FFEC01] tracking-wider mb-3 flex items-center gap-1.5"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      <Layers className="w-4 h-4" />
                      DESGLOSE ESTRUCTURADO R2I
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                      <div className="p-3 rounded-xl bg-[#021440] border border-white/10">
                        <span className="text-[#FFEC01] font-bold block mb-1">1. Sujeto</span>
                        <p className="text-slate-300">{generatedResult.coreStructure.subjectAndReferences}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-[#021440] border border-white/10">
                        <span className="text-[#FFEC01] font-bold block mb-1">2. Entorno</span>
                        <p className="text-slate-300">{generatedResult.coreStructure.settingContext}</p>
                      </div>
                    </div>
                  </div>

                  {/* Copy Alt Action */}
                  <button
                    onClick={handleCopyAlt}
                    className="flex items-center gap-2 text-[11px] text-slate-400 hover:text-[#FFEC01] transition-colors"
                  >
                    {copiedAlt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAlt ? 'Alt copiado' : 'Copiar texto Alt (HTML)'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Operational Footer Card */}
        <div className="mt-12 rounded-2xl bg-[#04236B]/40 backdrop-blur-md border border-white/10 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#021440] border border-[#FFEC01]/30 flex items-center justify-center text-[#FFEC01]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <p
                className="font-bold uppercase text-white tracking-wider"
                style={{ fontFamily: "'Bebas Neue', cursive" }}
              >
                ENVÍOS DOSRUEDAS · GENERADOR R2I (GENKIT + GEMINI AI)
              </p>
              <p className="text-slate-400">Sincronizado con docs/BRAND-ASSET-PROMPTS.md, IMAGE-PROMPTS.md y TYPE-ASSET-PROMPTS.md</p>
            </div>
          </div>

          <div
            className="flex items-center gap-4 text-[11px]"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            <span>BASE MDQ · FRIULI 1972</span>
            <span className="text-[#FFEC01]">●</span>
            <span>MODEL: GEMINI 2.5 / MULTI-FALLBACK</span>
          </div>
        </div>
      </div>
    </div>
  );
}
