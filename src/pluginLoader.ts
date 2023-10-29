import { PluginsMeta } from "types/pluginsMeta"
import publicPlugins from "./publicPlugins.json"
import { ClassifierBase, ModelBase, PluginMeta } from "types"
import { ClassifiersFactory } from "./modules/classifiers/classifiersFactory";
import { DataSetsBase } from "modules/dataSets/dataSetsBase";

export const PlugionLoader = () => {

    const isModelBase = (obj: any): obj is ModelBase => 'train' in obj && 'predict' in obj;
    const isClassifierBase = (obj: any): obj is ClassifierBase => 'classify' in obj;
    const isDataSetsBase = (obj: any): obj is DataSetsBase => 'add' in obj && 'get' in obj;
    const isAnyBase = (obj: any) => isModelBase(obj) || isClassifierBase(obj) || isDataSetsBase(obj);

    const addToFactories = (obj) => {

    }



    const loadPlugin = async (plugin: PluginMeta) => {
        const { url } = plugin;
        const packageName = url.substring(url.lastIndexOf('/') + 1);
        console.log(`Loading package: ${packageName}`);
        const currentModules = await import(`${packageName}`);
        const plugins = Object.entries(currentModules)
            .filter(([_, v]) => (v as any) instanceof Function)
            .map(([_, v]) => (v as Function)())
            .filter(f => isAnyBase(f))
            .map(f => ({
                "type": isModelBase(f) ? "model" : isClassifierBase(f) ? "classifier" : "datasets",
                "func": f,
            }))
            .map(f => )

    }
    const load = async () => {
        const { plugins } = publicPlugins as PluginsMeta;
        await Promise.all(plugins.map(loadPlugin));
    }


    return { load }
}