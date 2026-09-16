const https = require('https');
const fs = require('fs');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Failed ' + res.statusCode));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const images = [
  { name: 'arduino.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Arduino_Uno_-_R3.jpg' },
  { name: 'shield.png', url: 'https://files.seeedstudio.com/wiki/Base_Shield_V2/img/Base_Shield_v2.png' },
  { name: 'nrf24.jpg', url: 'https://cdn.sparkfun.com/assets/learn_tutorials/6/7/1/NRF24L01_Pinout.jpg' },
  { name: 'jumper.jpg', url: 'https://cdn.sparkfun.com//assets/parts/8/5/3/7/11026-02b.jpg' },
  { name: 'led.jpg', url: 'https://files.seeedstudio.com/wiki/Grove-Chainable_RGB_LED/img/Grove-Chainable_RGB_LED_V2.0.jpg' },
  { name: 'computer.jpg', url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' },
  { name: 'cable.jpg', url: 'https://cdn.sparkfun.com/assets/parts/6/6/0/4/11301-01a.jpg' }
];

async function run() {
  for (const img of images) {
    try {
      await download(img.url, `C:/Users/asus/Documents/GitHub/IoT-Camp/public/images/hardware/${img.name}`);
      console.log(`Downloaded ${img.name}`);
    } catch (e) {
      console.error(`Failed ${img.name}: ${e.message}`);
    }
  }
}
run();
