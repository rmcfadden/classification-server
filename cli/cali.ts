
import install from "./commands/install"
const args = process.argv.slice(2);

const commands = new Map<string, ((args: string[]) => void)>([
    ["install", install]
]);

const command = commands.get(args[0]);
if (!command) {
    console.log(`Invalid command: ${args[0]}`);
    process.exit();
}
command(args);
