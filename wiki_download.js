const https = require('https');
const fs = require('fs');

const wikiImages = [
  { name: 'arduino.jpg', file: 'File:Arduino_Uno_-_R3.jpg' },
  { name: 'nrf24.jpg', file: 'File:NRF24L01.jpg' },
  { name: 'jumper.jpg', file: 'File:Jumper_wires.jpg' },
  { name: 'cable.jpg', file: 'File:USB_Type-B_plug.jpg' }
];

async function run() {
  for (const img of wikiImages) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${img.file}&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Bot' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const page = pages[Object.keys(pages)[0]];
          if (page.imageinfo && page.imageinfo[0].url) {
            console.log(`Found ${img.name}: ${page.imageinfo[0].url}`);
          }
        } catch(e) {}
      });
    });
  }
}
run();
