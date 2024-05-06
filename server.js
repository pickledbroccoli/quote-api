const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement, getQuotesByPerson, yearAdder, idAdder, getIndexById } = require('./utils');

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

app.post('/api/quotes', (req, res, next) => {
    if (req.query.person && req.query.quote) {
        
        const newQuoteToAdd = {
            quote: req.query.quote,
            person: req.query.person
        };
        
        quotes.push(newQuoteToAdd);
        res.send({
            quote: newQuoteToAdd
        });

    } else {
        res.status(400).send('Missing person or quote parameter');
    }
});

app.get('/api/quotes/:id', (req, res, next) => {
    const thisQuote = getIndexById(req.params.id, quotes);
    
    if (thisQuote !== -1) {
        res.send({
            quote: quotes[thisQuote]
        });
    } else {
        res.status(404).send(`id ${req.params.id} not found`);
    }
});

// to update quote by ID, if it exist
// route with query string - if any of PERSON, YEAR, QUOTE in query, update those
app.put('/api/quotes/:id', (req, res, next) => {
    const thisToUpdate = getIndexById(req.params.id, quotes);
    if (thisToUpdate !== -1) {
        
        const newPerson = req.query.person || quotes[thisToUpdate].person;
        const newQuote = req.query.quote || quotes[thisToUpdate].quote;
        const newYear = req.query.year || quotes[thisToUpdate].year;

        quotes[thisToUpdate].person = newPerson;
        quotes[thisToUpdate].quote = newQuote;
        quotes[thisToUpdate].year = newYear;
               
        res.send({
            quote: quotes[thisToUpdate]
        });

    } else {
        res.status(404).send('id not found');
    }
});

// to DELETE quote by ID
app.delete('/api/quotes/:id', (req, res, next) => {
    const thisQuote = getIndexById(req.params.id, quotes);
    
    if (thisQuote !== -1) {
        
        quotes.splice(thisQuote, 1);

        res.status(204).send();
    } else {
        res.status(404).send(`id ${req.params.id} not found`);
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });

idAdder(quotes);
yearAdder(quotes);