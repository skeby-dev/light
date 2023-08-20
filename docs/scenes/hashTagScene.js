const { Scenes, Markup } = require("telegraf");
const { getDocumentsID, storeDocumentID } = require("../pseudo_database");
const getHashTagScene = "getHashTag";
const hashTagScene = new Scenes.BaseScene(getHashTagScene);

hashTagScene.enter((ctx) => {
   const mediaGroupID = ctx.message.media_group_id;
   if (mediaGroupID) {
      // checks if files are sent as a group
      if (!ctx.session.media_group_id) {
         //due to multiple files, makes sure messages are sent once
         ctx.session.media_group_id = mediaGroupID;
         ctx.reply(
            "Please provide *required hashtag* for this group of documents *e\\.g*'\\#acc211\\_pq' *by replying original group of document with hashtag*",
            {
               reply_to_message_id: ctx.session.originalMessageID,
               parse_mode: "MarkdownV2",
            }
         );
      }
   } else {
      //reply for single document
      ctx.reply(
         "Please provide document *hashtag* in required format\\. *e\\.g* '_\\#acc211\\_pq_' *by replying original document with hashtag*",
         {
            reply_to_message_id: ctx.session.originalMessageID,
            parse_mode: "MarkdownV2",
         }
      );
   }
});

hashTagScene.hears(/#[^\s]+/, async (ctx) => {
   const hashTagMessageID = ctx.message.message_id;
   const hashtagMessage = ctx.message.text
   let result;
   try {
      await ctx.session.values.forEach(async (document) => {
         document.pq_hashtag = hashtagMessage;
         //  console.log(document)
      });
      await storeDocumentID(ctx,ctx.session.values, hashtagMessage);

      ctx.scene.leave();
      console.log(ctx.scene.current);
   } catch (error) {
      ctx.reply(
         "Sorry grouped documents not recorded, try again later or contact developer",
         {
            reply_to_message_id: hashTagMessageID,
         }
      );

      console.log(error);
   }
});

module.exports = { hashTagScene, getHashTagScene };
