import { ModuleMeta } from "../types/moduleMeta";
import { ClassifiersFactory } from "./classifiers/classifiersFactory";
import { PreProcessorsFactory } from "./preProcessors/preProcessorsFactory";
import { ModelsFactory } from "./models/modelsFactory";
import { DataSetsFactory } from "./dataSets/dataSetsFactory";

export const getModules = () => {
    const { getKeys: getClassifierKeys } = ClassifiersFactory();
    const classifiers = getClassifierKeys();

    const { getKeys: getPreProcessorsKeys } = PreProcessorsFactory();
    const preProcessors = getPreProcessorsKeys();

    const { getKeys: getModelKeys } = ModelsFactory();
    const models = getModelKeys();

    const { getKeys: getDataSetsKeys } = DataSetsFactory();
    const dataSets = getDataSetsKeys();

    return { classifiers, preProcessors, models, dataSets } as ModuleMeta;
};
