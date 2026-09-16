const fs = require('fs');
const p = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/WelcomeSlide.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(/<div className="absolute inset-0 z-0 opacity-40 pointer-events-none flex justify-center items-center overflow-hidden mix-blend-screen scale-125">\r?\n\s+<iframe src="https:\/\/my\.spline\.design\/6Wq1Q7YGyM-iab9i\/" frameBorder="0" width="100%" height="100%" className="w-full h-full border-none"><\/iframe>\r?\n\s+<\/div>/, '<div className="absolute inset-0 z-0 opacity-60 pointer-events-none overflow-hidden mix-blend-screen">\n        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-105 opacity-80">\n          <source src="/bg-loop.mp4" type="video/mp4" />\n        </video>\n        {/* Dark overlay to ensure text readability */}\n        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]"></div>\n      </div>');

fs.writeFileSync(p, c);
console.log('Fixed video');
