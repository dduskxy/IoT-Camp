import { notFound } from "next/navigation";
import { SlideLayout } from "@/components/slides/SlideLayout";
import { workshopSlides } from "@/data/workshop";

// Slide Components
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
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-10 max-w-3xl mx-auto pt-10">
            <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-6 py-2 rounded-full text-xs font-black tracking-[0.2em] uppercase">
              Welcome to the Camp
            </div>
            
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
              เตรียมพร้อมสู่โลกของ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Internet of Things
              </span>
            </h2>
            
            <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 w-full text-left shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full"></div>
              
              <h3 className="text-xl font-bold text-white mb-6 relative z-10">สิ่งที่เราจะได้เรียนรู้ในวันนี้:</h3>
              <ul className="space-y-5 relative z-10">
                {[
                  "IoT คืออะไร ทำงานอย่างไร",
                  "ทำความรู้จักกับบอร์ด Arduino และโมดูลไร้สาย",
                  "จำลองการต่อวงจรอย่างปลอดภัย",
                  "ส่งข้อมูลไร้สายหากันระหว่างสองบอร์ด"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-300 font-medium text-lg">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center text-sm font-bold border border-white/10">
                      {i + 1}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="text-slate-500 font-medium pt-4 tracking-wide text-sm">คลิกปุ่มลูกศรด้านล่าง หรือใช้คีย์บอร์ดเพื่อเริ่มเนื้อหาแรก</p>
          </div>
        );
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
    <SlideLayout currentStep={stepId}>
      {renderSlideContent()}
    </SlideLayout>
  );
}
