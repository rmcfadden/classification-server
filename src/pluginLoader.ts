import { PluginsMeta } from "types/pluginsMeta"
import publicPlugins from "./publicPlugins.json"
import { ClassifierBase, ModelBase, PluginMeta } from "types"
import { ClassifiersFactory } from "./modules/classifiers/classifiersFactory";

export const PlugionLoader = () => {

    const isModelBase = (obj: any): obj is ModelBase => 'train' in obj && 'predict' in obj;
    const isClassifierBase = (obj: any): obj is ClassifierBase => 'classify' in obj;

    const loadPlugin = async (plugin: PluginMeta) => {
        const { url } = plugin;
        const packageName = url.substring(url.lastIndexOf('/') + 1);
        console.log(`Loading package: ${packageName}`);
        const currentModules = await import(`${packageName}`);
        Object.entries(currentModules)
            .filter(([_, v]) => (v as any) instanceof Function)
            .map(([_, v]) => {
                console.log('v: ', v)
                const methods = (v as Function)();
                console.log(isModelBase(methods))
                console.log(isClassifierBase(methods))

                if (isClassifierBase(methods)) {
                    const { add } = ClassifiersFactory();
                    add("asdf-asdf-asdf", methods);
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