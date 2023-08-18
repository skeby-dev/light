const { Scenes } = require("telegraf");
const { getDocumentsID, storeDocumentID } = require("../pseudo_database")
const getFileInfoScene = "getFileInfo";
const getHashTagScene = "getHashTag";
const fileInfoScene = new Scenes.BaseScene(getFileInfoScene);

fileInfoScene.enter((ctx) => {
   ctx.session.originalMessageID = ctx.message.message_id;
   
   if (!ctx.session.values) {
      ctx.session.values = [];
      const data = {
         pq_id : ctx.message.document.file_id,
         pq_name: ctx.message.document.file_name,
         pq_hashtag: ctx.message.caption,
         pq_group_id: ctx.chat.id
      };
      ctx.session.values.push(data)
      // ctx.session.values.push([
      //    ctx.message.document.file_unique_id,
      //    ctx.message.document.file_name,
      //    ctx.message.document.mime_type,
      //    ctx.message.caption,
      //    ctx.chat.title,
      // ]);
   } else {
      const data = {
         pq_id : ctx.message.document.file_id,
         pq_name: ctx.message.document.file_name,
         pq_hashtag: ctx.message.caption,
         pq_group_id: ctx.chat.id,
      };
      ctx.session.values.push(data)
      // ctx.session.values.push([
      //    ctx.message.document.file_id,
      //    ctx.message.document.file_unique_id,
      //    ctx.message.document.file_name,
      //    ctx.message.document.mime_type,
      //    ctx.message.caption,
      //    ctx.chat.title,
      // ]);
   }
   const caption = ctx.message.caption_entities;
   if (caption) {
      if (caption[0].type === "hashtag") {
         //expected to only work for ungrouped documents since telegram doesn't support caption for grouped
         //if later update support caption this code should also be updated
         ctx.session.values.forEach((document) => {
            storeDocumentID(document);
         });
      }
   } else {
      ctx.scene.enter(getHashTagScene);
   }
});

module.exports = { fileInfoScene, getFileInfoScene };
