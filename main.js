const { Markup, session } = require("telegraf");
const { getWeather, getFacts, getQuotes } = require("./docs/functions.js"); 
const dotenv = require("dotenv"); 
const { bot } = require("./docs/bot.js");
const { stage } = require("./docs/scenes/index.js");
const getFileInfoScene = "getFileInfo"; 
dotenv.config();

bot.use(session()); 
bot.use(stage.middleware());

const userKeyboardCommands = Markup.inlineKeyboard([ 
   [Markup.button.callback("☀️Weather🌥", "weather")],
   [Markup.button.callback("🥳 Birthday 🎉", "birthday")],
   [Markup.button.callback("Past questions 📖", "past_questions")],
]);

bot.start((ctx) => {
   const startPayload = ctx.startPayload;
   if (startPayload) {
      console.log(startPayload);
   } else {
      const replyKeyboard = userKeyboardCommands.resize();
      ctx.reply("What would you like to do", replyKeyboard);
   }
});


bot.on("document", async (ctx) => { 
   ctx.scene.enter(getFileInfoScene);
});

bot.action("birthday", (ctx) => {
   ctx.answerCbQuery();
   if (
      ctx.chat.type == "group" ||
      ctx.chat.type == "supergroup" ||
      ctx.chat.type == "channel"
   ) {
      ctx.scene.enter("birthdayScene");
   } else {
      ctx.scene.enter("birthdayScene");
   }
});

bot.command("developer", async (ctx) => {
   if (ctx.chat.id === 1173903586) {
      ctx.scene.enter("developerScene");
   }
});

bot.action("weather", (ctx) => {
   ctx.scene.enter("getWeather");
});

bot.action("past_questions", (ctx) => {
   ctx.answerCbQuery();
   ctx.scene.enter("getPastQuestionScene")
});

bot.launch();
