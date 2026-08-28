'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Package,
  Zap,
  Store,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Copy,
  ArrowLeft,
  Sparkles,
  Layers,
  Terminal,
  Activity
} from 'lucide-react';

interface PromptItem {
  id: number;
  badge: string;
  category: string;
  titulo: string;
  descripcion: string;
  icono: React.ComponentType<{ className?: string }>;
  promptText: string;
  aspectRatio: string;
  engine: string;
  colorGlow: string;
}

const promptsData: PromptItem[] = [
  {
    id: 1,
    badge: 'PORTADA / 3PL',
    category: 'Infraestructura',
    titulo: 'Hub Logístico B2B',
    descripcion: 'Generación de fondo para portada de propuesta y operaciones 3PL',
    icono: Package,
    aspectRatio: '4:5',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#0950F6]/25 to-transparent',
    promptText:
      'Subject: Abstract background showing a clean, well-organized regional e-commerce fulfillment warehouse. Medium-sized scale, relatable for local businesses. Shelves filled with perfectly aligned cardboard boxes. Aesthetics: Professional 3PL operations, sleek, dark, and highly reliable. Deep navy blue base (#060B19) with subtle, non-intrusive electric blue (#2563eb) and amber-yellow (#fbc107) ambient lighting. Photography: Shot on 50mm lens, moody exposure. Shallow depth of field (bokeh). 8k, photorealistic. Layouts: Center composition, ample negative space. --ar 4:5 --style raw --v 6.0'
  },
  {
    id: 2,
    badge: 'SLI / SLA 24H',
    category: 'Velocidad',
    titulo: 'Velocidad Express',
    descripcion: 'Tomas cinemáticas de ruteo dinámico urbano en Mar del Plata',
    icono: Zap,
    aspectRatio: '4:5',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/20 to-transparent',
    promptText:
      'Subject: A cinematic, high-speed tracking shot of a modern urban street at dusk. Heavy motion blur on the background city lights. Subtle amber yellow (#fbc107) streetlights reflecting heavily on wet asphalt. Aesthetics: Extreme speed, certainty, B2B logistics. Dark cinematic mood with an electric blue (#2563eb) neon glow cutting through the scene. 8k resolution. Layouts: Ample negative space at the top for text overlays. --ar 4:5 --style raw --v 6.0'
  },
  {
    id: 3,
    badge: 'RETAIL & PICKUP',
    category: 'Comercios',
    titulo: 'Modalidad Drop-Off',
    descripcion: 'Puntos comerciales de retiro y entrega ágil en mostrador',
    icono: Store,
    aspectRatio: '4:5',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#0950F6]/25 to-transparent',
    promptText:
      'Subject: A sleek, unmarked cardboard E-commerce delivery box resting on a clean counter of a modern local retail store. Aesthetics: Professional retail logistics, accessible but sophisticated. Subtle electric blue (#2563eb) and amber yellow (#fbc107) accent lighting reflecting softly on the surfaces. Photography: Macro commercial product photography, shallow depth of field (bokeh background). Layouts: Left-aligned composition, leaving the right side slightly out of focus and clean for text overlays. --ar 4:5 --style raw --v 6.0'
  },
  {
    id: 4,
    badge: 'MERCADOLIBRE FLEX',
    category: 'Certificación',
    titulo: 'Reputación Flex',
    descripcion: 'Envíos en el día garantizando termómetro y reputación verde',
    icono: ShieldCheck,
    aspectRatio: '4:5',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#22c55e]/20 to-transparent',
    promptText:
      'Subject: A clean, unmarked cardboard e-commerce delivery box resting on a modern, dark metallic surface. Aesthetics: Corporate logistics, highly professional. Color palette is deeply dark, dominated by navy blue (#060B19) and black. Very subtle ambient lighting with a hint of vibrant green (#22c55e) reflecting off the edge of the box to symbolize \'green seller reputation\' and speed. Photography: Macro, extremely shallow depth of field. 8k, photorealistic. --ar 4:5 --style raw --v 6.0'
  },
  {
    id: 5,
    badge: 'FINTECH & CONTROL',
    category: 'Métricas B2B',
    titulo: 'Dashboard & Cuentas',
    descripcion: 'Gestión financiera de liquidaciones, contra-reembolso y SLA',
    icono: TrendingUp,
    aspectRatio: '4:5',
    engine: 'Midjourney v6.0',
    colorGlow: 'from-[#FFEC01]/20 to-transparent',
    promptText:
      'Subject: A close-up of a modern digital tablet displaying abstract upward growth charts, held by a professional in a smart-casual dark jacket. Aesthetics: Corporate partnership, trust, local business scalability. Dark, moody, premium color palette featuring deep navy blues and subtle electric blue (#2563eb) accents. Photography: Corporate editorial style, sharp focus on the tablet screen, soft blurred background. 8k, photorealistic. --ar 4:5 --style raw --v 6.0'
  }
];

