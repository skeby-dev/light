const { Scenes } = require("telegraf");
const { hashTagScene, getHashTagScene } = require("./hashTagScene");
const { fileInfoScene, getFileInfoScene } = require("./fileInfoScene");
const { getWeatherScene, getWeatherRequestLocationScene } = require("./weatherScene")
const {
   birthdayScene,
   registerBirthdayNameScene,
   registerBirthdayUsernameScene,
   registerBirthdayDateScene,
} = require("./birthdayScene");

const stage = new Scenes.Stage([
   hashTagScene,
   fileInfoScene,
   birthdayScene,
   registerBirthdayNameScene,
   registerBirthdayUsernameScene,
   registerBirthdayDateScene,
   getWeatherScene, 
   getWeatherRequestLocationScene
]);

module.exports = { stage };
