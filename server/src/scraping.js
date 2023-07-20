const puppeteer = require('puppeteer');
const saveDataToDatabase = require('./database');

const baseUrl = 'https://www.sreality.cz/en/search/for-sale/apartments?page=';

async function scrapePage(pageParam) {
  try {
    const browser = await puppeteer.launch({ // configuration
      headless: 'new',
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
      args: ['--no-sandbox'], 
    });

    const page = await browser.newPage();
    await page.goto(baseUrl + pageParam);
    await page.waitForSelector('div.property-list.ng-scope', { timeout: 1000 });

    const data = await page.evaluate(() => {
      const items = []; // eventual result

      // searching for the necessary html data
      const titles = document.querySelectorAll('span.locality.ng-binding');
      const cardImages = document.querySelectorAll('div.property.ng-scope .ng-scope.ng-isolate-scope');
      const link = document.querySelectorAll('div.info a.title');

      // data gathering
      for (let i = 0; i < titles.length; i++) {
        const title = titles[i].textContent; 
        const imageElement = cardImages[i].querySelectorAll('img')[0];

        if (imageElement) {
          const image = imageElement.getAttribute('src');
          const href = `https://www.sreality.cz${link[i].getAttribute('href')}`;
          items.push({ image, title, href });
        }
      }

      return items;
    });
    
    await browser.close();
    const savedData = await saveDataToDatabase(data);
    return savedData;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = scrapePage;