import { PluginsMeta } from "./types/pluginsMeta";
import publicPlugins from "./publicPlugins.json";
import { ClassifierBase, ModelBase, PluginMeta, PreProcessorBase } from "types";
import { ClassifiersFactory } from "./modules/classifiers/classifiersFactory";
import { ModelsFactory } from "./modules/models/modelsFactory";
import { DataSetsFactory } from "./modules/dataSets/dataSetsFactory";
import { PreProcessorsFactory } from "./modules/preProcessors/preProcessorsFactory";

import { DataSetsBase } from "./types/dataSetsBase";

export const PlugionLoader = () => {
    const isModelBase = (obj: any): obj is ModelBase => "train" in obj && "predict" in obj;
    const isClassifierBase = (obj: any): obj is ClassifierBase => "classify" in obj;
    const isDataSetsBase = (obj: any): obj is DataSetsBase => "add" in obj && "get" in obj;
    const isPreProcessorBase = (obj: any): obj is PreProcessorBase => "apply" in obj;

    const isAnyBase = (obj: any) =>
        isModelBase(obj) || isClassifierBase(obj) || isDataSetsBase(obj) || isPreProcessorBase(obj);

    const addToFactories = (obj: any) => {
        if (!isAnyBase(obj)) throw new Error("Type does not implement any plugin types");
        if (isModelBase(obj)) return ModelsFactory.add(obj);
        if (isClassifierBase(obj)) return ClassifiersFactory.add(obj);
        if (isDataSetsBase(obj)) return DataSetsFactory.add(obj);
        if (isPreProcessorBase(obj)) return PreProcessorsFactory.add(obj);
        throw new Error("Type does not implement any plugin types");
    };

    const loadPlugin = async (plugin: PluginMeta) => {
        const { url } = plugin;
        const packageName = url.substring(url.lastIndexOf("/") + 1);
        try {
            console.log(`Loading package: ${packageName}`);
            const currentModules = await import(`${packageName}`);
            const plugins = Object.entries(currentModules)
                .filter(([_, v]) => (v as any) instanceof Function)
                .map(([_, v]) => (v as Function)())
                .filter((f) => isAnyBase(f))
                .map((f) => addToFactories(f));

            console.log("plugins", plugins);
        }
        catch (err) {
            console.log(`Error loading plugin ${packageName}.  Error: ${err}`)
        }
    };
    const load = async () => {
        const { plugins } = publicPlugins as PluginsMeta;
        await Promise.all(plugins.map(loadPlugin));
    };

    return { load };
};
