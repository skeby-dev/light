const { Scenes } = require("telegraf");
const { hashTagScene, getHashTagScene } = require("./hashTagScene");
const { fileInfoScene, getFileInfoScene } = require("./fileInfoScene");
const { getWeatherScene, getWeatherRequestLocationScene } = require("./weatherScene")
const {developerScene} = require("./developerScene")
const {
   birthdayScene,
   registerWithCSV,
   registerBirthdayNameScene,
   registerBirthdayUsernameScene,
   registerBirthdayDateScene,
} = require("./birthdayScene");

const stage = new Scenes.Stage([
   hashTagScene,
   fileInfoScene,
   birthdayScene,
   registerWithCSV,
   registerBirthdayNameScene,
   registerBirthdayUsernameScene,
   registerBirthdayDateScene,
   getWeatherScene, 
   getWeatherRequestLocationScene,
   developerScene
]);

module.exports = { stage };
