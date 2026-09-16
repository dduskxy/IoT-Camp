const fs = require('fs');

const simPath = 'C:/Users/asus/Documents/GitHub/IoT-Camp/src/components/slides/DataSimulationSlide.tsx';
let simCode = fs.readFileSync(simPath, 'utf8');

simCode = simCode.replace(
  /TX sent packet #\$\{next\} \[Hello IoT\]/g, 
  'TX broadcasted count: [${(next % 5) + 1}]'
);

simCode = simCode.replace(
  /RX received packet #\$\{next\}/g, 
  'RX received count & changed LED to [${(next % 5) + 1}]'
);

simCode = simCode.replace(
  /"Hello IoT"/g,
  '"Fingers: 2"'
);

// We also need to change the payload size maybe? The payload is 4 bytes for an integer (int).
simCode = simCode.replace(
  /32 Bytes/g,
  '4 Bytes (Int)'
);

fs.writeFileSync(simPath, simCode);
console.log('Simulation slide updated!');
