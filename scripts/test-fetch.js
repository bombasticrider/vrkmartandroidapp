const fs = require('fs');

async function testFetch() {
  try {
    const url = 'https://blinkit.com/cn/null/cid/1487/1489';
    console.log('Fetching:', url);

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    });

    console.log('Response Status:', res.status);
    const html = await res.text();
    console.log('HTML Length:', html.length);

    const scriptRegex = /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/;
    const match = html.match(scriptRegex);

    if (match) {
      console.log('Found __NEXT_DATA__!');
      const data = JSON.parse(match[1]);
      fs.writeFileSync('./scratch/blinkit-raw.json', JSON.stringify(data, null, 2));
      console.log('Saved raw data to ./scratch/blinkit-raw.json');
      console.log('Page Props keys:', Object.keys(data.props?.pageProps || {}));
    } else {
      console.log('__NEXT_DATA__ not found. First 500 chars of HTML:');
      console.log(html.substring(0, 500));
    }
  } catch (err) {
    console.error('Error fetching Blinkit:', err);
  }
}

testFetch();
