export type Slide = {
  id: number;
  title: string;
  subtitle: string;
  slug: string;
};

export const workshopSlides: Slide[] = [
  { id: 1, title: "Welcome", subtitle: "ยินดีต้อนรับสู่ Workshop", slug: "welcome" },
  { id: 2, title: "What is IoT?", subtitle: "IoT คืออะไร", slug: "what-is-iot" },
  { id: 3, title: "Hardware", subtitle: "รู้จักอุปกรณ์ของเรา", slug: "hardware" },
  { id: 4, title: "NRF24L01", subtitle: "โมดูลสื่อสารไร้สาย", slug: "nrf24" },
  { id: 5, title: "Wiring", subtitle: "ลองต่อสายวงจรหนึ่งบอร์ด", slug: "wiring-single" },
  { id: 6, title: "TX vs RX", subtitle: "ตัวส่งและตัวรับต่างกันอย่างไร", slug: "tx-vs-rx" },
  { id: 7, title: "Two Boards Wiring", subtitle: "ต่อวงจรสำหรับสองบอร์ด", slug: "wiring-dual" },
  { id: 8, title: "TX Code Lab", subtitle: "เขียนโค้ดฝั่งส่ง", slug: "code-tx" },
  { id: 9, title: "RX Code Lab", subtitle: "เขียนโค้ดฝั่งรับ", slug: "code-rx" },
  { id: 10, title: "Dual Serial", subtitle: "ดูผลลัพธ์ของทั้งสองบอร์ด", slug: "serial-monitor" },
  { id: 11, title: "Data Simulation", subtitle: "จำลองการส่งข้อมูลไร้สาย", slug: "simulation" },
  { id: 12, title: "Missions", subtitle: "ภารกิจของฐาน", slug: "missions" },
  { id: 13, title: "Troubleshoot", subtitle: "แก้ปัญหาระบบ", slug: "troubleshooting" },
];
