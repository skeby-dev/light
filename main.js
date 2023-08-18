const { Markup, session } = require("telegraf");
const { getWeather, getFacts, getQuotes } = require("./docs/functions.js"); // i imported some functions for the weather and some other fuctionalities. You can ctrl + click require location to check it out
const dotenv = require("dotenv"); // this is for the .env file, it is at the root directory i'm using it to hide the api keys in case someone else get holds of the code. you can ask chatgpt to tell you more about it. you won't see it on github but i'll send it to you. 
const { bot } = require("./docs/bot.js");// the code was getting too long so i seperated it, its just to kinda of like for creating the bot, u can just copy paste code to chat gpt. 
// const { logPQs, logUser } = require("./docs/database.js");
const { stage } = require("./docs/scenes/index.js");//stages its almost complex, and kind of long to explain i'd rather explain on call or u can ask chat gpt
const getFileInfoScene = "getFileInfo"; //for a scene, its also part of stages we can talk face to face about it
dotenv.config();

const pastQuestionsCB = "past_questions"; 
let tracker = ""; // doesn't do what's suppose to do, so not functional yet, worked for a while, until code got too big
let userPastQuestionSelections = { level: "", department: "" };

const userKeyboardCommands = Markup.inlineKeyboard([ //okay this is just creating the buttons, its actually the main menu btns, if u start the but u'll see, normally u create buttons when u declare a command or an action(explanation about actions is later) but i created this as a global variable because intially i wanted users to be able to go back to main menu if there was an error
   [Markup.button.callback("☀️Weather⛅️", "weather")],
   [
      Markup.button.callback("Facts 📚", "facts"),
      Markup.button.callback("Quotes 📚", "quotes"),
   ],
   [
      Markup.button.url(
         "🥳 Birthday 🎉",
         "t.me/culight_bot?start=start&scene=birthdayScene"
      ),
   ],
   [Markup.button.callback("🥳 Birthday OG🎉", "birthday")],
   [Markup.button.callback("Past questions 📖", pastQuestionsCB)],
]);

bot.start((ctx) => {//start command, 
   const startPayload = ctx.startPayload;//not useful for now, the if statement if also not useful, and since the if is not usefull it automatically jumps to else which is the actuall code running
   if (startPayload) {
      console.log(startPayload);//not useful
   } else {
      const replyKeyboard = userKeyboardCommands.resize();
      ctx.reply("What would you like to do", replyKeyboard);
   }
});

bot.use(session()); //for scenes and stages we can talk more on call
bot.use(stage.middleware());//same

bot.on("document", async (ctx) => { // so this shouldn't yet be 
   ctx.scene.enter(getFileInfoScene);
});

