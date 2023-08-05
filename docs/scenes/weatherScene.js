const { Scenes, Markup } = require("telegraf");
const getWeatherScene = new Scenes.BaseScene("getWeather");

getWeatherScene.enter((ctx) => {
   const replyKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("Today", "today")],
      [Markup.button.callback("Next Five Days", "5_Days")],
   ])
      .resize()
      .oneTime();
   ctx.editMessageText("Please pick date of forcast", replyKeyboard);
});

getWeatherScene.action("today", async (ctx) => {
   try {
      const weatherInfo = await getWeather();
      if (weatherInfo) {
         ctx.reply(`
Weather for Today🌤🌞\nDate: ${new Date(
            weatherInfo.day1["date"] * 1000
         ).toLocaleDateString("en-US")}\nMax Temperature: ${
            weatherInfo.day1["maxTemp"]
         }°C\nMorning Weather🌅⛅️:  ${
            weatherInfo.day1["dayDesc"]
         }\nNight Weather 🌃⛅️: ${
            weatherInfo.day1["nightDesc"]
         } 🌙\nStay prepared and have a nice day! 😊🌈
        `);
      } else {
         ctx.reply("Error fetching weather data. Please try again later.");
      }
   } catch (error) {
      console.error("Error while handling 'today' action:", error);
      ctx.reply("An error occurred while fetching weather data.");
   }
});

getWeatherScene.action("5_Days", async (ctx) => {
   try {
      const weatherInfo = await getWeather();
      ctx.reply(`Weather for Next Five Days🌤️⛅️
   
Date: ${new Date(weatherInfo.day1["date"] * 1000).toLocaleDateString("en-US")}
Max Temperature: ${weatherInfo.day1["maxTemp"]}°C
Morning Weather 🌅⛅️:  ${weatherInfo.day1["dayDesc"]}
Night Weather 🌃⛅️: ${weatherInfo.day1["nightDesc"]} 🌙

Date: ${new Date(weatherInfo.day2["date"] * 1000).toLocaleDateString("en-US")}
Max Temperature: ${weatherInfo.day2["maxTemp"]}°C
Morning Weather 🌅⛅️:  ${weatherInfo.day2["dayDesc"]}
Night Weather 🌃⛅️: ${weatherInfo.day2["nightDesc"]} 🌙

Date: ${new Date(weatherInfo.day3["date"] * 1000).toLocaleDateString("en-US")}
Max Temperature: ${weatherInfo.day3["maxTemp"]}°C
Morning Weather 🌅⛅️:  ${weatherInfo.day3["dayDesc"]}
Night Weather 🌃⛅️: ${weatherInfo.day3["nightDesc"]} 🌙

Date: ${new Date(weatherInfo.day4["date"] * 1000).toLocaleDateString("en-US")}
Max Temperature: ${weatherInfo.day4["maxTemp"]}°C
Morning Weather 🌅⛅️:  ${weatherInfo.day4["dayDesc"]}
Night Weather 🌃⛅️: ${weatherInfo.day4["nightDesc"]} 🌙

Date: ${new Date(weatherInfo.day5["date"] * 1000).toLocaleDateString("en-US")}
Max Temperature: ${weatherInfo.day5["maxTemp"]}°C
Morning Weather 🌅⛅️:  ${weatherInfo.day5["dayDesc"]}
Night Weather 🌃⛅️: ${weatherInfo.day5["nightDesc"]} 🌙

Stay prepared and have a nice day! 😊
   `);
   } catch (error) {
      console.error("Error while handling 'today' action:", error);
      ctx.reply("An error occurred while fetching weather data.");
   }
});

async function getWeather() {
   const apiKey = process.env.WEATHER_API_KEY;
   const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/4607?apikey=${apiKey}&details=true&metric=true`;

   try {
      const response = await fetch(url);
      const data = await response.json();

      const weatherInfo = {
         day1: {
            date: data["DailyForecasts"][0]["EpochDate"],
            minTemp:
               data["DailyForecasts"][0]["Temperature"]["Minimum"]["Value"],
            maxTemp:
               data["DailyForecasts"][0]["Temperature"]["Maximum"]["Value"],
            dayDesc: data["DailyForecasts"][0]["Day"]["LongPhrase"],
            nightDesc: data["DailyForecasts"][0]["Night"]["LongPhrase"],
         },
         day2: {
            date: data["DailyForecasts"][1]["EpochDate"],
            minTemp:
               data["DailyForecasts"][1]["Temperature"]["Minimum"]["Value"],
            maxTemp:
               data["DailyForecasts"][1]["Temperature"]["Maximum"]["Value"],
            dayDesc: data["DailyForecasts"][1]["Day"]["LongPhrase"],
            nightDesc: data["DailyForecasts"][1]["Night"]["LongPhrase"],
         },
         day3: {
            date: data["DailyForecasts"][2]["EpochDate"],
            minTemp:
               data["DailyForecasts"][2]["Temperature"]["Minimum"]["Value"],
            maxTemp:
               data["DailyForecasts"][2]["Temperature"]["Maximum"]["Value"],
            dayDesc: data["DailyForecasts"][2]["Day"]["LongPhrase"],
            nightDesc: data["DailyForecasts"][2]["Night"]["LongPhrase"],
         },
         day4: {
            date: data["DailyForecasts"][3]["EpochDate"],
            minTemp:
               data["DailyForecasts"][3]["Temperature"]["Minimum"]["Value"],
            maxTemp:
               data["DailyForecasts"][3]["Temperature"]["Maximum"]["Value"],
            dayDesc: data["DailyForecasts"][3]["Day"]["LongPhrase"],
            nightDesc: data["DailyForecasts"][3]["Night"]["LongPhrase"],
         },
         day5: {
            date: data["DailyForecasts"][4]["EpochDate"],
            minTemp:
               data["DailyForecasts"][4]["Temperature"]["Minimum"]["Value"],
            maxTemp:
               data["DailyForecasts"][4]["Temperature"]["Maximum"]["Value"],
            dayDesc: data["DailyForecasts"][4]["Day"]["LongPhrase"],
            nightDesc: data["DailyForecasts"][4]["Night"]["LongPhrase"],
         },
      };
      console.log(weatherInfo);
      return weatherInfo;
   } catch (error) {
      console.error("Error fetching weather data: ", error);
      return null;
   }
}

module.exports = { getWeatherScene };
