'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Menu, X, BookOpen, GraduationCap } from 'lucide-react';
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

  const handleNext = () => {
    if (currentStep < totalSlides) router.push(`/workshop/${currentStep + 1}`);
  };

  const handlePrevious = () => {
    if (currentStep > 1) router.push(`/workshop/${currentStep - 1}`);
  };

  if (!isMounted) return <div className="min-h-screen bg-[#0B0F19]" />;

  return (
    <div className="flex flex-col h-screen w-full bg-[#0B0F19] text-slate-200 font-sans overflow-hidden">
      
      {/* Floating TOC Button */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-4 right-4 md:top-6 md:right-8 z-40 flex items-center gap-2 px-4 py-2 bg-[#111827]/80 hover:bg-[#1f2937]/90 backdrop-blur-md rounded-full transition-colors border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-slate-300"
      >
        <BookOpen size={16} className="text-blue-400" />
        <span className="hidden sm:inline text-sm font-medium">สารบัญบทเรียน</span>
      </button>

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
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight">{slide.title}</h2>
                  <p className="text-lg text-slate-400">{slide.subtitle}</p>
                </div>

                {/* The Interactive Content */}
                <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-y-auto min-h-0 pb-24">
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
                className="absolute right-0 top-0 bottom-0 w-full md:w-96 bg-[#111827] border-l border-white/10 z-50 flex flex-col shadow-2xl"
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
                            ? "bg-blue-500/20 text-blue-300 border border-blue-500/30" 
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

      {/* Minimal Floating Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#0B0F19]/90 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-40">
        <button 
          onClick={handlePrevious} 
          disabled={currentStep <= 1}
          className="flex items-center gap-1 px-4 py-2.5 rounded-full font-semibold text-sm transition-all disabled:opacity-30 hover:bg-white/10 disabled:hover:bg-transparent text-slate-300"
        >
          <ChevronLeft size={18} /> Back
        </button>
        
        <div className="px-4 py-1 bg-white/5 rounded-full border border-white/5 flex items-center">
          <span className="text-sm font-bold text-slate-300">
            {currentStep} <span className="text-slate-600 mx-1">/</span> {totalSlides}
          </span>
        </div>
        
        <button 
          onClick={handleNext} 
          disabled={currentStep >= totalSlides}
          className="flex items-center gap-1 px-5 py-2.5 rounded-full font-bold text-sm transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] disabled:opacity-30 disabled:shadow-none"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
