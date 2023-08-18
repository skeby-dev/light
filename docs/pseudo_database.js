const { error } = require("console");
const fs = require("fs");
const async = require("async");
const path = require("path");

// const writeQueue = async.queue(async (task) => {
//    try {
//       const { filePath, data } = task;
//       console.log(data)
//       await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
//       console.log(`${filePath} updated successfully`)
//    } catch (error) {
//       console.error(`Error updating ${task.filePath}:`, error);
//    }
// },1);

// function enqueueUpdate(filePath, data){
//    writeQueue.push({filePath, data})
// }

async function storeDocumentID(values, hashtag) {
   const dirPath = path.join(__dirname, "PQ data");
   const filePath = path.join(dirPath, hashtag + ".json");

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

   } catch (err) {
      console.error(
         `Error creating or appending ${hashtag} directory or document:`,
         err
      );
   }
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
