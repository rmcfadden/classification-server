import { ClassifyQuery } from "../../models/classifyQuery";
import { ClassifierBase } from "./classifierBase";
import { ClassifyDataSetQuery } from "../../models/classifyDataSetQuery"
import { ModelsFactory } from "../models/modelsFactory"
import { NumericalClassifyResponse } from "../../models/numericalClassifyResponse";
import { NumericalPredictionResult } from "../../models/numericalPredictionResult";
export const NumericalClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text } = query;
        const { dataSet } = query as ClassifyDataSetQuery;
        const modelsFactory = ModelsFactory();
        const model = modelsFactory.create("dataPoint");
        const predictionModel = await model.train(dataSet);
        const { result } = await predictionModel.predict(text) as NumericalPredictionResult;
        return { result } as NumericalClassifyResponse;
    }
    return { classify } as ClassifierBase;
}