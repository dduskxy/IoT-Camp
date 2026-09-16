const fs = require('fs');
const path = require('path');

const slidesDir = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides';
const files = [
  'WhatIsIoTSlide.tsx',
  'HardwareSlide.tsx',
  'NRF24Slide.tsx',
  'WiringSingleSlide.tsx',
  'TxVsRxSlide.tsx',
  'WiringDualSlide.tsx',
  'CodeLabTxSlide.tsx',
  'CodeLabRxSlide.tsx',
  'DualSerialSlide.tsx',
  'DataSimulationSlide.tsx',
  'MissionsSlide.tsx',
  'TroubleshootingSlide.tsx',
  'FinalChallengeSlide.tsx'
];

for (const file of files) {
  const filePath = path.join(slidesDir, file);
  if (!fs.existsSync(filePath)) continue;
  let code = fs.readFileSync(filePath, 'utf8');

  // Attempt to remove the title blocks based on common patterns
  
  // 1. Remove motion.div containing h2
  code = code.replace(/<motion\.div[^>]*className="text-center[^>]*>[\s\S]*?<h2[\s\S]*?<\/h2>[\s\S]*?<\/motion\.div>/, '');
  
  // 2. Remove standard div containing h2
  code = code.replace(/<div className="text-center[^>]*>[\s\S]*?<h2[\s\S]*?<\/h2>[\s\S]*?<\/div>/, '');
  
  // 3. For HardwareSlide, it's inside motion.div but h2 is direct child
  if (file === 'HardwareSlide.tsx') {
    code = code.replace(/<h2 className="[^"]*text-3xl[^"]*">[\s\S]*?<\/h2>/, '');
  }

  // 4. For FinalChallengeSlide
  if (file === 'FinalChallengeSlide.tsx') {
    code = code.replace(/<div className="text-center mb-12">[\s\S]*?<\/div>/, '');
    code = code.replace(/<motion\.div[^>]*>[\s\S]*?<Trophy[\s\S]*?<\/motion\.div>/, ''); // Also remove the trophy icon which acts as a huge header
  }

  fs.writeFileSync(filePath, code);
}
console.log('Titles removed');