bot.action("birthday", (ctx) => {
   if (
      ctx.chat.type == "group" ||
      ctx.chat.type == "supergroup" ||
      ctx.chat.type == "channel"
   ) {
      // ctx.
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

bot.help((ctx) => {
   const replyKeyboard = Markup.keyboard([
      Markup.button.callback("/weather", "weather"),
   ])
      .oneTime()
      .resize();

   if (ctx.chat.type === "group") {
      console.log(ctx.chat.id);
   }

   ctx.reply("pick from available commands", replyKeyboard);
});

bot.action("facts", async (ctx) => {
   ctx.answerCbQuery();
   let fact = await getFacts();
   console.log(fact);
   ctx.reply(`Fact: ${fact}`);
});

bot.action("quotes", async (ctx) => {
   ctx.answerCbQuery();
   const [author, quote] = await getQuotes();
   ctx.reply(`quote: ${quote} - ${author}`);
});

bot.action("weather", (ctx) => {
   ctx.scene.enter("getWeather");
});

bot.action(pastQuestionsCB, (ctx) => {
   ctx.answerCbQuery();
   getSemester(ctx);
});

bot.action("alpha_semester", (ctx) => {
   ctx.answerCbQuery;
   getLevel(ctx);
});

bot.action("omega_semester", (ctx) => {
   ctx.answerCbQuery;
   getLevel(ctx);
});

bot.action("100_level", (ctx) => {
   ctx.answerCbQuery();
   userPastQuestionSelections.level = "100 Level";
   chooseDepartment(ctx);

   const groupID = -707243581;
   const hashtag = "#acc211";

   forwardTaggedFiles(ctx, groupID, hashtag);
});

bot.action("200_level", (ctx) => {
   ctx.answerCbQuery();
   userPastQuestionSelections.level = "200 Level";
   chooseDepartment(ctx);
});

bot.action("300_level", (ctx) => {
   ctx.answerCbQuery();
   userPastQuestionSelections.level = "300 Level";
   chooseDepartment(ctx);
});

bot.action("400_level", (ctx) => {
   ctx.answerCbQuery();
   userPastQuestionSelections.level = "400 Level";
   chooseDepartment(ctx);
});

bot.action("accounting", async (ctx) => {
   ctx.answerCbQuery();
   await getAccountingPQs(ctx);
});

bot.action("general", (ctx) => {
   ctx.answerCbQuery();
   getGeneralPQs(ctx);
});

bot.action("back", (ctx) => {
   if (tracker == "start") {
      ctx.editMessageText("what would you like to do", userKeyboardCommands);
   } else {
      tracker(ctx);
   }
});

bot.launch();

async function chooseDepartment(ctx) {
   const replyKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("Accounting 🔥🔥", "accounting")],
      [Markup.button.callback("General", "general")],
      [Markup.button.callback("<<", "back")],
   ]);

   ctx.editMessageText(
      `You selected ${userPastQuestionSelections.level}.\nChoose your departmment`,
      replyKeyboard
   );

   tracker = getLevel;
   console.log("Error Calliing chooseDeparment()");
}

function getSemester(ctx) {
   const replyKeyboard = Markup.inlineKeyboard([
      Markup.button.callback("Alpha", "alpha_semester"),
      Markup.button.callback("Omega", "omega_semester"),
   ]);

   ctx.editMessageText("Select Semester", replyKeyboard);
}

function getLevel(ctx) {
   const replyKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("100 Level", "100_level")],
      [Markup.button.callback("200 Level", "200_level")],
      [Markup.button.callback("300 Level", "300_level")],
      [Markup.button.callback("400 Level", "400_level")],
      [Markup.button.callback("<<", "back")],
   ]);

   ctx.editMessageText("Select Your Level", replyKeyboard);
   tracker = "start";
   console.log("Error Calling getLevel ");
}

function getAccountingPQs(ctx) {
   const replyKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("100 lvl Acc", "100_lvl_acc")],
      [Markup.button.callback("200 lvl", "200_lvl_acc")],
      [Markup.button.callback("300 lvl", "300_lvl_acc")],
      [Markup.button.callback("400 lvl", "400_lvl_acc")],
      [Markup.button.callback("<<", "back")],
   ]);

   ctx.editMessageText("Choose Level", replyKeyboard);
   tracker = getLevel;
   console.log("Error Calliing getAccoutingPQs");
}

function getGeneralPQs(ctx) {
   const replyKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("100 lvl General", "100_lvl")],
      [Markup.button.callback("200 lvl", "200_lvl")],
      [Markup.button.callback("300 lvl", "300_lvl")],
      [Markup.button.callback("400 lvl", "400")],
      [Markup.button.callback("<<", "back")],
   ]);

   ctx.editMessageText("Choose Level", replyKeyboard);
   tracker = getPastQuestionsF;
}

function getHashTag(ctx) {
   const replyKeyboard = Markup.keyboard([
      Markup.button.callback("#acc111"),
      Markup.button.callback("#acc511"),
      Markup.button.callback("#acc611"),
   ]);

   ctx.reply("testo testo", replyKeyboard);
}
