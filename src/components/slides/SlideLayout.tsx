"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { workshopSlides } from "@/data/workshop";

interface SlideLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

export function SlideLayout({ currentStep, children }: SlideLayoutProps) {
  const router = useRouter();
  const slide = workshopSlides.find((s) => s.id === currentStep);
  const totalSlides = workshopSlides.length;

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
      if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]);

  if (!slide) return null;

  const progressPercentage = (currentStep / totalSlides) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      {/* Top Header */}
      <header className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-neutral-500 hover:text-neutral-900">
              <Home className="w-5 h-5" />
            </Button>
          </Link>
          <div className="h-4 w-px bg-neutral-200"></div>
          <div>
            <h2 className="text-sm font-bold text-neutral-900">IoT CAMP</h2>
            <p className="text-xs text-neutral-500 font-mono">
              Step {currentStep.toString().padStart(2, "0")} / {totalSlides}
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="text-right">
            <h3 className="text-sm font-semibold">{slide.title}</h3>
            <p className="text-xs text-neutral-500">{slide.subtitle}</p>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 bg-neutral-200 w-full shrink-0">
        <div 
          className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10 overflow-hidden relative">
        <div className="w-full max-w-5xl h-full flex flex-col bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          {/* Header of Content */}
          <div className="p-6 border-b border-neutral-100 shrink-0">
            <h1 className="text-2xl md:text-3xl font-bold">{slide.title}</h1>
            <p className="text-neutral-600 mt-1">{slide.subtitle}</p>
          </div>
          
          {/* Dynamic Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <footer className="h-20 border-t border-neutral-200 bg-white flex items-center justify-between px-6 shrink-0">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" /> ย้อนกลับ
        </Button>
        <div className="text-sm text-neutral-400 hidden sm:block">
          ใช้ลูกศรซ้ายขวาบนคีย์บอร์ดเพื่อเปลี่ยนหน้า
        </div>
        <Button
          onClick={handleNext}
          disabled={currentStep === totalSlides}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          หน้าถัดไป <ChevronRight className="w-4 h-4" />
        </Button>
      </footer>
    </div>
  );
}
