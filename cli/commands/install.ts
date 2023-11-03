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

const install = async (args: string[]) => {
    const publicPlugins = await import("../publicPlugins.json");

    console.log("publicPlugins", publicPlugins);
    const command =
        "yarn add --registry https://registry.yarnpkg.com/ https://github.com/rmcfadden/classification-server-kd-tree";
    console.log(`Running install commmand: ${command}`);

    await run(command);
};

export default install;
