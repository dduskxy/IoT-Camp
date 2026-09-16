"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { workshopSlides } from "@/data/workshop";
import { motion, AnimatePresence } from "framer-motion";

interface SlideLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

export function SlideLayout({ currentStep, children }: SlideLayoutProps) {
  const router = useRouter();
  const slide = workshopSlides.find((s) => s.id === currentStep);
  const totalSlides = workshopSlides.length;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const handlePrevious = () => {
    if (currentStep > 1) {
      router.push(`/workshop/${currentStep - 1}`);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSlides) {
      router.push(`/workshop/${currentStep + 1}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  // Auto-hide navigation logic
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const wakeUpNav = () => {
      setIsNavVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsNavVisible(false);
      }, 2500); // Hide after 2.5 seconds of inactivity
    };

    // Listeners for waking up the nav
    window.addEventListener("mousemove", wakeUpNav);
    window.addEventListener("touchstart", wakeUpNav);
    window.addEventListener("scroll", wakeUpNav, { passive: true });
    window.addEventListener("click", wakeUpNav);

    // Initial timeout
    timeoutId = setTimeout(() => {
      setIsNavVisible(false);
    }, 2500);

    return () => {
      window.removeEventListener("mousemove", wakeUpNav);
      window.removeEventListener("touchstart", wakeUpNav);
      window.removeEventListener("scroll", wakeUpNav);
      window.removeEventListener("click", wakeUpNav);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!slide) return null;

  const progressPercentage = (currentStep / totalSlides) * 100;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#030303] text-white font-sans selection:bg-blue-500/30 overflow-hidden relative">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[100px]"
        />
      </div>

      {/* Sleek Top Navigation */}
      <header className="sticky top-0 z-50 bg-[#030303]/70 backdrop-blur-xl border-b border-white/5">
        {/* Progress Bar (Ultra thin at the top) */}
        <div className="absolute top-0 left-0 h-[2px] bg-white/5 w-full z-50">
          <motion.div 
            className="h-full bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        <div className="flex items-center justify-between px-4 h-16 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <Link href="/">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-300">
                <Home className="w-4 h-4" />
              </div>
            </Link>
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-tight text-white/90">IoT Smart Automation</span>
            </div>
          </div>

          <div className="text-center absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <motion.span 
              key={currentStep}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black text-blue-400 tracking-[0.2em] uppercase mb-1"
            >
              STEP {currentStep} / {totalSlides}
            </motion.span>
          </div>

          <div>
            <Button variant="ghost" size="icon" className="hover:bg-white/10 text-slate-300 hover:text-white rounded-full w-10 h-10 cursor-pointer pointer-events-auto" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile/Desktop Sidebar Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-[#030303]/95 backdrop-blur-2xl border-t border-white/5 md:absolute md:w-80 md:right-4 md:left-auto md:bottom-auto md:rounded-3xl md:border md:mt-4 shadow-2xl"
          >
            <div className="p-6 overflow-y-auto h-full max-h-[75vh] custom-scrollbar">
              <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 px-2">Table of Contents</h3>
              <div className="flex flex-col gap-2">
                {workshopSlides.map((s) => (
                  <Link 
                    key={s.id} 
                    href={`/workshop/${s.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3.5 rounded-2xl flex items-center justify-between text-sm transition-all duration-300 ${
                      s.id === currentStep 
                        ? "bg-blue-600/10 border border-blue-500/20 text-blue-400 font-semibold" 
                        : "border border-transparent text-slate-400 hover:bg-white/5 hover:text-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${s.id === currentStep ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-white/5 text-slate-500'}`}>
                        {s.id}
                      </span>
                      {s.title}
                    </span>
                    {s.id < currentStep && <span className="text-emerald-500 text-xs font-bold">✓</span>}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full max-w-6xl mx-auto p-4 md:p-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex-1 flex flex-col bg-white/5 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden relative"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>

            {/* Content Header */}
            <div className="px-8 pt-10 pb-6 md:px-12 md:pt-12 md:pb-8 relative z-10 border-b border-white/5">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-5xl font-black tracking-tight text-white"
              >
                {slide.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-400 mt-3 font-medium"
              >
                {slide.subtitle}
              </motion.p>
            </div>
            
            {/* Actual Slide Content */}
            <div className="flex-1 px-8 pb-10 md:px-12 md:pb-12 overflow-y-auto relative z-10 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Bottom Navigation (Auto-hides) */}
      <div 
        className="fixed bottom-8 inset-x-0 flex justify-center pointer-events-none z-30 px-4"
        onMouseEnter={() => setIsNavVisible(true)}
      >
        <AnimatePresence>
          {isNavVisible && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#030303]/80 backdrop-blur-2xl rounded-full p-2 flex items-center gap-3 pointer-events-auto shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="rounded-full text-slate-400 hover:bg-white/10 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent h-14 w-14 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              
              <div className="px-4 text-slate-300 font-bold text-sm tracking-widest flex items-center gap-2">
                <span className="text-white">{currentStep}</span>
                <span className="text-slate-600">/</span>
                <span>{totalSlides}</span>
              </div>

              <Button
                onClick={handleNext}
                disabled={currentStep === totalSlides}
                className="rounded-full bg-white text-black hover:bg-slate-200 hover:scale-105 active:scale-95 h-14 w-14 p-0 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 border-none cursor-pointer"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Padding for bottom nav */}
      <div className="h-12 shrink-0"></div>
    </div>
  );
}
