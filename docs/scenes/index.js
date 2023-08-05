const { Scenes } = require("telegraf");
const { hashTagScene, getHashTagScene } = require("./hashTagScene");
const { fileInfoScene, getFileInfoScene } = require("./fileInfoScene");

const stage = new Scenes.Stage([hashTagScene, fileInfoScene]);

module.exports = { stage };
