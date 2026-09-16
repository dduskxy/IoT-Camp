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

  const progressPercentage = (currentStep / totalSlides) * 100;

  return (
    <div className="flex flex-col h-screen w-full bg-[#0B0F19] text-slate-200 font-sans overflow-hidden">
      
      {/* Top Navigation Bar - Web App Style */}
      <header className="h-16 shrink-0 bg-[#111827]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 md:px-8 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
            <GraduationCap size={24} />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-white tracking-wide">IoT Masterclass</h1>
            <p className="text-xs text-blue-300 font-medium">Interactive Guide</p>
          </div>
        </div>

        {/* Progress Bar (Center) */}
        <div className="hidden md:flex flex-col items-center w-1/3">
          <div className="flex items-center justify-between w-full mb-1">
            <span className="text-xs font-semibold text-slate-400">ความคืบหน้า (Progress)</span>
            <span className="text-xs font-bold text-blue-400">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Hamburger Menu (Mobile) & TOC (Desktop) */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
        >
          <BookOpen size={18} className="text-blue-400" />
          <span className="hidden sm:inline text-sm font-medium">สารบัญบทเรียน</span>
        </button>
      </header>

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
                <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-y-auto min-h-0">
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

      {/* Friendly Bottom Guide Navigation */}
      <div className="h-20 shrink-0 bg-[#111827] border-t border-white/10 px-4 md:px-8 flex items-center justify-between z-30">
        <button 
          onClick={handlePrevious} 
          disabled={currentStep <= 1}
          className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm md:text-base transition-all disabled:opacity-30 hover:bg-white/10 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={20} /> ย้อนกลับ (Back)
        </button>
        
        <button 
          onClick={handleNext} 
          disabled={currentStep >= totalSlides}
          className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm md:text-base transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-30 disabled:shadow-none"
        >
          ขั้นตอนต่อไป (Next) <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
