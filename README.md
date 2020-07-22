# js-renderer

JS renderer is an online puppeteer service to render pages with javascript (js). Mainly useful for web scraping (not using splash).

At times while scraping web pages you will come across websites or web pages that only render on a browser that renders the loaded javascript. If you curl it or use something like [Scrapy](https://scrapy.org/), you just end up with not useful HTML.

This project aims to solve that issue with Puppeteer. With Scrapy you can use [Splash](https://github.com/scrapy-plugins/scrapy-splash) but it is Scrapy specific and not easy to configure.

## Uses

This project uses Puppeteer to render the page as a full browser and Express to open Puppeter as an API.

## Run locally

If you have node install you can do:

```
npm install
npm start
```

If you want to run with docker, execute the following:

```
npm install
docker-compose up
```

The hit `http://localhost:8080/api/render?url=https://instagram.com`

## How to use it

If you want to use it for scraping, use the following URL on Vercel:

https://js-renderer.now.sh/api/render?url=https://instagram.com

### Styles broken

Styles and images will look broken but the HTML tags will be there. Happy Web Scraping!
