const { error } = require("console");
const fs = require("fs");
const path = require("path");

async function storeDocumentID(hashtag, documentID) {
   const filePath = path.join("data", hashtag + ".txt");
   const data = documentID + "\n";

   fs.appendFile(filePath, data, (error) => {
      if (error) {
         console.error("Error creating/appending to file", error);
      } else {
         console.log("Data appended to file successfully");
      }
   });
}

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
