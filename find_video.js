const https = require('https');
const url = 'https://pixabay.com/api/videos/?key=31245749-bb332ef1cf769a65f97b69c47&q=abstract+dark+technology&per_page=5';

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      if (json.hits && json.hits.length > 0) {
        console.log(json.hits[0].videos.large.url);
        console.log(json.hits[1].videos.large.url);
      }
    } catch(e) { console.log("Failed"); }
  });
});
