const fs = require("fs");
const path = require("path");
const { Input } = require("telegraf");
const {
   uploadFileToLightDrive,
   downloadFromLightDrive,
   updateFileinLightDrive,
} = require("./driveFunctions");
const lightFolderID = "1abDDNYRAVTUQgPxedOvd45e2o6OvT4OW";
let lightIndex = {};
let lightIndexID;

async function storeDocumentID(ctx, values, hashtag) {
   const dirPath = path.join(__dirname, "PQ data");
   const fileName = hashtag + ".json";
   const filePath = path.join(dirPath, fileName);

   try {
      await fs.promises.mkdir(dirPath, { recursive: true });

      let data = [];
      try {
         const existingData = await fs.promises.readFile(filePath, "utf8");
         data = await JSON.parse(existingData);
      } catch (err) {
         console.log("nothing inside file");
      }

      data.push(values);
      await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
      ctx.reply("PQs stored successfully");

      hashtagInfoOnTelegramServer = await ctx.telegram.sendDocument(
         (chatID = 1173903586),
         Input.fromLocalFile(filePath)
      );
      hashtagInfoFileID = hashtagInfoOnTelegramServer.document.file_id;

      lightIndex[hashtag] = hashtagInfoFileID;
      const JsonIndexData = JSON.stringify(lightIndex);

      await updateFileinLightDrive(
         lightIndexID,
         JsonIndexData,
         "application/json"
      );
   } catch (err) {
      console.error(
         `Error creating or appending ${hashtag} directory or document:`,
         err
      );
   }
}

async function getPQIndexFromGoogleDrive() {
   try {
      lightIndex = await downloadFromLightDrive(lightIndexID); //if light indexID is undefined will show error
      if (!lightIndex) {
         lightIndex = {};
         const filePath = path.join(__dirname, "lightIndex.json");

         JsonData = JSON.stringify(lightIndex, null, 2);

         await fs.promises.writeFile(filePath, JsonData);
         lightIndexID = await uploadFileToLightDrive(
            "lightIndex",
            lightFolderID,
            filePath
         );
         console.log(lightIndexID);
      }
   } catch (error) {
      console.error("Error Getting PQ Index Data:", error);
   }
}

getPQIndexFromGoogleDrive();

function getDocumentsID(hashtag) {
   try {
      const filePath = path.join("data", hashtag + ".txt");
      const data = fs.readFileSync(filePath, "utf8");
      const documentIDs = data.split("\n").filter((id) => id !== "");
      return documentIDs;
   } catch (error) {
      console.error("Error reading file:", error);
      return [];
   }
}

async function storeDocument(
   name,
   folderName = "data",
   fileType = ".txt",
   information
) {
   const dirPath = path.join(__dirname, folderName);
   const filePath = path.join(dirPath, name + fileType);
   let data = information + ",";
   if (fileType === ".json") {
      data = JSON.stringify(data);
   }

   fs.mkdir(dirPath, { recursive: true }, (error) => {
      if (error) {
         console.error("Error creating file:", error);
      } else {
         fs.appendFileSync(filePath, data, (error) => {
            if (error) {
               console.error(`Error updating ${name} information:`, error);
            } else {
               console.log(`${name} updated successfully`);
            }
         });
      }
   });
}

module.exports = { storeDocumentID, getDocumentsID, storeDocument };
