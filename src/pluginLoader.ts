import { PluginsMeta } from "types/pluginsMeta"
import publicPlugins from "./publicPlugins.json"
import { PluginMeta } from "types/pluginMeta"
export const PlugionLoader = () => {
    const loadPlugin = async (plugin: PluginMeta) => {
        const { url } = plugin;
        const packageName = url.substring(url.lastIndexOf('/') + 1);
        console.log(`Loading package: ${packageName}`);
        const currentModules = await import(`${packageName}`);
        Object.entries(currentModules).map(([k, v]) => {

            if ((v as any) instanceof Function) {
                console.log((v as Function)())
            }

        })
    }
    const load = async () => {

        const { plugins } = publicPlugins as PluginsMeta;
        await Promise.all(plugins.map(loadPlugin));
        console.log("LOADING!!")
    }


    return { load }
}