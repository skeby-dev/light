const { Scenes } = require("telegraf");
const { hashTagScene, getHashTagScene } = require("./hashTagScene");
const { fileInfoScene, getFileInfoScene } = require("./fileInfoScene");
const { getWeatherScene } = require("./weatherScene")
const {
   birthdayScene,
   registerBirthdayNameScene,
   registerBirthdayUsernameScene,
} = require("./birthdayScene");

const stage = new Scenes.Stage([
   hashTagScene,
   fileInfoScene,
   birthdayScene,
   registerBirthdayNameScene,
   registerBirthdayUsernameScene,
   getWeatherScene
]);

module.exports = { stage };
