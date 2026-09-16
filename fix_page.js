const fs = require('fs');
const p = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/app/workshop/[step]/page.tsx';
let c = fs.readFileSync(p, 'utf8');

c = c.replace(/import \{ WhatIsIoTSlide \} from "@\/components\/slides\/WhatIsIoTSlide";/, 'import { WelcomeSlide } from "@/components/slides/WelcomeSlide";\nimport { WhatIsIoTSlide } from "@/components/slides/WhatIsIoTSlide";');

c = c.replace(/case 1:\r?\n\s+return \([\s\S]*?\);\r?\n\s+case 2:/, 'case 1:\n          return <WelcomeSlide />;\n        case 2:');

fs.writeFileSync(p, c);
console.log('Fixed page');
