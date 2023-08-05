const fs = require("fs");
const path = require("path");

async function storeDocumentID(hashtag,  documentID) {
    const filePath = path.join("data", hashtag + ".txt")
    const data = documentID + "\n"

    fs.appendFile(filePath, data, (error) => {
        if(error) {
            console.error("Error creating/appending to file", error)
        } else {
            console.log("Data appended to file successfully")
        }
    });
}

function getDocumentsID(hashtag) {
    try {
        const filePath = path.join("data", hashtag + ".txt");
        const data = fs.readFileSync(filePath, "utf8");
        const documentIDs = data.split("\n").filter((id) => id !=="");
        return documentIDs;
    } catch(error) {
        console.error("Error reading file:", error);
        return [];
    }
}

module.exports = { storeDocumentID, getDocumentsID }