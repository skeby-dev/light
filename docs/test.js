// // fetch("https://official-joke-api.appspot.com/random_joke").then(response =>response.json()).then(data => {console.log(data)})

const limit = 3;
const apiUrl = `https://api.api-ninjas.com/v1/facts?limit=${limit}`;
const apiKey = '/MogPHgOGzIFj6C4WCzO3g==1Rm0lFV3Ne1GxFYl';

fetch(apiUrl, {
  method: 'GET',
  headers: {
    'X-Api-Key': apiKey
  },
})
  .then((response) => response.json())
  .then(data => {
    return data[0]["fact"];
  });



