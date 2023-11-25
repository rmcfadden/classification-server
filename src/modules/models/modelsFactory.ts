import { ModelBase } from "../../types/modelBase";
import { TextModel } from "./textModel";
import { DataPointLabelsModel } from "./dataPointLabelsModel";
import { ImagesModel } from "./imagesModel";
import { DataPointsModel } from "./dataPointsModel";
import { NDDataPointLabelsModel } from "./nDDataPointLabelsModel";

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
    ["dataPointLabel", DataPointLabelsModel([])],
    ["dataPoint", DataPointsModel([])],
    ["nDDataPointLabel", NDDataPointLabelsModel([])],
    ["image", ImagesModel([])],
]);

ModelsFactory.add = (model: ModelBase) =>
    (ModelsFactory.lookup = ModelsFactory.lookup.set(model.name, model));
