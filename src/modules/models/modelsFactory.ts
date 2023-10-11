import { ModelBase } from "./modelBase";
import { TextModel } from "./textModel";
import { DataPointFeaturesModel } from "./dataPointFeaturesModel";
import { ImageModel } from "./imageModel";
import { DataPointsModel } from "./dataPointsModel";

export const ModelsFactory = () => {
    const modelsLookup = new Map<string, ModelBase>([
        ["text", TextModel([])],
        ["dataPointFeature", DataPointFeaturesModel([])],
        ["dataPoint", DataPointsModel([])],

        ["image", ImageModel([])],
    ]);
    const create = (name: string): ModelBase => {
        const model = modelsLookup.get(name);
        if (!model) throw new Error(`Cannot find model name ${name}`);
        return model;
    };
    const getKeys = (): string[] => Array.from(modelsLookup.keys());
    return { create, getKeys };
};
