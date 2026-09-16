const https = require('https');

const wikiImages = [
  'File:Arduino_Uno_-_R3.jpg',
  'File:NRF24L01.jpg',
  'File:Jumper_Wires_-_Male_to_Male.jpg',
  'File:USB_Type-B_plug.jpg',
  'File:Grove-Chainable_RGB_LED.jpg'
];

async function run() {
  for (const file of wikiImages) {
    const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=${file}&prop=imageinfo&iiprop=url&format=json`;
    https.get(url, { headers: { 'User-Agent': 'Bot' } }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const page = pages[Object.keys(pages)[0]];
          if (page.imageinfo && page.imageinfo[0].url) {
            console.log(`${file} => ${page.imageinfo[0].url}`);
          } else {
            console.log(`${file} => NOT FOUND`);
          }
        } catch(e) {}
      });
    });
  }
}
run();
