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


module.exports = {
  getRandomElement, getQuotesByPerson
};
