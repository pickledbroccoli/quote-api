const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getQuotesByPerson = (arr, dude) => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  let dudeQuotes = [];
  for (let i=0; i < arr.length; i++) {
    if (arr[i].person === dude) {
      dudeQuotes.push(arr[i]);
    }
  }
  if(dudeQuotes.length){
    return dudeQuotes;
  } else {
    return false;
  }
}

// to add unique ID and year to the quotes
let quoteCounter = 0;
const yearList = [1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990 , 1991, 1992, 1993, 1994, 1955, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010];

const idAdder = (arr) => {
  for (let i=0; i < arr.length; i++) {
    arr[i]['id'] = quoteCounter;
    quoteCounter++;
  }
};

// i have no idea, which quote is from what year - let's make it random for practicing purposes
const yearAdder = (arr) => {
  for (let i=0; i < arr.length; i++) {
    arr[i]['year'] = getRandomElement(yearList);    
  }
};

 /*
const blackAdder = () => {
  console.log('Rowan Atkinson');
};
*/

module.exports = {
  getRandomElement, getQuotesByPerson, idAdder, yearAdder
};
