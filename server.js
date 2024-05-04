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

app.get('/api/quotes', (req, res, next) => {
    if (req.query.person) {

        // GET quotes by the person in query
        const dudeToQuote = req.query.person;
        if (dudeToQuote) {
            const quotesByDude = getQuotesByPerson(quotes, dudeToQuote);
            res.send({
                quotes: quotesByDude
            });
        } else {
            res.status(404).send('Person Not Found in Quotes List');
        }

    } else {
        // GET all quotes
        res.send({
            quotes: quotes
        });
    }
});




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });