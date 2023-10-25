import { ClassifyQuery } from "../../types/classifyQuery";
import { ClassifierBase } from "../../types/classifierBase";
import { ClassifyDataSetQuery } from "../../types/classifyDataSetQuery";
import { ModelsFactory } from "../models/modelsFactory";
import { NumericalClassifyResponse } from "../../types/numericalClassifyResponse";
import { NumericalPredictionResult } from "../../types/numericalPredictionResult";
export const NumericalClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text } = query;
        const { dataSet } = query as ClassifyDataSetQuery;
        const modelsFactory = ModelsFactory();
        const model = modelsFactory.create("dataPoint");
        const predictionModel = await model.train(dataSet);
        const { result } = (await predictionModel.predict(text)) as NumericalPredictionResult;
        return { result } as NumericalClassifyResponse;
    };
    return { classify } as ClassifierBase;
};
