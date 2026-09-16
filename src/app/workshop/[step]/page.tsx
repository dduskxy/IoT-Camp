import { notFound } from "next/navigation";
import { SlideLayout } from "@/components/slides/SlideLayout";
import { workshopSlides } from "@/data/workshop";

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
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <h2 className="text-3xl font-bold text-blue-600">IoT Smart Automation Camp</h2>
            <ul className="text-lg text-neutral-600 space-y-4 text-left inline-block">
              <li>• IoT คืออะไร</li>
              <li>• เราจะสร้างระบบแบบไหน</li>
              <li>• วันนี้จะเรียนรู้จากของจริง + การจำลอง</li>
              <li>• เส้นทางการเรียนรู้</li>
            </ul>
            <p className="pt-8 text-neutral-500">คลิก "หน้าถัดไป" หรือกดลูกศรขวาเพื่อเริ่มกันเลย!</p>
          </div>
        );
      case 2:
        return <div className="p-8 text-center text-neutral-500">กำลังโหลดเนื้อหา: What is IoT...</div>;
      default:
        return <div className="p-8 text-center text-neutral-500">เนื้อหาสำหรับหน้านี้กำลังอยู่ระหว่างการพัฒนา</div>;
    }
  };

  return (
    <SlideLayout currentStep={stepId}>
      {renderSlideContent()}
    </SlideLayout>
  );
}
