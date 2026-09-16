import { notFound } from "next/navigation";
import { SlideLayout } from "@/components/slides/SlideLayout";
import { workshopSlides } from "@/data/workshop";
import { WhatIsIoTSlide } from "@/components/slides/WhatIsIoTSlide";

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
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 max-w-2xl mx-auto">
            <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase">
              Welcome to the Camp
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              เตรียมพร้อมสู่โลกของ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Internet of Things</span>
            </h2>
            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 w-full text-left">
              <h3 className="text-lg font-bold text-slate-800 mb-4">สิ่งที่เราจะได้เรียนรู้ในวันนี้:</h3>
              <ul className="space-y-4">
                {[
                  "IoT คืออะไร ทำงานอย่างไร",
                  "ทำความรู้จักกับบอร์ด Arduino และโมดูลไร้สาย",
                  "จำลองการต่อวงจรอย่างปลอดภัย",
                  "ส่งข้อมูลไร้สายหากันระหว่างสองบอร์ด"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-slate-400 font-medium pt-4">คลิกปุ่มลูกศรด้านล่าง หรือปัดหน้าจอเพื่อเริ่มเนื้อหาแรก</p>
          </div>
        );
      case 2:
        return <WhatIsIoTSlide />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-4 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
              <span className="text-2xl">🚧</span>
            </div>
            <h2 className="text-xl font-bold text-slate-700">เนื้อหานี้กำลังอยู่ระหว่างการพัฒนา</h2>
            <p className="text-slate-500">กรุณารอการอัปเดตในเร็วๆ นี้</p>
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
