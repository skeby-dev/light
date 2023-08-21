const { Scenes, Markup } = require("telegraf");
const { bot } = require("../bot");
const getPastQuestionScene = new Scenes.BaseScene("getPastQuestionScene");
const { hashtagInfoFileID } = require("../pseudo_database")
require("dotenv").config();

//functions for buttons.

//called 1st
async function chooseDepartment(ctx) {
   const replyKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("Accounting 🔥🔥", "accounting")],
      [Markup.button.callback("General", "general")],
      [Markup.button.callback("<<", "back")],
   ]);

   ctx.editMessageText("Choose your departmment", replyKeyboard);
}
//called 2nd
function getSemester(ctx) {
   const replyKeyboard = Markup.inlineKeyboard([
      [
         Markup.button.callback("Alpha", "alpha_semester"),
         Markup.button.callback("Omega", "omega_semester"),
      ],
      [Markup.button.callback("<<", "back")],
   ]);

   ctx.editMessageText("Select Semester", replyKeyboard);
}

//called 3rd
function getLevel(ctx) {
   const replyKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("100 Level", "100_level")],
      [Markup.button.callback("200 Level", "200_level")],
      [Markup.button.callback("300 Level", "300_level")],
      [Markup.button.callback("400 Level", "400_level")],
      [Markup.button.callback("<<", "back")],
   ]);

   ctx.editMessageText("Select Your Level", replyKeyboard);
}

const coursesInformation = {
   Accounting: {
      "200_level": {
         alpha_semester: [
            "ACC211",
            "ACC212",
            "ACC215",
            "BFN211",
            "BUS211",
            "CBS211",
            "CIT214",
            "ECN211",
            "ECN212",
         ],
         omega_semester: [
            "ACC221",
            "ACC222",
            "ACC223",
            "ACC224",
            "ACC229",
            "BUS221",
            "CBS221",
            "CIT224",
         ],
      },
   },
};

function showCourseCodeBtns(ctx, arr) {
   let buttons = [];
   arr.forEach((item) => {
      buttons.push([Markup.button.callback(item, `${item}_PQ`)]);
   });
   console.log(buttons);
   ctx.reply("Pick one", Markup.inlineKeyboard(buttons));
}

async function setupCourseCodeActions(arr) {
   arr.forEach((item) => {
      getPastQuestionScene.action(`${item}_PQ`, async (ctx) => {
         const fileInfo = await ctx.telegram.getFileLink("BQACAgQAAxkDAAIBR2TiqdlylVHcbB6Jg-avwS8ZcK9VAAL7EQACC9cZU97VLi0DPjRCMAQ")
         console.log(fileInfo)
         const fileUrl = fileInfo.href
         const response = await fetch(fileUrl)
         if (!response.ok) {
            throw new Error(`Failed to fetch the file. Status code: ${response.status}`);
          }

          const fileContent = await response.text(); // Read the response as text

          const JsonObject = JSON.parse(fileContent);
          console.log(JsonObject)

          JsonObject.forEach(item => {
            item.forEach(item => {
               ctx.sendDocument(document=`${item["pq_id"]}`)
            })
          })
        
      });
   });
}

setupCourseCodeActions(coursesInformation.Accounting["200_level"].alpha_semester)

function getPastQuestion(department, semester, level) {}

getPastQuestionScene.enter((ctx) => {
   chooseDepartment(ctx);
});

//actions from choose department
const chooseDeparmentActions = ["accounting", "general", "back"];

chooseDeparmentActions.forEach((action) => {
   getPastQuestionScene.action(action, (ctx) => {
      ctx.answerCbQuery();
      getSemester(ctx);
      let selectedDeparment = action;
   });
});

//actions from getSemester
const getSemesterActions = ["alpha_semester", "omega_semester"];

getSemesterActions.forEach((action) => {
   getPastQuestionScene.action(action, (ctx) => {
      ctx.answerCbQuery();
      getLevel(ctx);
      let selectedSemester = action;
   });
});

//actions from getLevel
const getLevelActions = ["100_level", "200_level", "300_level", "400_level"];

getLevelActions.forEach((action) => {
   getPastQuestionScene.action(action, (ctx) => {
      ctx.answerCbQuery();
      showCourseCodeBtns(
         ctx,
         coursesInformation.Accounting[action].alpha_semester
      );
      ctx.editMessageText(`You are in: ${action}`); //final action in progress
      let selectedLevel = action;
   });
});

module.exports = { getPastQuestionScene };
