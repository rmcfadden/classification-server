import { exec } from "child_process";

const run = async (cmd: string) => {
    const child = exec(cmd, (err) => {
        if (err) console.error(err);
    });
    const { stderr, stdout } = child;
    if (!stderr) return console.log("stderr must be defined");
    if (!stdout) return console.log("stdout must be defined");
    stderr.pipe(process.stderr);
    stdout.pipe(process.stdout);
    await new Promise((resolve) => child.on("close", resolve));
};

const install = async (_: string[]) => {
    const { plugins } = await import("../publicPlugins.json");
    console.log("plugins", plugins);
    const packageUrls = plugins.map(({ url }) => url).join(" ");
    const command = `node ./node_modules/yarn-add-no-save/bin/local.js ${packageUrls}`;
    console.log(`Running install commmand: ${command}`);
    await run(command);
};

export default install;