export default function PromptsPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ['todos', 'Infraestructura', 'Velocidad', 'Comercios', 'Certificación', 'Métricas B2B'];

  const filteredPrompts =
    activeFilter === 'todos'
      ? promptsData
      : promptsData.filter((p) => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div
      className="min-h-screen text-white relative overflow-hidden selection:bg-[#FFEC01] selection:text-[#021440]"
      style={{
        fontFamily: "'Outfit', sans-serif",
        background: 'linear-gradient(135deg, #021440 0%, #04236B 35%, #0636A5 75%, #00277C 100%)'
      }}
    >
      {/* 1. Procedural Background Grid & Route Curves (DESIGN.md Token #3) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden="true">
          <pattern id="hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="2,6" />
            <circle cx="0" cy="0" r="1.5" fill="#FFEC01" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Radial Orbs (DESIGN.md Gradient Spec) */}
        <div
          className="absolute -top-32 left-1/4 w-[750px] h-[550px] rounded-full blur-[140px] opacity-70 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,236,1,0.22) 0%, rgba(255,236,1,0.06) 45%, transparent 70%)'
          }}
        />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-[#0950F6]/25 blur-[160px] pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-[500px] h-[500px] rounded-full bg-[#021440] blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#04236B]/60 hover:bg-[#0636A5] border border-white/15 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Volver al Command Center</span>
          </Link>

          {/* Status Indicator Badge (DESIGN.md Token #4: Live Dispatch Indicator) */}
          <div className="flex items-center gap-2 bg-[#04236B]/70 border border-white/15 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFEC01] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FFEC01]"></span>
            </span>
            <span
              className="text-xs uppercase tracking-widest text-[#FFEC01] font-bold"
              style={{ fontFamily: "'Bebas Neue', cursive" }}
            >
              Motor Generativo · Activo
            </span>
          </div>
        </div>

        {/* Header Section with Anton & Bebas Neue */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFEC01]/10 text-[#FFEC01] border border-[#FFEC01]/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              SISTEMA VISUAL IA v6.0
            </span>
            <span
              className="text-xs text-slate-300 uppercase tracking-widest hidden sm:inline"
              style={{ fontFamily: "'Geist Mono', monospace" }}
            >
              5 ASSETS OPTIMIZADOS
            </span>
          </div>

          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95] mb-4"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            PROMPTS <span className="text-[#FFEC01]">ENVÍOS DOSRUEDAS</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl font-normal leading-relaxed">
            Directivas fotográficas de alta fidelidad para generación de fondos corporativos, portadas y assets de
            comunicación para la logística de última milla en Mar del Plata.
          </p>

          {/* Category Filter Pills (Subheading font) */}
          <div className="flex flex-wrap gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{ fontFamily: "'Bebas Neue', cursive" }}
                className={`text-sm uppercase tracking-wider px-4 py-1.5 rounded-full border transition-all duration-200 ${
                  activeFilter.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#FFEC01] text-[#021440] font-bold border-[#FFEC01] shadow-[0_0_20px_rgba(255,236,1,0.35)]'
                    : 'bg-[#04236B]/40 hover:bg-[#0636A5]/60 text-slate-200 border-white/10 hover:border-white/25'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Cards Grid using Double-Bezel Card Pattern (DESIGN.md Token #2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPrompts.map((prompt) => {
            const Icon = prompt.icono;
            const isCopied = copiedId === prompt.id;

            return (
              <div
                key={prompt.id}
                className="group relative rounded-3xl p-3 bg-[#04236B]/60 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:border-[#FFEC01]/40 transition-all duration-300 flex flex-col"
              >
                {/* Inner Bezel Container */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0636A5]/85 to-[#021440]/95 border border-white/10 p-5 sm:p-6 flex flex-col flex-1">
                  {/* Subtle Top Glow */}
                  <div
                    className={`absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br ${prompt.colorGlow} blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500`}
                  />

                  {/* Header of Card */}
                  <div className="flex items-start justify-between gap-3 mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#021440] border border-[#FFEC01]/30 flex items-center justify-center text-[#FFEC01] shadow-inner group-hover:scale-105 group-hover:border-[#FFEC01] transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span
                          className="text-[11px] font-bold uppercase tracking-widest text-[#FFEC01]"
                          style={{ fontFamily: "'Bebas Neue', cursive" }}
                        >
                          {prompt.badge}
                        </span>
                        <h3
                          className="text-xl font-black uppercase text-white tracking-tight leading-tight"
                          style={{ fontFamily: "'Anton', sans-serif" }}
                        >
                          {prompt.titulo}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 min-h-[32px] relative z-10">
                    {prompt.descripcion}
                  </p>

                  {/* Metadata Chips */}
                  <div
                    className="flex items-center gap-2 mb-3 text-[11px] text-slate-300 relative z-10"
                    style={{ fontFamily: "'Geist Mono', monospace" }}
                  >
                    <span className="px-2 py-0.5 rounded bg-[#021440]/80 border border-white/10">
                      AR: {prompt.aspectRatio}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#021440]/80 border border-white/10">
                      {prompt.engine}
                    </span>
                  </div>

                  {/* Terminal Box for Prompt Text */}
                  <div className="relative flex-1 mb-5 rounded-xl bg-[#021440]/90 border border-white/10 p-3.5 flex flex-col group/terminal">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-[#FFEC01]" />
                        <span style={{ fontFamily: "'Geist Mono', monospace" }}>PROMPT CODE</span>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Layers className="w-3 h-3" /> Raw
                      </span>
                    </div>

                    <pre
                      className="flex-1 text-slate-200 text-xs leading-relaxed max-h-44 overflow-y-auto whitespace-pre-wrap pr-1 scrollbar-thin scrollbar-thumb-white/20"
                      style={{ fontFamily: "'Geist Mono', monospace" }}
                    >
                      <code>{prompt.promptText}</code>
                    </pre>
                  </div>

                  {/* Nested-Pill CTA Button (DESIGN.md Token #1) */}
                  <button
                    onClick={() => handleCopy(prompt.id, prompt.promptText)}
                    style={{ fontFamily: "'Bebas Neue', cursive" }}
                    className={`group/btn w-full inline-flex items-center justify-between gap-3 rounded-full uppercase tracking-[.05em] font-bold border px-5 py-2.5 min-h-[46px] transition-all duration-300 active:scale-[.98] cursor-pointer ${
                      isCopied
                        ? 'bg-[#22c55e] text-white border-[#22c55e] shadow-[0_0_24px_rgba(34,197,94,0.45)]'
                        : 'bg-[#FFEC01] text-[#021440] border-[#FFEC01] shadow-[0_0_24px_rgba(255,236,1,0.35)] hover:bg-[#FFF033] hover:shadow-[0_0_40px_rgba(255,236,1,0.55)]'
                    }`}
                  >
                    <span className="text-sm tracking-wider font-bold">
                      {isCopied ? '¡PROMPT COPIADO AL PORTAPAPELES!' : 'COPIAR PROMPT'}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                        isCopied
                          ? 'bg-white/20 text-white'
                          : 'bg-[#021440]/15 text-[#021440] group-hover/btn:bg-[#0636A5] group-hover/btn:text-[#FFEC01] group-hover/btn:translate-x-0.5'
                      }`}
                    >
                      {isCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Operational Footer Card */}
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
                ENVÍOS DOSRUEDAS · MOTOR CREATIVO & LOGÍSTICA
              </p>
              <p className="text-slate-400">Diseñado con los tokens y estética de DESIGN.md</p>
            </div>
          </div>

          <div
            className="flex items-center gap-4 text-[11px]"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            <span>HUB FRIULI 1972 · MDQ</span>
            <span className="text-[#FFEC01]">●</span>
            <span>DISPATCH 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
}

