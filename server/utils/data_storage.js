var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./data");

module.exports = localStorage;
