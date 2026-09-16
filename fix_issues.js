const fs = require('fs');

// 1. Revert the top bar in SlideLayout.tsx to simple text with a text highlight
const slideLayoutPath = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/SlideLayout.tsx';
let slideLayoutCode = fs.readFileSync(slideLayoutPath, 'utf8');

slideLayoutCode = slideLayoutCode.replace(
  /<div className="mb-6 shrink-0 relative">[\s\S]*?<\/div>\r?\n\s+<\/div>/,
  `<div className="mb-4 md:mb-6 text-center md:text-left shrink-0">
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">
                    <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{slide.title}</span>
                  </h2>
                  <div className="inline-block bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-lg">
                    <p className="text-sm md:text-base text-blue-300 font-medium tracking-wide">{slide.subtitle}</p>
                  </div>
                </div>`
);

fs.writeFileSync(slideLayoutPath, slideLayoutCode);

// 2. Fix WelcomeSlide.tsx background. 
// I'll use a reliable, lightweight CSS-only / particles background or a known working MP4 URL.
const welcomePath = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/WelcomeSlide.tsx';
let welcomeCode = fs.readFileSync(welcomePath, 'utf8');

welcomeCode = welcomeCode.replace(
  /<div className="absolute inset-0 z-0 opacity-60 pointer-events-none overflow-hidden mix-blend-screen">[\s\S]*?<\/div>/,
  `{/* Pure CSS High-End 3D Animated Grid / Network Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        {/* Animated Moving Stars / Particles */}
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)', animation: 'gridMove 10s linear infinite' }}></div>
        <style>{`
          @keyframes gridMove {
            0% { background-position: 0 0; }
            100% { background-position: 0 40px; }
          }
        `}</style>
      </div>`
);

fs.writeFileSync(welcomePath, welcomeCode);

console.log('Fixed layout and welcome slide');
