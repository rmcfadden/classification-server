import { ModuleMeta } from "../models/moduleMeta";
import { ClassifiersFactory } from "./classifiers/classifiersFactory";
import { PreProcessorsFactory } from "./preProcessors/preProcessorsFactory";
import { ModelsFactory } from "./models/modelsFactory";
import { DatasetsFactory } from "./dataSets/dataSetsFactory";

export const getModules = () => {
    const { getKeys: getClassifierKeys } = ClassifiersFactory();
    const classifiers = getClassifierKeys();

    const { getKeys: getPreProcessorsKeys } = PreProcessorsFactory();
    const preProcessors = getPreProcessorsKeys();

    const { getKeys: getModelKeys } = ModelsFactory();
    const models = getModelKeys();

    const { getKeys: getDataSetsKeys } = DatasetsFactory();
    const dataSets = getDataSetsKeys();

    return { classifiers, preProcessors, models, dataSets } as ModuleMeta;
};
