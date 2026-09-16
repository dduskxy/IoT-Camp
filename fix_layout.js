const fs = require('fs');

const slideLayoutPath = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/SlideLayout.tsx';
let code = fs.readFileSync(slideLayoutPath, 'utf8');

// Replace the gradient bar back with sleek text
code = code.replace(
  /<div className="mb-6 shrink-0 relative">[\s\S]*?<\/div>\r?\n\s+<\/div>/,
  `<div className="mb-4 md:mb-6 text-center md:text-left shrink-0">
                  <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 mb-2 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                    {slide.title}
                  </h2>
                  <div className="inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-lg shadow-lg">
                    <p className="text-sm md:text-base text-blue-200 font-medium tracking-wide">
                      {slide.subtitle}
                    </p>
                  </div>
                </div>`
);

fs.writeFileSync(slideLayoutPath, code);
console.log('Fixed SlideLayout');
