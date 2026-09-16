import Link from "next/link";
import { ArrowRight, Cpu, Radio, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Header Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <div className="relative bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
              <Radio className="w-16 h-16 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-950">
            IoT Smart Automation Camp
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            เรียนรู้ระบบ IoT ตั้งแต่พื้นฐาน เริ่มต้นจากการเชื่อมต่อฮาร์ดแวร์ การเขียนโค้ด
            ไปจนถึงการส่งข้อมูลไร้สายแบบง่ายๆ ด้วย NRF24L01 และ Arduino
          </p>
        </div>

        {/* Features List */}
        <div className="grid md:grid-cols-3 gap-6 pt-8 pb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
            <div className="bg-blue-50 p-3 rounded-lg mb-4 text-blue-600">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">รู้จักฮาร์ดแวร์</h3>
            <p className="text-sm text-neutral-500">
              ทำความรู้จักบอร์ด Arduino และโมดูลส่งสัญญาณ NRF24L01
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
            <div className="bg-emerald-50 p-3 rounded-lg mb-4 text-emerald-600">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">จำลองการต่อวงจร</h3>
            <p className="text-sm text-neutral-500">
              ฝึกต่อวงจรในระบบจำลองก่อนลงมือทำจริง พร้อมคำแนะนำเมื่อต่อผิด
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100 flex flex-col items-center text-center">
            <div className="bg-purple-50 p-3 rounded-lg mb-4 text-purple-600">
              <Radio className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-2">โค้ดและส่งข้อมูล</h3>
            <p className="text-sm text-neutral-500">
              เรียนรู้โค้ดฝั่งส่ง (TX) และฝั่งรับ (RX) แล้วส่งข้อมูลหากันจริงๆ
            </p>
          </div>
        </div>

        {/* CTA */}
        <div>
          <Link href="/workshop/1">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200">
              เริ่มกิจกรรมแคมป์
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
