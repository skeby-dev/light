function logUsers(firstName, userName) {
  length = userInfo.length;
  userInfo[length - 1] = `{firstName:${firstName}, userName:${userName}}`;
}

async function getFacts() {
  const limit = 1;
  const apiUrl = `https://api.api-ninjas.com/v1/facts?limit=${limit}`;
  const apiKey = process.env.FACTS_API_KEY;

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  });
    const data = await response.json();
    const fact = data[0]["fact"];
    return fact  
  }

async function getQuotes() {
  const limit = "";
  const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${limit}`;
  const apiKey = process.env.QUOTES_API_KEY;

  const response =  await fetch(apiUrl, {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
    },
  });
    const data = await response.json();
    const author = data[0]["author"]
    const quote = data[0]["quote"];

    return [author, quote]
}


// bot.action("facts", async (ctx) => {
//    ctx.answerCbQuery();
//    let fact = await getFacts();
//    console.log(fact);
//    ctx.reply(`Fact: ${fact}`);
// });

// bot.action("quotes", async (ctx) => {
//    ctx.answerCbQuery();
//    const [author, quote] = await getQuotes();
//    ctx.reply(`quote: ${quote} - ${author}`);
// });


module.exports = { getFacts, getQuotes };
