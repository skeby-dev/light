const { Scenes, Markup } = require("telegraf");


const developerScene = new Scenes.BaseScene("developerScene");

const developerHomeKeyboard = Markup.inlineKeyboard([
    Markup.button.callback("Birthdays", "check_birthdays"),
    Markup.button.callback("Past Question", "")
])

developerScene.enter(async (ctx) => {
    developerID = ctx.chat.id;
    ctx.telegram.sendMessage(developerID, "You have eneterd developer mode")
    ctx.telegram.sendMessage(developerID, "Developer Mode", {
        reply_markup: developerHomeKeyboard,
    })
})      

module.exports = {developerScene};