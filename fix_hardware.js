const fs = require('fs');
const p = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/HardwareSlide.tsx';
let c = fs.readFileSync(p, 'utf8');
// Fix text color over image
c = c.replace(/<h3 className="text-3xl font-bold text-slate-900 drop-shadow-md">/, '<h3 className="text-3xl font-bold text-white drop-shadow-md">');
// Fix image background pad (was bg-white/5 -> bg-white, but let's make it plain white)
c = c.replace(/bg-white flex items-center justify-center/, 'bg-white flex items-center justify-center border-slate-200');
fs.writeFileSync(p, c);
console.log('Fixed hardware slide text');
