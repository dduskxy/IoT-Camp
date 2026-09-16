import { notFound } from "next/navigation";
import { SlideLayout } from "@/components/slides/SlideLayout";
import { workshopSlides } from "@/data/workshop";

// Slide Components
import { WelcomeSlide } from "@/components/slides/WelcomeSlide";
import { WhatIsIoTSlide } from "@/components/slides/WhatIsIoTSlide";
import { HardwareSlide } from "@/components/slides/HardwareSlide";
import { NRF24Slide } from "@/components/slides/NRF24Slide";
import { WiringSingleSlide } from "@/components/slides/WiringSingleSlide";
import { TxVsRxSlide } from "@/components/slides/TxVsRxSlide";
import { WiringDualSlide } from "@/components/slides/WiringDualSlide";
import { CodeLabTxSlide } from "@/components/slides/CodeLabTxSlide";
import { CodeLabRxSlide } from "@/components/slides/CodeLabRxSlide";
import { DualSerialSlide } from "@/components/slides/DualSerialSlide";
import { DataSimulationSlide } from "@/components/slides/DataSimulationSlide";
import { MissionsSlide } from "@/components/slides/MissionsSlide";
import { TroubleshootingSlide } from "@/components/slides/TroubleshootingSlide";
import { FinalChallengeSlide } from "@/components/slides/FinalChallengeSlide";

export function generateStaticParams() {
  return workshopSlides.map((slide) => ({
    step: slide.id.toString(),
  }));
}

export default async function WorkshopPage({ params }: { params: Promise<{ step: string }> }) {
  const resolvedParams = await params;
  const stepId = parseInt(resolvedParams.step, 10);
  
  if (isNaN(stepId) || stepId < 1 || stepId > workshopSlides.length) {
    notFound();
  }

  const renderSlideContent = () => {
    switch (stepId) {
      case 1:
          return <WelcomeSlide />;
        case 2:
        return <WhatIsIoTSlide />;
      case 3:
        return <HardwareSlide />;
      case 4:
        return <NRF24Slide />;
      case 5:
        return <WiringSingleSlide />;
      case 6:
        return <TxVsRxSlide />;
      case 7:
        return <WiringDualSlide />;
      case 8:
        return <CodeLabTxSlide />;
      case 9:
        return <CodeLabRxSlide />;
      case 10:
        return <DualSerialSlide />;
      case 11:
        return <DataSimulationSlide />;
      case 12:
        return <MissionsSlide />;
      case 13:
        return <TroubleshootingSlide />;
      case 14:
        return <FinalChallengeSlide />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-6 text-center pt-20">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-slate-500 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)]">
              <span className="text-4xl">🚧</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">เนื้อหานี้กำลังอยู่ระหว่างการพัฒนา</h2>
              <p className="text-slate-400 font-medium">ส่วนถัดไปจะเปิดให้ใช้งานในเร็วๆ นี้</p>
            </div>
          </div>
        );
    }
  };

  return (
    <SlideLayout currentStep={stepId} totalSlides={workshopSlides.length}>
      {renderSlideContent()}
    </SlideLayout>
  );
}
