const express = require('express');
const chromium = require('chrome-aws-lambda');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'alive' });
});

app.get('/api/render', async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.send('please provide url');
  }
  try {
    const browser = await chromium.puppeteer.launch(
      {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
        ignoreHTTPSErrors: true,
    });
  
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'networkidle0'});
    const pageContent = await page.content();
    console.log(`Response first 200 chars from ${url} : ${pageContent.substring(0, 200)}`);
    await browser.close();
    
    res.send(pageContent);
  } catch (err) {
    console.log(`Error while fetching ${url} `, err);
    res.send(`Error fetching ${url}`);
  }  
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
