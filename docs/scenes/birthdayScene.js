const { Scenes, Markup } = require("telegraf");
const csvParser = require("csv-parser")
const birthdayScene = new Scenes.BaseScene("birthdayScene");
const registerWithCSV = new Scenes.BaseScene("registerWithCSV");
const registerBirthdayNameScene = new Scenes.BaseScene(
   "registerBirthdayNameScene"
);
const registerBirthdayUsernameScene = new Scenes.BaseScene(
   "registerBirthdayUsername"
);
const registerBirthdayDateScene = new Scenes.BaseScene("registerBirthdayDate");

birthdayScene.enter((ctx) => {
   const replyKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("Get month's celebrants 🎁", "celebrants")],
      [
         Markup.button.callback("Register Birthday 👤", "register_bday"),
         Markup.button.callback("<<", "back"),
      ],
   ]);
   ctx.editMessageText("what would you like to do", replyKeyboard);
});

birthdayScene.action("register_bday", (ctx) => {
   ctx.answerCbQuery();
   const replyKeyboard = Markup.inlineKeyboard([
      [Markup.button.callback("Register a Person", "regPerson")],
      [
         Markup.button.callback(
            "Register in Using Excel(Bulk Registratin)",
            "regWithCSV"
         ),
      ],
   ]);
   ctx.editMessageText(
      "Please choose suitable method of registration. All instructions should be followed thorougly",
      replyKeyboard
   );
});

birthdayScene.action("celebrants", (ctx) => {
   ctx.answerCbQuery();
});

birthdayScene.action("back", (ctx) => {
   ctx.answerCbQuery();
   ctx.reply("Back at you");
});

birthdayScene.action("regPerson", (ctx) => {
   ctx.answerCbQuery();
   ctx.scene.enter("registerBirthdayNameScene");
});

birthdayScene.action("regWithCSV", (ctx) => {
   ctx.answerCbQuery();
   ctx.scene.enter("registerWithCSV");
});

registerWithCSV.enter((ctx) => {
   ctx.editMessageText("Please Follow Instructions Carefully");
   const instructions = `
🎉*Birthday Collection Instructions*🎉

To ensure we send you the best birthday wishes, please follow these steps to fill out the CSV template:

1\\. *Download Template*: "Attached is a template, download Template to your local disk\\.

2\\. *Open File:*
   \\- Open the downloaded CSV file using Microsoft Excel or a similar spreadsheet software\\.

3\\. *Enter Your Information:*
   \\- In the CSV file, you\\'ll see columns labeled *"Name"* and *"Birthday"*\\.
   \\- Enter your name in the *"Name"* column\\.
   \\- Enter your birthday in the *"Birthday"* column using the format \`YYYY-MM-DD\` \\(e\\.g\\., \`1990\\-12\\-31\`\\)\\.

4\\. *Save:*
   \\- Save the completed CSV file on your computer\\.
   \\-Ensure file is saved with csv\\(Comma delimited\\) if not by default\\.

5\\. *Send the File:*
   \\- Return to our chat and upload the completed CSV file by sending it as a document\\.

That\\'s it\\! Your birthday information will be safely collected, and we\\'ll make sure to send you wonderful birthday wishes on your special day\\.

Thank you for sharing your birthday with us\\! 🎂
`;

   ctx.replyWithDocument(
      "BQACAgQAAxkBAAIHpGTcn0y3pHjcsRREKXOKdPdPIBTOAAI-EgACponpUpOLjr-44jrxMAQ",
      {
         caption: instructions,
         parse_mode: "MarkdownV2",
      }
   );
});

registerWithCSV.on("document", async (ctx) => {
   const documentID = ctx.message.document.file_id
   const groupName = ctx.chat.title
   if (ctx.message.document.mime_type == "text/csv") {
      const result = await ctx.telegram.sendDocument("-881489732", documentID, {
         caption: documentID,
      })
      if(result){
         ctx.reply("Your birthday file has been securely stored. If you need further assistance, feel free to contact developer.");
         ctx.scene.leave()
      }
      const loll = await ctx.telegram.getFileLink(documentID);
      fileUrl = loll.href;
   
      const response = await fetch(fileUrl);
      const arrBuffer = await response.arrayBuffer();
      const fileBuffer = Buffer.from(arrBuffer);
   
      const jsonData = [];
      csvParser()
         .on('data', (data) => {
            jsonData.push(data);
         })
         .on('end', () => {
            console.log(jsonData);
         })
         .end(fileBuffer.toString('utf-8'));
   } else {
      ctx.reply(
         "Sorry document provided is not saved as an csv file e\\.g _*accounting birthdays\\.csv*_\\.\n If issue persist please contact developer",
         {
            parse_mode: "MarkdownV2",
         }
      );
   }

});

module.exports = {
   birthdayScene,
   registerWithCSV,
};
