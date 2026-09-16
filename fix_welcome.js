const fs = require('fs');
const p = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/WelcomeSlide.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(
  /<div className="absolute inset-0 z-0 opacity-60 pointer-events-none overflow-hidden mix-blend-screen">[\s\S]*?<\/div>\r?\n\s+<\/div>/,
  `{/* Premium Pure CSS 3D Abstract Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)]"></div>
        {/* Animated Moving Grid / Stars */}
        <div className="absolute inset-0" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', 
               backgroundSize: '40px 40px', 
               transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
               animation: 'gridMove 15s linear infinite'
             }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]"></div>
        <style>{\`
          @keyframes gridMove {
            0% { transform: perspective(500px) rotateX(60deg) translateY(0) translateZ(-200px); }
            100% { transform: perspective(500px) rotateX(60deg) translateY(40px) translateZ(-200px); }
          }
        \`}</style>
      </div>`
);

fs.writeFileSync(p, c);
console.log('Fixed WelcomeSlide');
