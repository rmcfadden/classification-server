const args = process.argv.slice(2);

const commands = new Map<string, (() => void)>([
    ["install", () => { console.log('HADE IT HERE!!!!!!!!!!!!!!!') }]
]);

const command = commands.get(args[0]);
if (!command) {
    console.log(`Invalid command: ${args[0]}`);
    process.exit();
}
command();
