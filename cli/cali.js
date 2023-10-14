var args = process.argv.slice(2);
var commands = new Map([
    ["install", function () { console.log('HADE IT HERE!!!!!!!!!!!!!!!'); }]
]);
var command = commands.get(args[0]);
if (!command) {
    console.log("Invalid command: ".concat(args[0]));
    process.exit();
}
command();
