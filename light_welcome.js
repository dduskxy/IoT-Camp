const fs = require('fs');
const p = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/app/welcome/page.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(/text-white\/60/g, 'text-slate-500');
c = c.replace(/text-white\/50/g, 'text-slate-500');
c = c.replace(/text-white\/40/g, 'text-slate-400');
c = c.replace(/text-white\/30/g, 'text-slate-400');
c = c.replace(/text-white\/20/g, 'text-slate-300');
c = c.replace(/text-white\/70/g, 'text-slate-600');
c = c.replace(/text-white\/80/g, 'text-slate-700');
c = c.replace(/text-white/g, 'text-slate-900');
c = c.replace(/bg-white\/5/g, 'bg-white');
c = c.replace(/bg-white\/10/g, 'bg-slate-50');
c = c.replace(/bg-white\/20/g, 'bg-slate-200');
c = c.replace(/bg-white\/30/g, 'bg-slate-300');
c = c.replace(/border-white\/10/g, 'border-slate-200');
c = c.replace(/border-white\/5/g, 'border-slate-200');
c = c.replace(/border-white\/20/g, 'border-slate-300');
c = c.replace(/bg-\[\#050505\]/g, 'bg-slate-50');
c = c.replace(/from-blue-400 via-indigo-400 to-cyan-300/g, 'from-blue-600 via-indigo-600 to-cyan-600');
c = c.replace(/from-blue-400 via-indigo-400 to-cyan-400/g, 'from-blue-600 via-indigo-600 to-cyan-600');
c = c.replace(/text-blue-400/g, 'text-blue-600');
c = c.replace(/hover:text-white/g, 'hover:text-slate-900');
c = c.replace(/placeholder-white\/30/g, 'placeholder-slate-400');
c = c.replace(/via-white\/20/g, 'via-slate-300');

fs.writeFileSync(p, c);
console.log('Fixed welcome page');
