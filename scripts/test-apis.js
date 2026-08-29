const fs = require('fs');

async function testApis() {
  const endpoints = [
    {
      name: 'v1 layout listing',
      url: 'https://blinkit.com/v1/layout/listing?cid=1487&scid=1489',
      headers: {
        'app_client': 'consumer_android',
        'lat': '12.9716',
        'lon': '77.5946',
        'User-Agent': 'BlinkitAndroid/16.1.1',
      }
    },
    {
      name: 'v2 category page',
      url: 'https://blinkit.com/v2/pages/category?category_id=1487&subcategory_id=1489',
      headers: {
        'app_client': 'consumer_web',
        'lat': '12.9716',
        'lon': '77.5946',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      }
    },
    {
      name: 'v1 search layout',
      url: 'https://blinkit.com/v1/layout/search?q=atta',
      headers: {
        'app_client': 'consumer_android',
        'lat': '12.9716',
        'lon': '77.5946',
        'User-Agent': 'BlinkitAndroid/16.1.1',
      }
    }
  ];

  for (const ep of endpoints) {
    try {
      console.log(`\nTesting ${ep.name}: ${ep.url}`);
      const res = await fetch(ep.url, { headers: ep.headers });
      console.log(`Status: ${res.status}`);
      if (res.status === 200) {
        const json = await res.json();
        console.log(`Success! Keys:`, Object.keys(json));
        fs.writeFileSync(`./scratch/${ep.name.replace(/\s+/g, '_')}.json`, JSON.stringify(json, null, 2));
      } else {
        const text = await res.text();
        console.log(`Failed text preview:`, text.substring(0, 150));
      }
    } catch(e) {
      console.log(`Error: ${e.message}`);
    }
  }
}

testApis();
