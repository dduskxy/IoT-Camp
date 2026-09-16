const fs = require('fs');
const path = require('path');

function convertToLight(code) {
  // Text Colors
  code = code.replace(/text-white/g, 'text-slate-900');
  code = code.replace(/text-slate-200/g, 'text-slate-800');
  code = code.replace(/text-slate-300/g, 'text-slate-700');
  code = code.replace(/text-gray-300/g, 'text-slate-700');
  code = code.replace(/text-slate-400/g, 'text-slate-500');
  code = code.replace(/text-gray-400/g, 'text-slate-500');
  code = code.replace(/text-slate-500/g, 'text-slate-400');
  
  // Backgrounds & Borders
  code = code.replace(/bg-white\/\[0\.02\]/g, 'bg-white');
  code = code.replace(/bg-white\/5/g, 'bg-white');
  code = code.replace(/bg-white\/10/g, 'bg-slate-50');
  code = code.replace(/bg-white\/20/g, 'bg-slate-100');
  code = code.replace(/border-white\/5/g, 'border-slate-200');
  code = code.replace(/border-white\/10/g, 'border-slate-200');
  code = code.replace(/border-white\/20/g, 'border-slate-300');
  
  // Specific Dark Backgrounds
  code = code.replace(/bg-\[\#0B0F19\]/g, 'bg-slate-50');
  code = code.replace(/bg-\[\#030303\]/g, 'bg-slate-50');
  code = code.replace(/bg-\[\#111827\]/g, 'bg-white');
  code = code.replace(/bg-black\/60/g, 'bg-slate-900/40'); // overlay
  code = code.replace(/bg-black\/40/g, 'bg-slate-50/90');
  code = code.replace(/bg-black\/80/g, 'bg-slate-900/10'); // image gradient overlay? Better to keep it dark if it's over an image to make text readable.
  // Let's fix the image overlay manually later or leave it. Actually text-white over images is standard even in light themes.
  
  // Gradients for titles (adjust to be slightly more vibrant on white)
  code = code.replace(/from-blue-300 via-indigo-300 to-purple-300/g, 'from-blue-600 via-indigo-600 to-purple-600');
  code = code.replace(/from-blue-400 to-cyan-400/g, 'from-blue-600 to-cyan-600');
  code = code.replace(/from-purple-400 to-blue-400/g, 'from-purple-600 to-blue-600');
  code = code.replace(/from-blue-400 to-emerald-400/g, 'from-blue-600 to-emerald-600');
  code = code.replace(/from-yellow-400 to-orange-400/g, 'from-amber-500 to-orange-600');
  code = code.replace(/text-blue-400/g, 'text-blue-600');
  code = code.replace(/text-indigo-400/g, 'text-indigo-600');
  code = code.replace(/text-purple-400/g, 'text-purple-600');
  code = code.replace(/text-emerald-400/g, 'text-emerald-600');
  code = code.replace(/text-green-400/g, 'text-green-600');
  code = code.replace(/text-yellow-400/g, 'text-yellow-600');
  code = code.replace(/text-cyan-300/g, 'text-cyan-600');
  code = code.replace(/text-indigo-300/g, 'text-indigo-700');
  
  // Hover & Active states
  code = code.replace(/hover:bg-white\/10/g, 'hover:bg-slate-100');
  code = code.replace(/bg-indigo-500\/30/g, 'bg-indigo-100');
  code = code.replace(/bg-blue-500\/20/g, 'bg-blue-100');
  code = code.replace(/bg-blue-500\/10/g, 'bg-blue-50');
  
  // Drop shadows
  code = code.replace(/shadow-\[0_8px_32px_0_rgba\(0,0,0,0.36\)\]/g, 'shadow-xl');
  code = code.replace(/shadow-2xl/g, 'shadow-lg');
  
  return code;
}

const dirs = [
  'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides',
  'C:/Users/asus/Documents/GitHub/IoT-Camp/src/app',
  'C:/Users/asus/Documents/GitHub/IoT-Camp/src/app/workshop/[step]'
];

for (const d of dirs) {
  if (!fs.existsSync(d)) continue;
  const files = fs.readdirSync(d).filter(f => f.endsWith('.tsx'));
  for (const f of files) {
    const p = path.join(d, f);
    let code = fs.readFileSync(p, 'utf8');
    const newCode = convertToLight(code);
    if (code !== newCode) {
      fs.writeFileSync(p, newCode);
      console.log(`Converted ${f}`);
    }
  }
}

// Manually fix SlideLayout.tsx radial gradient
let layoutPath = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/SlideLayout.tsx';
let layoutCode = fs.readFileSync(layoutPath, 'utf8');
layoutCode = layoutCode.replace(/bg-\[radial-gradient[^\]]+\]/g, 'bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]');
fs.writeFileSync(layoutPath, layoutCode);

console.log('Light Theme applied');
