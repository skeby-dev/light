const { Scenes, Markup } = require("telegraf");
const { bot } = require("../bot");


const getPastQuestionScene = new Scenes.BaseScene("getPastQuestionScene")

//functions which show buttons. 

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
      Markup.button.callback("Alpha", "alpha_semester"),
      Markup.button.callback("Omega", "omega_semester"),
   ]);

   ctx.editMessageText("Select Semester", replyKeyboard);
};

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

getPastQuestionScene.enter((ctx) => {
    chooseDepartment(ctx);
})

//actions from choose department
const chooseDeparmentActions =  ["accounting", "general", "back"];

chooseDeparmentActions.forEach((action) => {
    getPastQuestionScene.action(action, (ctx)=> {
        ctx.answerCbQuery();
        getSemester(ctx)
    })
})

//actions from getSemester
const getSemesterActions = ["alpha_semester", "omega_Semester"];

getSemesterActions.forEach((action) => {
    getPastQuestionScene.action(action, (ctx) => {
        ctx.answerCbQuery();
        getLevel(ctx)
    })
})

//actions from getLevel
const getLevelActions = ["100_level", "200_level", "300_level", "400_level"];

getLevelActions.forEach((action) => {
    getPastQuestionScene.action(action, (ctx) => {
        ctx.answerCbQuery();
        ctx.reply( `You are in: ${action}`)//final action in progress
    })
})

 module.exports = { getPastQuestionScene }