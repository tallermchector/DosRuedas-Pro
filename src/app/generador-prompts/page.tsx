'use client';

import React, { useState } from 'react';
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
  Zap,
  Box,
  Truck,
  RotateCcw,
  Loader2,
  ExternalLink,
  ChevronRight,
  Sliders,
  Check
} from 'lucide-react';
import {
  generateAssetPrompt,
  type AssetPromptInput,
  type AssetPromptOutput
} from '@/ai/flows/generate-asset-prompt';

const PRESET_EXAMPLES: { label: string; data: AssetPromptInput }[] = [
  {
    label: '📸 Rider en la Rambla Casino (Home Hero)',
    data: {
      assetType: 'rider-commercial-photo',
      subjectAndAction:
        'Rider in late twenties riding a light-blue delivery scooter along the Rambla, with the Casino Central stone facade and Atlantic ocean horizon behind him. Confident half-smile, steady hand on handlebars.',
      locationContext: 'Rambla Casino Central, Mar del Plata, Argentina',
      cameraAndMedium: 'Sony A7R IV, 35mm f/2, Kodak Portra 400 tones with golden hour oceanic light',
      aspectRatio: '16:9',
      targetFile: 'home-hero-rider-rambla-1920x1080.webp',
      uiLocation: 'Home.tsx / Hero Section',
      additionalNotes: 'Golden hour sun low over the ocean, cool blue shadows on pavement.'
    }
  },
  {
    label: '📦 Entrega Flex en Mostrador de Comercio',
    data: {
      assetType: 'rider-commercial-photo',
      subjectAndAction:
        'Woman owner of a boutique clothing shop handing a stack of 3 kraft boxes to a uniformed DosRuedas courier in the doorway of her store.',
      locationContext: 'Calle Güemes commercial zone, Mar del Plata',
      cameraAndMedium: 'Canon EOS R5, 50mm f/2, natural documentary commercial lighting',
      aspectRatio: '4:3',
      targetFile: 'home-ecommerce-retiro-local-1600x1200.webp',
      uiLocation: 'Home.tsx / Soluciones Industrias',
      additionalNotes: 'Shelves with folded garments behind, scooter parked at kerb outside out of focus.'
    }
  },
  {
    label: '✨ 3D Extruido: "ENVÍOS EXPRESS" (T1)',
    data: {
      assetType: 'typography-3d',
      subjectAndAction:
        'The text "ENVÍOS EXPRESS" as chunky 3D extruded lettering in heavy Anton display font style. Glossy kinetic yellow front faces, deep navy blue lateral extrusion block.',
      locationContext: 'Seamless pure white studio floor with soft ambient contact shadow',
      cameraAndMedium: 'Octane 3D render, PBR materials, directional key light from upper-left',
      aspectRatio: '3:2',
      targetFile: 'type-envios-express.png',
      uiLocation: 'ExpressHero.tsx / ServiceCard.tsx',
      additionalNotes: 'Sharp beveled edges, faint yellow specular ground reflection.'
    }
  },
  {
    label: '🏭 Depósito & Hub 3PL Friuli 1972 (Fulfillment)',
    data: {
      assetType: 'rider-commercial-photo',
      subjectAndAction:
        'Bright distribution hub interior with steel shelving stocked with kraft boxes and QR tagged bins; courier in navy polo scanning a bin with smartphone.',
      locationContext: 'Base de Operaciones Friuli 1972, Chauvín, Mar del Plata',
      cameraAndMedium: 'Nikon Z8, 24mm f/4, crisp logistics documentary look',
      aspectRatio: '16:9',
      targetFile: '3pl-hero-deposito-friuli-1920x1080.webp',
      uiLocation: 'FulfillmentHero.tsx (3PL Plan)',
      additionalNotes: 'Epoxy floor, natural light from high windows mixed with LED strips.'
    }
  },
  {
    label: '📦 Paquetería 3D: Pila de Cajas Kraft (A3)',
    data: {
      assetType: '3d-packaging-fleet',
      subjectAndAction:
        'Three kraft cardboard boxes of decreasing size stacked slightly offset, the middle one wrapped with brand-blue tape and top one with yellow tape band.',
      locationContext: 'Pure white studio background for cut-out use',
      cameraAndMedium: 'Glossy 3D product render, upper-left soft studio light with yellow rim',
      aspectRatio: '1:1',
      targetFile: 'asset-pila-cajas-1024.png',
      uiLocation: 'Tarjetas de Beneficios / Cuentas Corrientes',
      additionalNotes: 'Soft ambient contact shadow underneath, friendly slightly toy-like proportions.'
    }
  }
];

