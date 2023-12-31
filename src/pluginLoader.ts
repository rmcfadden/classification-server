import { PluginsMeta } from "./types/pluginsMeta";
import publicPlugins from "./publicPlugins.json";
import {
    ClassifierBase,
    ISupportsName,
    ModelBase,
    PluginMeta,
    PreProcessorBase,
    KeyValuePair,
} from "types";
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

    const addToFactories = (obj: ISupportsName): KeyValuePair => {
        if (!isAnyBase(obj)) throw new Error("Type does not implement any plugin types");
        if (isModelBase(obj)) {
            ModelsFactory.add(obj);
            return { key: "model", value: obj.name };
        }
        if (isClassifierBase(obj)) {
            ClassifiersFactory.add(obj);
            return { key: "classifier", value: obj.name };
        }
        if (isDataSetsBase(obj)) {
            DataSetsFactory.add(obj);
            return { key: "dataSet", value: obj.name };
        }
        if (isPreProcessorBase(obj)) {
            PreProcessorsFactory.add(obj);
            return { key: "preProcessor", value: obj.name };
        }
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
            console.log(
                plugins.reduce(
                    (a, c, i) =>
                        a +
                        `Added plugin type ${c.key}, plugin name ${c.value}${
                            i !== plugins.length - 1 ? "\n" : ""
                        }`,
                    ""
                )
            );
        } catch (err) {
            console.log(`Error loading plugin ${packageName}.  Error: ${err}`);
        }
    };
    const load = async () => {
        const { plugins } = publicPlugins as PluginsMeta;
        await Promise.all(plugins.map(loadPlugin));
    };

    return { load };
};
