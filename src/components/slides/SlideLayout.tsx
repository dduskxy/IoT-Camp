'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Menu, X, Terminal, Cpu, LayoutDashboard, Settings, Activity, Bug, XCircle, AlertTriangle } from 'lucide-react';
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
    if (currentStep < totalSlides) {
      router.push(`/workshop/${currentStep + 1}`);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/workshop/${currentStep - 1}`);
    }
  };

  // Prevent hydration mismatch on load
  if (!isMounted) return <div className="min-h-screen bg-[#0E1117]" />;

  return (
    <div className="flex h-screen w-full bg-[#0E1117] text-slate-300 font-sans overflow-hidden selection:bg-blue-500/30">
      
      {/* Activity Bar (VS Code style thin leftmost bar) */}
      <div className="hidden md:flex w-12 flex-col items-center py-4 bg-[#090B0F] border-r border-white/5 shrink-0 z-20">
        <div className="flex flex-col gap-4 w-full items-center">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center cursor-pointer border border-blue-500/30">
            <LayoutDashboard size={20} />
          </div>
          <div className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-300 flex items-center justify-center cursor-pointer transition-colors">
            <Cpu size={20} />
          </div>
          <div className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-300 flex items-center justify-center cursor-pointer transition-colors">
            <Terminal size={20} />
          </div>
          <div className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-300 flex items-center justify-center cursor-pointer transition-colors">
            <Bug size={20} />
          </div>
        </div>
        <div className="mt-auto mb-2">
          <div className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-300 flex items-center justify-center cursor-pointer transition-colors">
            <Settings size={20} />
          </div>
        </div>
      </div>

      {/* Primary Sidebar (List of files/steps) */}
      <div className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-[#161B22] border-r border-white/5 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:flex
      `}>
        <div className="h-12 flex items-center px-4 border-b border-white/5 justify-between">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">EXPLORER</span>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={16} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
          <div className="px-2 mb-2 flex items-center gap-1">
            <ChevronRight size={14} className="text-slate-500 rotate-90 transition-transform" />
            <span className="text-xs font-bold text-slate-200">IOT_WORKSHOP</span>
          </div>
          <div className="flex flex-col gap-0.5 px-2">
            {workshopSlides.map((s) => (
              <button 
                key={s.id} 
                onClick={() => {
                  router.push(`/workshop/${s.id}`);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-6 py-1.5 rounded text-sm text-left transition-colors ${
                  s.id === currentStep 
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/20" 
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <span className={`text-[10px] w-4 text-center font-mono ${s.id === currentStep ? 'text-blue-400' : 'text-slate-600'}`}>{s.id}</span>
                <span className="truncate">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 inset-x-0 h-12 bg-[#090B0F] border-b border-white/5 z-20 flex items-center px-4 justify-between">
        <button onClick={() => setIsSidebarOpen(true)} className="text-slate-400 hover:text-white">
          <Menu size={20} />
        </button>
        <span className="text-sm font-semibold text-slate-300 truncate px-4">{slide.title}</span>
        <div className="w-5"></div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col w-full h-full pt-12 md:pt-0 relative bg-[#0E1117]">
        
        {/* Editor Tabs */}
        <div className="hidden md:flex h-10 bg-[#090B0F] border-b border-white/5 overflow-x-auto custom-scrollbar">
          <div className="flex items-center px-4 py-2 bg-[#161B22] border-t-2 border-blue-500 text-blue-300 min-w-max border-r border-white/5">
            <span className="text-sm font-medium">{slide.title.replace(/ /g, '_').toLowerCase()}.tsx</span>
            <X size={14} className="ml-2 text-slate-500 hover:text-slate-300 cursor-pointer" />
          </div>
          <div className="flex items-center px-4 py-2 text-slate-500 hover:bg-[#161B22] cursor-pointer min-w-max border-r border-white/5 transition-colors">
            <span className="text-sm">README.md</span>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="hidden md:flex h-8 items-center px-4 bg-[#0E1117] border-b border-white/5 text-xs text-slate-500 gap-1">
          <span>IoT_Workshop</span> <ChevronRight size={12} /> <span>src</span> <ChevronRight size={12} /> <span className="text-slate-300">{slide.title}</span>
        </div>

        {/* Editor Content (The Slide) */}
        <div className="flex-1 overflow-y-auto relative custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex flex-col p-4 md:p-8 max-w-7xl mx-auto"
            >
              {/* Header inside slide for context */}
              <div className="mb-6 md:mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{slide.title}</h1>
                <p className="text-slate-400 mt-2 text-sm md:text-base border-l-2 border-blue-500/50 pl-4">{slide.subtitle}</p>
              </div>
              
              {/* Actual Content */}
              <div className="flex-1">
                {children}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Status Bar */}
      <div className="fixed bottom-0 inset-x-0 h-6 bg-blue-600 text-white flex items-center justify-between px-3 text-[11px] font-medium z-40">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors">
            <Activity size={12} />
            <span>Master</span>
          </div>
          <div className="flex items-center gap-1 hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors">
            <XCircle size={12} /> <span className="mr-1">0</span>
            <AlertTriangle size={12} /> <span>0</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition-colors">
            <Terminal size={12} />
            <span>COM3: Ready</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handlePrevious} 
            disabled={currentStep <= 1}
            className="flex items-center gap-1 hover:bg-white/20 px-2 py-0.5 rounded disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft size={14} /> Prev
          </button>
          <span>Step {currentStep} / {totalSlides}</span>
          <button 
            onClick={handleNext} 
            disabled={currentStep >= totalSlides}
            className="flex items-center gap-1 hover:bg-white/20 px-2 py-0.5 rounded disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
