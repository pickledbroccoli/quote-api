const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getQuotesByPerson } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuoteElement = getRandomElement(quotes);
    res.send({
        quote: randomQuoteElement
    });

});

app.get('/api/quotes', (req, res, next) => {});




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });