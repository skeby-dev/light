const { Markup, session } = require("telegraf");
const { getWeather, getFacts, getQuotes } = require("./docs/functions.js");
const dotenv = require("dotenv");
const { bot } = require("./docs/bot.js");
const { stage } = require("./docs/scenes/index.js");
const csvParser = require("csv-parser");
const getFileInfoScene = "getFileInfo";
dotenv.config();

bot.use(session());
bot.use(stage.middleware());

const userKeyboardCommands = Markup.inlineKeyboard([
   [Markup.button.callback("☀️Weather🌥", "weather")],
   [Markup.button.callback("🥳 Birthday 🎉", "birthday")],
   [Markup.button.callback("Past questions 📖", "past_questions")],
]);

bot.start(async (ctx) => {
   const startPayload = ctx.startPayload;
   const loll = await ctx.telegram.getFileLink(
      "BQACAgQAAxkDAAICpGTkAAFVmouMZoxTy7PTTqnGN4gPigACnRIAAgvXIVMjCixdGUHxlTAE"
   );
   fileUrl = loll.href;
   console.log(fileUrl)

//    const response = await fetch(fileUrl);
//    const arrBuffer = await response.arrayBuffer();
//    const fileBuffer = Buffer.from(arrBuffer);

//    const jsonData = [];
//    csvParser()
//      .on('data', (data) => {
//        jsonData.push(data);
//      })
//      .on('end', () => {
//        console.log(jsonData);
//      })
//      .end(fileBuffer.toString('utf-8')); 
//  });

   if (startPayload) {
      console.log(startPayload);
   } else {
      const replyKeyboard = userKeyboardCommands.resize();
      ctx.reply("What would you like to do", replyKeyboard);
   }
});

bot.on("document", async (ctx) => {
   const documentID = ctx.message.message_id;

   if(ctx.chat.type == "private") {
      ctx.reply("Action only allowed in authorized groups", {
         reply_to_message_id: documentID,
      })
   } else {
      ctx.scene.enter(getFileInfoScene);
   }
   // console.log(ctx.message.document.file_id);
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
   ctx.scene.enter("getPastQuestionScene");
});

bot.launch();
