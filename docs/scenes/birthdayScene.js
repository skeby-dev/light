const {Scenes, Markup} = require("telegraf");
const { getDocumentsID, storeDocumentID } = require("../pseudo_database");
const birthdayScene = new Scenes.BaseScene("birthdayScene");
const registerBirthdayNameScene = new Scenes.BaseScene("registerBirthdayScene");
const registerBirthdayUsernameScene = new Scenes.BaseScene("registerBirthdayUsername");

birthdayScene.enter( ctx => {
    const replyKeyboard = Markup.inlineKeyboard([[
        Markup.button.callback("Get month's celebrants 🎁", "celebrants"),
    ],[
        Markup.button.callback("Register Birthday 👤", "register_bday"),
        Markup.button.callback("<<", "back")
    ]]
    )
    ctx.editMessageText("what would you like to do", replyKeyboard)
})

birthdayScene.action("register_bday", ctx => {
    ctx.answerCbQuery();
    ctx.scene.enter("registerBirthdayScene")
})

birthdayScene.action("celebrants", ctx => {
    ctx.answerCbQuery();

})

birthdayScene.action("back", ctx => {
    ctx.answerCbQuery();
    ctx.reply("Back at you")
})

registerBirthdayNameScene.enter((ctx) => {
    ctx.reply("Please send name of celebrant\\. *_\\*required_*", {
        parse_mode: "MarkdownV2"
    })

})

registerBirthdayNameScene.on("text", async (ctx) => {
    await ctx.reply(`Celebrant name set to *_${ctx.message.text}_* ✅` ,{
        parse_mode: "MarkdownV2"
    });
    ctx.scene.enter("registerBirthdayUsername");
    
})

registerBirthdayUsernameScene.enter(ctx => {
    const replyKeyboard = Markup.inlineKeyboard([
        Markup.button.callback("Skip", "skip")
    ]).oneTime().resize();
    ctx.reply("Please enter celebrant username e.g @gb0ye",replyKeyboard);
})

registerBirthdayUsernameScene.on("text", async (ctx) => {
    await ctx.reply(`Celebrant username set to *_@${ctx.message.text}_* ✅` ,{
        parse_mode: "MarkdownV2"
    });
    // ctx.scene.enter("")
})

registerBirthdayUsernameScene.action("skip", ctx => {
    ctx.answerCbQuery();
    ctx.editMessageText("Username skipped ☑️",);
    // ctx.scene.enter("")
})

module.exports = {birthdayScene, registerBirthdayNameScene, registerBirthdayUsernameScene}