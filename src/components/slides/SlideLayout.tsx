'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BookOpen, X } from 'lucide-react';
import { workshopSlides } from '@/data/workshop';

export function SlideLayout({ 
  children, 
  currentStep,
  totalSlides 
}: { 
  children: React.ReactNode;
  currentStep: number;
  totalSlides: number;
}) {
  const router = useRouter();
  const slide = workshopSlides.find(s => s.id === currentStep) || workshopSlides[0];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return <div className="min-h-screen bg-[#030303] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(255,255,255,0))]" />;

  return (
    <div className="flex flex-col h-screen w-full bg-[#030303] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(255,255,255,0))] text-slate-200 font-sans overflow-hidden">
      
            {/* Floating Top Right Menu */}
      <div className="fixed top-4 right-4 md:top-6 md:right-8 z-40 flex items-center gap-2">
        <a 
          href="/docs/present.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 backdrop-blur-md rounded-full transition-colors border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.3)] text-purple-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
          <span className="hidden sm:inline text-sm font-medium">สไลด์ประกอบ</span>
        </a>

        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full transition-colors border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-slate-300"
        >
          <BookOpen size={16} className="text-indigo-400" />
          <span className="hidden sm:inline text-sm font-medium">สารบัญ</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Main Guide View */}
        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex-1 w-full px-4 py-4 md:px-8 md:py-6 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col h-full"
              >
                {/* Clean, Readable Header */}
                <div className="mb-4 md:mb-6 text-center md:text-left shrink-0">
                  <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    {slide.title}
                  </h2>
                  <div className="inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg shadow-lg">
                    <p className="text-sm md:text-base text-blue-200 font-medium tracking-wide">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>

                {/* The Interactive Content */}
                <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-y-auto min-h-0 flex flex-col">
                  {children}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Sidebar Navigation Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
              />
              {/* Sidebar */}
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute right-0 top-0 bottom-0 w-full md:w-96 bg-[#080808]/95 backdrop-blur-2xl border-l border-white/10 z-50 flex flex-col shadow-2xl"
              >
                <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 shrink-0">
                  <h3 className="font-bold text-lg text-white">สารบัญเนื้อหา (Menu)</h3>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <div className="space-y-2">
                    {workshopSlides.map((s) => (
                      <button 
                        key={s.id} 
                        onClick={() => {
                          router.push(`/workshop/${s.id}`);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all ${
                          s.id === currentStep 
                            ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]" 
                            : "bg-white/5 text-slate-300 border border-transparent hover:bg-white/10"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${s.id === currentStep ? 'bg-blue-500 text-white' : 'bg-slate-700'}`}>
                          {s.id}
                        </div>
                        <span className="font-medium">{s.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

