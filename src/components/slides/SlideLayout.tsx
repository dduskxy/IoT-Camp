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

  if (!slide) return null;

  const progressPercentage = (currentStep / totalSlides) * 100;

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      {/* Sleek Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        {/* Progress Bar (Ultra thin at the top) */}
        <div className="absolute top-0 left-0 h-[3px] bg-blue-100 w-full z-50">
          <motion.div 
            className="h-full bg-blue-600 rounded-r-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        <div className="flex items-center justify-between px-4 h-14 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <Link href="/">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                <Home className="w-4 h-4" />
              </div>
            </Link>
            <div className="hidden sm:block">
              <span className="text-sm font-semibold tracking-tight">IoT Smart Automation</span>
            </div>
          </div>

          <div className="text-center absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
            <span className="text-xs font-bold text-blue-600 tracking-widest uppercase mb-0.5">
              STEP {currentStep} / {totalSlides}
            </span>
          </div>

          <div>
            <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile/Desktop Sidebar Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-14 bottom-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-2xl md:absolute md:w-80 md:right-4 md:left-auto md:bottom-auto md:rounded-2xl md:border md:mt-2"
          >
            <div className="p-4 overflow-y-auto h-full max-h-[70vh]">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Table of Contents</h3>
              <div className="flex flex-col gap-1">
                {workshopSlides.map((s) => (
                  <Link 
                    key={s.id} 
                    href={`/workshop/${s.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`px-3 py-3 rounded-xl flex items-center justify-between text-sm transition-all ${
                      s.id === currentStep 
                        ? "bg-blue-50 text-blue-700 font-semibold" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${s.id === currentStep ? 'bg-blue-200 text-blue-800' : 'bg-slate-100 text-slate-500'}`}>
                        {s.id}
                      </span>
                      {s.title}
                    </span>
                    {s.id < currentStep && <span className="text-green-500 text-xs font-bold">✓</span>}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full max-w-5xl mx-auto p-4 md:p-8 relative">
        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full flex-1 flex flex-col bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden"
        >
          {/* Content Header */}
          <div className="px-6 pt-8 pb-4 md:px-10 md:pt-10 md:pb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">{slide.title}</h1>
            <p className="text-lg text-slate-500 mt-2 font-medium">{slide.subtitle}</p>
          </div>
          
          {/* Actual Slide Content */}
          <div className="flex-1 px-6 pb-8 md:px-10 md:pb-10 overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </main>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center pointer-events-none z-30 px-4">
        <div className="bg-slate-900/90 backdrop-blur-md rounded-full p-1.5 flex items-center gap-2 pointer-events-auto shadow-2xl border border-white/10">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="rounded-full text-white hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent h-12 w-12"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="px-4 text-white font-medium text-sm">
            {currentStep} / {totalSlides}
          </div>

          <Button
            onClick={handleNext}
            disabled={currentStep === totalSlides}
            className="rounded-full bg-blue-600 hover:bg-blue-500 text-white h-12 w-12 p-0 shadow-lg"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Padding for bottom nav */}
      <div className="h-24 shrink-0"></div>
    </div>
  );
}
