const fs = require('fs');
const p = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/SlideLayout.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(
  /<div className="mb-4 md:mb-6 text-center md:text-left shrink-0">\r?\n\s+<h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 mb-2 drop-shadow-\[0_0_10px_rgba\(59,130,246,0\.3\)\]">\{slide\.title\}<\/h2>\r?\n\s+<p className="text-lg text-slate-400">\{slide\.subtitle\}<\/p>\r?\n\s+<\/div>/,
  `<div className="mb-6 shrink-0 relative">
                  {/* Premium Gradient Top Bar for Topic */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-indigo-500/30 p-4 md:p-6 shadow-[0_0_30px_rgba(99,102,241,0.15)] flex items-center justify-between">
                    {/* Animated gradient background sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end gap-2 md:gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-xl shadow-lg border border-white/20">
                          {slide.id}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white drop-shadow-md tracking-wide">
                          {slide.title}
                        </h2>
                      </div>
                      <p className="text-sm md:text-base text-indigo-200 font-medium md:mb-1 drop-shadow-sm ml-16 md:ml-0">
                        {slide.subtitle}
                      </p>
                    </div>
                  </div>
                </div>`
);

fs.writeFileSync(p, c);
console.log('Fixed header');
