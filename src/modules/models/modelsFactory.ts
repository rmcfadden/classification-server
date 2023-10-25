import { ModelBase } from "../../types/modelBase";
import { TextModel } from "./textModel";
import { DataPointFeaturesModel } from "./dataPointFeaturesModel";
import { ImagesModel } from "./imagesModel";
import { DataPointsModel } from "./dataPointsModel";
import { NDDataPointFeaturesModel } from "./nDDataPointFeaturesModel";

export const ModelsFactory = () => {
    const modelsLookup = new Map<string, ModelBase>([
        ["text", TextModel([])],
        ["dataPointFeature", DataPointFeaturesModel([])],
        ["dataPoint", DataPointsModel([])],
        ["nDDataPointFeature", NDDataPointFeaturesModel([])],
        ["image", ImagesModel([])],
    ]);
    const create = (name: string): ModelBase => {
        const model = modelsLookup.get(name);
        if (!model) throw new Error(`Cannot find model name ${name}`);
        return model;
    };
    const getKeys = (): string[] => Array.from(modelsLookup.keys());
    return { create, getKeys };
};
