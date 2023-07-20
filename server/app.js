const express = require('express');
const scrapePage = require('./src/scraping.js');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

app.get('/getCards', async (req, res) => {
  const page = req.query.page;

  if (page) {
    const data = await scrapePage(page);
    if (data) res.json(data);
  }
});

app.get('/scrapeCards', async (req, res) => {
  for (let index = 1; index <= 25; index++) {
    const data = await scrapePage(index);

    if (data) {
      console.log(`Scraped ${index} page successfully`);
    }
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});