export default function GeneradorPromptsPage() {
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

  const handlePresetSelect = (preset: AssetPromptInput) => {
    setFormData(preset);
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
      const result = await generateAssetPrompt(formData);
      setGeneratedResult(result);
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

  const handleCopyPrompt = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult.promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyAlt = () => {
    if (!generatedResult) return;
    navigator.clipboard.writeText(generatedResult.altTextEs);
    setCopiedAlt(true);
    setTimeout(() => setCopiedAlt(false), 2000);
  };

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden selection:bg-[#FFEC01] selection:text-[#021440]"
      style={{
        fontFamily: "'Outfit', sans-serif",
        background: 'linear-gradient(135deg, #021440 0%, #04236B 35%, #0636A5 75%, #00277C 100%)'
      }}
    >
      {/* 1. Background Grid & Radial Orbs (DESIGN.md) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden="true">
          <pattern id="hero-grid-gen" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="2,6" />
            <circle cx="0" cy="0" r="1.5" fill="#FFEC01" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grid-gen)" />
        </svg>

        <div
          className="absolute -top-32 left-1/4 w-[750px] h-[550px] rounded-full blur-[140px] opacity-70 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,236,1,0.22) 0%, rgba(255,236,1,0.06) 45%, transparent 70%)'
          }}
        />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-[#0950F6]/25 blur-[160px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#04236B]/60 hover:bg-[#0636A5] border border-white/15 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Command Center</span>
            </Link>

            <Link
              href="/prompts"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFEC01]/10 hover:bg-[#FFEC01]/20 border border-[#FFEC01]/30 text-xs font-semibold uppercase tracking-wider text-[#FFEC01] transition-all duration-200"
            >
              <BookOpen className="w-4 h-4" />
              <span>Ver Catálogo T1-T23</span>
            </Link>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 bg-[#04236B]/70 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFEC01] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFEC01]"></span>
            </span>
            <span
              className="text-xs uppercase tracking-widest text-[#FFEC01] font-bold"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              Genkit AI Engine · Online
            </span>
          </div>
        </div>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFEC01]/10 text-[#FFEC01] border border-[#FFEC01]/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              R2I MASTER PROMPT GENERATOR
            </span>
            <span
              className="text-xs text-slate-300 uppercase tracking-widest hidden sm:inline"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              GENKIT + GEMINI 2.5 FLASH
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-[0.95] mb-4"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            GENERADOR INTELIGENTE <span className="text-[#FFEC01]">DE PROMPTS R2I</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-4xl font-normal leading-relaxed">
            Crea directivas visuales de nivel comercial que vinculan automáticamente las{' '}
            <strong className="text-[#FFEC01]">4 referencias visuales oficiales de marca</strong> (Logo, Tríptico del
            Rider, Chaqueta Softshell y Kit de Uniforme) para garantizar consistencia total en fotos y renders de{' '}
            <strong>Envíos DosRuedas</strong>.
          </p>
        </header>

        {/* 4 Brand References Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-[#04236B]/60 border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#021440] border border-[#FFEC01]/40 flex items-center justify-center text-[#FFEC01] text-xs font-bold">
              REF 1
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                Logo Oficial
              </p>
              <p className="text-[11px] text-slate-400">#0636A5 / #FFEC01</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#04236B]/60 border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#021440] border border-[#FFEC01]/40 flex items-center justify-center text-[#FFEC01] text-xs font-bold">
              REF 2
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                Tríptico Personaje
              </p>
              <p className="text-[11px] text-slate-400">Rostro & Complexión</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#04236B]/60 border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#021440] border border-[#FFEC01]/40 flex items-center justify-center text-[#FFEC01] text-xs font-bold">
              REF 3
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                Diseño Chaquetas
              </p>
              <p className="text-[11px] text-slate-400">Softshell & Cierres</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-[#04236B]/60 border border-white/10 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#021440] border border-[#FFEC01]/40 flex items-center justify-center text-[#FFEC01] text-xs font-bold">
              REF 4
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase" style={{ fontFamily: "'Bebas Neue', cursive" }}>
                Kit de Uniforme
              </p>
              <p className="text-[11px] text-slate-400">Polo Azul & Gorra</p>
            </div>
          </div>
        </div>

        {/* Quick Presets Carousel / Badges */}
        <div className="mb-8">
          <p className="text-xs text-slate-300 uppercase tracking-widest mb-3 font-semibold flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-[#FFEC01]" />
            CARGAR EJEMPLO RÁPIDO DESDE LA DOCUMENTACIÓN:
          </p>
          <div className="flex flex-wrap gap-2">
            {PRESET_EXAMPLES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePresetSelect(preset.data)}
                className="text-xs px-3.5 py-1.5 rounded-full bg-[#04236B]/70 hover:bg-[#0636A5] border border-white/15 text-slate-200 hover:text-white transition-all text-left flex items-center gap-1.5 cursor-pointer"
              >
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Form + Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: Formulario (Double-Bezel Glass Card) */}
          <div className="lg:col-span-5 rounded-3xl p-3 bg-[#04236B]/60 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <div className="rounded-2xl bg-gradient-to-b from-[#0636A5]/85 to-[#021440]/95 border border-white/10 p-6">
              <h2
                className="text-2xl font-black uppercase text-white tracking-tight mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                <Wand2 className="w-6 h-6 text-[#FFEC01]" />
                PARÁMETROS DEL ASSET
              </h2>

              <form onSubmit={handleGenerate} className="space-y-4 text-xs">
                {/* Asset Type */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                    Tipo de Recurso
                  </label>
                  <select
                    value={formData.assetType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assetType: e.target.value as AssetPromptInput['assetType']
                      })
                    }
                    className="w-full bg-[#021440]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FFEC01] transition-colors"
                  >
                    <option value="rider-commercial-photo">📸 Fotografía Comercial de Rider (R2I)</option>
                    <option value="typography-3d">🔤 Texto Tipográfico 3D Extruido</option>
                    <option value="3d-packaging-fleet">📦 Paquetería / Flota 3D Render</option>
                    <option value="isometric-map-hub">🗺️ Mapa / Hub Isométrico 3D</option>
                    <option value="duotone-icon-set">⚡ Set de Iconos Duotono</option>
                    <option value="custom">🛠️ Personalizado / Otro</option>
                  </select>
                </div>

                {/* Subject and Action */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                    Sujeto y Acción Principal <span className="text-[#FFEC01]">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Ej: Rider joven en scooter transitando frente al Casino de Mar del Plata con caja kraft en baúl..."
                    value={formData.subjectAndAction}
                    onChange={(e) => setFormData({ ...formData, subjectAndAction: e.target.value })}
                    className="w-full bg-[#021440]/90 border border-white/15 rounded-xl p-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FFEC01] transition-colors leading-relaxed"
                  />
                </div>

                {/* Location Context */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                    Ubicación / Contexto en Mar del Plata
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Rambla Casino Central, Chauvín Friuli 1972, Güemes..."
                    value={formData.locationContext}
                    onChange={(e) => setFormData({ ...formData, locationContext: e.target.value })}
                    className="w-full bg-[#021440]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FFEC01] transition-colors"
                  />
                </div>

                {/* Aspect Ratio & Camera */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                      Aspect Ratio
                    </label>
                    <select
                      value={formData.aspectRatio}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          aspectRatio: e.target.value as AssetPromptInput['aspectRatio']
                        })
                      }
                      className="w-full bg-[#021440]/90 border border-white/15 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-[#FFEC01] transition-colors"
                    >
                      <option value="16:9">16:9 (Hero / Banners)</option>
                      <option value="4:3">4:3 (Cards / Bento)</option>
                      <option value="1:1">1:1 (Cuadrado / Badges)</option>
                      <option value="3:2">3:2 (3D Textos / Flota)</option>
                      <option value="4:5">4:5 (Social / Portadas)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                      Archivo Destino
                    </label>
                    <input
                      type="text"
                      placeholder="home-hero.webp"
                      value={formData.targetFile}
                      onChange={(e) => setFormData({ ...formData, targetFile: e.target.value })}
                      className="w-full bg-[#021440]/90 border border-white/15 rounded-xl px-3 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FFEC01] transition-colors"
                    />
                  </div>
                </div>

                {/* UI Location */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                    Componente UI Destino (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: src/components/cotizar/express/ExpressHero.tsx"
                    value={formData.uiLocation}
                    onChange={(e) => setFormData({ ...formData, uiLocation: e.target.value })}
                    className="w-full bg-[#021440]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FFEC01] transition-colors"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-slate-300 font-semibold mb-1 uppercase tracking-wider">
                    Instrucciones Adicionales (Lente, Iluminación)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: Luz dorada de atardecer oceánico, reflejo en asfalto húmedo..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full bg-[#021440]/90 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#FFEC01] transition-colors"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs">
                    {errorMsg}
                  </div>
                )}

                {/* Submit Nested-Pill Button */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{ fontFamily: "'Bebas Neue', cursive" }}
                  className={`group w-full inline-flex items-center justify-between gap-3 rounded-full uppercase tracking-[.05em] font-bold border px-6 py-3 min-h-[50px] transition-all duration-300 active:scale-[.98] cursor-pointer mt-4 ${
                    loading
                      ? 'bg-[#04236B] text-slate-400 border-white/20 cursor-wait'
                      : 'bg-[#FFEC01] text-[#021440] border-[#FFEC01] shadow-[0_0_24px_rgba(255,236,1,0.35)] hover:bg-[#FFF033] hover:shadow-[0_0_40px_rgba(255,236,1,0.55)]'
                  }`}
                >
                  <span className="text-base tracking-wider font-bold">
                    {loading ? 'GENERANDO PROMPT CON GENKIT...' : 'GENERAR PROMPT CON PLANTILLA MAESTRA'}
                  </span>
                  <span className="w-8 h-8 rounded-full flex items-center justify-center bg-[#021440]/15 text-[#021440] group-hover:bg-[#0636A5] group-hover:text-[#FFEC01] group-hover:translate-x-0.5 transition-all duration-200">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Columna Derecha: Resultado & Desglose Estructurado (Double-Bezel Glass Card) */}
          <div className="lg:col-span-7 space-y-6">
            {!generatedResult && !loading && (
              <div className="rounded-3xl p-3 bg-[#04236B]/40 backdrop-blur-md border border-white/10 text-center py-16 flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-2xl bg-[#021440] border border-white/10 flex items-center justify-center text-[#FFEC01] mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3
                  className="text-2xl font-black uppercase text-white tracking-tight mb-2"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  MOTOR R2I LISTO PARA GENERAR
                </h3>
                <p className="text-sm text-slate-300 max-w-md">
                  Elige un ejemplo rápido arriba o completa los campos del formulario para producir un prompt
                  fotográfico calibrado según las 4 referencias de marca de Envíos DosRuedas.
                </p>
              </div>
            )}

            {loading && (
              <div className="rounded-3xl p-3 bg-[#04236B]/60 backdrop-blur-md border border-[#FFEC01]/30 text-center py-16 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#FFEC01] animate-spin mb-4" />
                <h3
                  className="text-2xl font-black uppercase text-white tracking-tight mb-2"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  CALIBRANDO REFERENCIAS CON GENKIT...
                </h3>
                <p className="text-sm text-slate-300 max-w-md">
                  Gemini 2.5 Flash está aplicando la estructura R2I (Sujeto, Entorno, Óptica, Paleta y Restricciones) a
                  tu solicitud.
                </p>
              </div>
            )}

            {generatedResult && (
              <div className="rounded-3xl p-3 bg-[#04236B]/60 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <div className="rounded-2xl bg-gradient-to-b from-[#0636A5]/85 to-[#021440]/95 border border-white/10 p-6 space-y-6">
                  {/* Result Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-[#FFEC01] text-[#021440] text-[10px] font-black tracking-wider">
                          GENERADO CON ÉXITO
                        </span>
                        <span
                          className="text-xs uppercase tracking-widest text-[#FFEC01] font-bold"
                          style={{ fontFamily: "'Bebas Neue', cursive" }}
                        >
                          {generatedResult.parameters.recommendedModel}
                        </span>
                      </div>
                      <h3
                        className="text-2xl font-black uppercase text-white tracking-tight"
                        style={{ fontFamily: "'Anton', sans-serif" }}
                      >
                        {generatedResult.title}
                      </h3>
                    </div>

                    <button
                      onClick={handleCopyPrompt}
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                      className={`inline-flex items-center gap-2 rounded-full uppercase tracking-wider font-bold border px-5 py-2 text-xs transition-all duration-200 cursor-pointer ${
                        copiedPrompt
                          ? 'bg-[#22c55e] text-white border-[#22c55e] shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                          : 'bg-[#FFEC01] text-[#021440] border-[#FFEC01] hover:bg-[#FFF033] shadow-[0_0_20px_rgba(255,236,1,0.3)]'
                      }`}
                    >
                      {copiedPrompt ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          ¡PROMPT COPIADO!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          COPIAR PROMPT
                        </>
                      )}
                    </button>
                  </div>

                  {/* Terminal Box for Final Prompt */}
                  <div className="rounded-xl bg-[#021440]/95 border border-white/10 p-4">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#FFEC01]" />
                        <span style={{ fontFamily: "'Geist Mono', monospace" }}>PROMPT FINAL LISTO PARA IA</span>
                      </div>
                      <span className="text-[#FFEC01]" style={{ fontFamily: "'Geist Mono', monospace" }}>
                        Ratio: {generatedResult.parameters.aspectRatio}
                      </span>
                    </div>

                    <pre
                      className="text-slate-100 text-xs leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap font-mono p-1 select-all"
                      style={{ fontFamily: "'Geist Mono', monospace" }}
                    >
                      <code>{generatedResult.promptText}</code>
                    </pre>
                  </div>

                  {/* 5-Block Breakdown Accordion / Cards */}
                  <div>
                    <h4
                      className="text-sm font-black uppercase text-[#FFEC01] tracking-wider mb-3 flex items-center gap-1.5"
                      style={{ fontFamily: "'Bebas Neue', cursive" }}
                    >
                      <Layers className="w-4 h-4" />
                      DESGLOSE ESTRUCTURADO R2I (PLANTILLA MAESTRA)
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* 1. Subject */}
                      <div className="p-3 rounded-xl bg-[#021440]/70 border border-white/5">
                        <span className="text-[10px] font-bold text-[#FFEC01] uppercase tracking-wider block mb-1">
                          1. Sujeto + Referencias Vinculadas
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {generatedResult.coreStructure.subjectAndReferences}
                        </p>
                      </div>

                      {/* 2. Setting */}
                      <div className="p-3 rounded-xl bg-[#021440]/70 border border-white/5">
                        <span className="text-[10px] font-bold text-[#FFEC01] uppercase tracking-wider block mb-1">
                          2. Entorno & Luz Marplatense
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {generatedResult.coreStructure.settingContext}
                        </p>
                      </div>

                      {/* 3. Style */}
                      <div className="p-3 rounded-xl bg-[#021440]/70 border border-white/5">
                        <span className="text-[10px] font-bold text-[#FFEC01] uppercase tracking-wider block mb-1">
                          3. Óptica, Cámara & Materiales
                        </span>
                        <p className="text-slate-300 leading-relaxed">{generatedResult.coreStructure.styleMedium}</p>
                      </div>

                      {/* 4. Color & Branding */}
                      <div className="p-3 rounded-xl bg-[#021440]/70 border border-white/5">
                        <span className="text-[10px] font-bold text-[#FFEC01] uppercase tracking-wider block mb-1">
                          4. Calibración Cromática (#0636A5 / #FFEC01)
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {generatedResult.coreStructure.colorAndBranding}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SEO & File Metadata Box */}
                  <div className="p-4 rounded-xl bg-[#021440]/60 border border-white/10 space-y-2 text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase">Texto Alternativo (Alt HTML):</span>
                        <p className="text-white font-medium italic">{generatedResult.altTextEs}</p>
                      </div>
                      <button
                        onClick={handleCopyAlt}
                        className="self-start sm:self-center px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[11px] flex items-center gap-1 cursor-pointer"
                      >
                        {copiedAlt ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
                        <span>Copiar Alt</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-white/5 flex flex-wrap gap-4 text-[11px] text-slate-300">
                      <div>
                        <span className="text-slate-400">Archivo recomendado:</span>{' '}
                        <span className="text-[#FFEC01]" style={{ fontFamily: "'Geist Mono', monospace" }}>
                          {generatedResult.parameters.suggestedFilename}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">Resolución:</span>{' '}
                        <span style={{ fontFamily: "'Geist Mono', monospace" }}>
                          {generatedResult.parameters.resolutionTarget}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Brand Compliance Checklist */}
                  <div className="p-3 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-start gap-2.5 text-xs text-slate-200">
                    <ShieldCheck className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#22c55e] block font-bold uppercase tracking-wider text-[10px]">
                        Verificación de Consistencia de Marca
                      </strong>
                      <p className="text-slate-300 leading-relaxed">{generatedResult.brandComplianceNotes}</p>
                    </div>
                  </div>
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
              <p className="text-slate-400">Sincronizado con docs/BRAND-ASSET-PROMPTS.md e IMAGE-PROMPTS.md</p>
            </div>
          </div>

          <div
            className="flex items-center gap-4 text-[11px]"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            <span>BASE MDQ · FRIULI 1972</span>
            <span className="text-[#FFEC01]">●</span>
            <span>MODEL: GEMINI 2.5 FLASH</span>
          </div>
        </div>
      </div>
    </div>
  );
}
