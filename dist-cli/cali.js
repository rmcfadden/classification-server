"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var install_1 = require("./commands/install");
var args = process.argv.slice(2);
var commands = new Map([
    ["install", install_1.default]
]);
var command = commands.get(args[0]);
if (!command) {
    console.log("Invalid command: ".concat(args[0]));
    process.exit();
}
command(args);
