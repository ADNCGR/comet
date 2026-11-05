const https = require('https');

https.get('https://www.officinecomet.com/chi-siamo/', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        const regex = /<img[^>]+src="([^">]+)"/g;
        let match;
        const srcs = new Set();
        while ((match = regex.exec(data)) !== null) {
            srcs.add(match[1]);
        }
        console.log(Array.from(srcs).join('\n'));
    });
}).on('error', (err) => {
    console.log("Error: " + err.message);
});
