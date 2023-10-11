import { ModelBase } from "./modelBase";
import { TextModel } from "./textModel";
import { DataPointFeaturesModel } from "./dataPointFeaturesModel";

export const ModelsFactory = () => {
    const modelsLookup = new Map<string, ModelBase>([
        ["text", TextModel([])],
        ["dataPointFeature", DataPointFeaturesModel([])],
    ]);
    const create = (name: string): ModelBase => {
        const model = modelsLookup.get(name);
        if (!model) throw new Error(`Cannot find model name ${name}`);
        return model;
    };
    const getKeys = (): string[] => Array.from(modelsLookup.keys());
    return { create, getKeys };
};