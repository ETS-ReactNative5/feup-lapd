var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./token");

module.exports = localStorage;
