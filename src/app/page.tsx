import Link from "next/link";
import { ArrowRight, Cpu, Radio, Activity, Code, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-100 overflow-hidden relative">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[500px] overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-indigo-400/20 blur-3xl"></div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 z-10">
        <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Interactive IoT Workshop
          </div>

          {/* Hero Content */}
          <div className="space-y-6 max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
              Smart Automation <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Camp 2026
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              เรียนรู้ระบบ IoT ตั้งแต่พื้นฐาน เริ่มต้นจากการเชื่อมต่อฮาร์ดแวร์ การเขียนโค้ด 
              ไปจนถึงการส่งข้อมูลไร้สายด้วย NRF24L01 และ Arduino ในรูปแบบ Interactive เต็มหน้าจอ
            </p>
          </div>

          {/* Start Button */}
          <div className="pt-4 pb-12">
            <Link href="/workshop/1">
              <Button size="lg" className="h-16 px-10 text-lg rounded-full bg-slate-900 text-white hover:bg-slate-800 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 gap-3">
                เริ่มเข้าสู่บทเรียน
                <div className="bg-white/20 p-1.5 rounded-full">
                  <ArrowRight className="w-5 h-5 text-white" />
                </div>
              </Button>
            </Link>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
            {[
              { icon: Cpu, label: "Hardware", desc: "รู้จักอุปกรณ์จริง", color: "text-blue-500", bg: "bg-blue-50" },
              { icon: Activity, label: "Wiring", desc: "จำลองการต่อสาย", color: "text-emerald-500", bg: "bg-emerald-50" },
              { icon: Code, label: "Coding", desc: "โค้ด TX & RX", color: "text-indigo-500", bg: "bg-indigo-50" },
              { icon: Radio, label: "Wireless", desc: "ส่งข้อมูลหากัน", color: "text-purple-500", bg: "bg-purple-50" },
            ].map((feature, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col items-center text-center hover:bg-white transition-colors">
                <div className={`${feature.bg} ${feature.color} p-4 rounded-2xl mb-4`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{feature.label}</h3>
                <p className="text-xs text-slate-500 font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-slate-400 text-sm font-medium flex items-center justify-center gap-2">
        <Smartphone className="w-4 h-4" /> รองรับการใช้งานทั้งบนมือถือ แท็บเล็ต และคอมพิวเตอร์
      </footer>
    </div>
  );
}
