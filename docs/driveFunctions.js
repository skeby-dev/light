const fs = require("fs");
const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");
const { file } = require("googleapis/build/src/apis/file");
const { error } = require("console");
const keyFile = process.env.GOOGLE_APP_CREDENTIALS;
require("dotenv").config();

const auth = new GoogleAuth({
   keyFilename: process.env.GOOGLE_APP_CREDENTIALS,
   scopes: "https://www.googleapis.com/auth/drive",
});

const drive = google.drive({
   version: "v3",
   auth,
});

async function uploadFileToLightDrive(name, parentID, filePath, mimeType) {
   const requestBody = {
      name: name,
      parents: [parentID],
   };

   const media = {
      mimeType: "application/json",
      body: fs.createReadStream(filePath),
   };

   try {
      const file = await drive.files.create({
         requestBody,
         media,
         fields: "id",
      });
      return file.data.id;
   } catch (error) {
      console.error("Error Uploading File to Drive", error);
   }
}

async function downloadFromLightDrive(fileId) {
   try {
      const response = await drive.files.get(
         { fileId, alt: "media" },
         { responseType: "stream" }
      );

      const fileContent = response.data;
      const parsedData = JSON.parse(fileContent);
      return parsedData;
   } catch (error) {
      console.error("Error downloading file:", error);
   }
}

async function updateFileinLightDrive(fileID, newContent, mimeType) {
    try{
        const response = await drive.files.update({
            fileId: fileID,
            media: {
                mimeType: "application/json",
                body: newContent,
            }
        })
        console.log(`${fileID} content updated:`, response.data);
    }catch(error) {
        console.error(`Error updating drive file:`, error)
    }
}

module.exports = { uploadFileToLightDrive, downloadFromLightDrive, updateFileinLightDrive };
