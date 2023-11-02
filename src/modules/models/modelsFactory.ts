import { ModelBase } from "../../types/modelBase";
import { TextModel } from "./textModel";
import { DataPointFeaturesModel } from "./dataPointFeaturesModel";
import { ImagesModel } from "./imagesModel";
import { DataPointsModel } from "./dataPointsModel";
import { NDDataPointFeaturesModel } from "./nDDataPointFeaturesModel";

export const ModelsFactory = () => {
    const { lookup } = ModelsFactory;
    const create = (name: string): ModelBase => {
        const model = lookup.get(name);
        if (!model) throw new Error(`Cannot find model name ${name}`);
        return model;
    };
    const getKeys = (): string[] => Array.from(lookup.keys());
    return { create, getKeys };
};

ModelsFactory.lookup = new Map<string, ModelBase>([
    ["text", TextModel([])],
    ["dataPointFeature", DataPointFeaturesModel([])],
    ["dataPoint", DataPointsModel([])],
    ["nDDataPointFeature", NDDataPointFeaturesModel([])],
    ["image", ImagesModel([])],
]);

ModelsFactory.add = (key: string, model: ModelBase) =>
    (ModelsFactory.lookup = ModelsFactory.lookup.set(key, model));
