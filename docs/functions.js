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

async function getWeather() {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/4607?apikey=${apiKey}&details=false&metric=true`;

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      weatherInfo = {
        day1: {
          date: data["DailyForecasts"][0]["Date"],
          minTemp: data["DailyForecasts"][0]["Temperature"]["Minimum"],
          maxTemp: data["DailyForecasts"][0]["Temperature"]["Maximum"],
          day: data["DailyForecasts"][0]["Night"]["IconPharse"],
        },
        day2: {
          date: data["DailyForecasts"][1]["Date"],
          minTemp: data["DailyForecasts"][1]["Temperature"]["Minimum"],
          maxTemp: data["DailyForecasts"][1]["Temperature"]["Maximum"],
        },
        day3: {
          date: data["DailyForecasts"][2]["Date"],
          minTemp: data["DailyForecasts"][2]["Temperature"]["Minimum"],
          maxTemp: data["DailyForecasts"][2]["Temperature"]["Maximum"],
        },
        day4: {
          date: data["DailyForecasts"][3]["Date"],
          minTemp: data["DailyForecasts"][3]["Temperature"]["Minimum"],
          maxTemp: data["DailyForecasts"][3]["Temperature"]["Maximum"],
        },
        day5: {
          date: data["DailyForecasts"][4]["Date"],
          minTemp: data["DailyForecasts"][4]["Temperature"]["Minimum"],
          maxTemp: data["DailyForecasts"][4]["Temperature"]["Maximum"],
        },
      };
    });
  console.log(weatherInfo);
}

module.exports = { getWeather, getFacts, getQuotes };
