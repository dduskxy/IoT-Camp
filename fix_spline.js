const fs = require('fs');
const p = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/WhatIsIoTSlide.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(/import dynamic from 'next\/dynamic';\r?\n\r?\n\/\/ Lazy load spline so it doesn't block page load\r?\nconst Spline = dynamic\(\(\) => import\('@splinetool\/react-spline'\), \{\r?\n  ssr: false,\r?\n  loading: \(\) => <div className="absolute inset-0 flex items-center justify-center text-white\/20">Loading 3D Scene...<\/div>\r?\n\}\);\r?\n/, '');

c = c.replace(/<Spline scene="https:\/\/prod\.spline\.design\/6Wq1Q7YGyM-iab9i\/scene\.splinecode" \/>/, '<iframe src="https://my.spline.design/6Wq1Q7YGyM-iab9i/" frameBorder="0" width="100%" height="100%" className="w-full h-full border-none"></iframe>');

fs.writeFileSync(p, c);
console.log('Fixed spline');
