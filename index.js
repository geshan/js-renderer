const express = require('express');
const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

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
    const browser = await puppeteer.launch(
      {
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
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
