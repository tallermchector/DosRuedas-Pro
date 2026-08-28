import React from 'react';
import Link from 'next/link';
import { FileText, LayoutGrid, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8 font-body relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#2563eb] blur-[150px] rounded-full mix-blend-screen opacity-20" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-slate-700 blur-[150px] rounded-full mix-blend-screen opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col gap-12">
        <header className="border-b border-white/10 pb-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black font-headline tracking-tighter text-[#2563eb] mb-3 uppercase drop-shadow-lg">
            ENVÍOS DOSRUEDAS | COMMAND CENTER
          </h1>
          <p className="text-lg md:text-xl text-slate-400 font-body uppercase tracking-wider">
            Panel de control y herramientas de desarrollo
          </p>
        </header>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <Link href="/exportacion" className="group block h-full">
              <div className="h-full flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#2563eb] hover:bg-white/10 transition-all duration-300 shadow-xl group-hover:shadow-[#2563eb]/20">
                <div className="p-4 bg-black/40 rounded-full mb-6 group-hover:bg-[#2563eb]/20 transition-colors">
                  <FileText className="w-10 h-10 text-[#fbc107]" />
                </div>
                <h2 className="text-xl font-bold font-headline uppercase mb-3 text-white">Exportación PDF</h2>
                <p className="text-slate-400 font-body text-xs">Generador del Pitch Deck comercial.</p>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/todas" className="group block h-full">
              <div className="h-full flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#2563eb] hover:bg-white/10 transition-all duration-300 shadow-xl group-hover:shadow-[#2563eb]/20">
                <div className="p-4 bg-black/40 rounded-full mb-6 group-hover:bg-[#2563eb]/20 transition-colors">
                  <LayoutGrid className="w-10 h-10 text-[#fbc107]" />
                </div>
                <h2 className="text-xl font-bold font-headline uppercase mb-3 text-white">Auditoría A/B</h2>
                <p className="text-slate-400 font-body text-xs">Comparador visual de versiones (V1 vs V2).</p>
              </div>
            </Link>

            {/* Card 3 */}
            <Link href="/prompts" className="group block h-full">
              <div className="h-full flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-[#2563eb] hover:bg-white/10 transition-all duration-300 shadow-xl group-hover:shadow-[#2563eb]/20">
                <div className="p-4 bg-black/40 rounded-full mb-6 group-hover:bg-[#2563eb]/20 transition-colors">
                  <Sparkles className="w-10 h-10 text-[#fbc107]" />
                </div>
                <h2 className="text-xl font-bold font-headline uppercase mb-3 text-white">Catálogo T1-T23</h2>
                <p className="text-slate-400 font-body text-xs">Biblioteca estática de 23 assets 3D.</p>
              </div>
            </Link>

            {/* Card 4 */}
            <Link href="/generador-prompts" className="group block h-full">
              <div className="h-full flex flex-col items-center text-center p-8 rounded-2xl bg-[#04236B]/60 backdrop-blur-md border border-[#FFEC01]/30 hover:border-[#FFEC01] hover:bg-[#0636A5]/50 transition-all duration-300 shadow-xl group-hover:shadow-[#FFEC01]/25">
                <div className="p-4 bg-[#021440] border border-[#FFEC01]/30 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-10 h-10 text-[#FFEC01]" />
                </div>
                <h2 className="text-xl font-bold font-headline uppercase mb-3 text-[#FFEC01]">Genkit R2I Engine</h2>
                <p className="text-slate-300 font-body text-xs">Generador dinámico con Plantilla Maestra.</p>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
