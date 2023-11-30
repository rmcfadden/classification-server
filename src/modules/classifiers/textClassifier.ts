import { ClassifyQuery } from "../../types/classifyQuery";
import { ClassifierBase } from "../../types/classifierBase";
import { ClassifyDataSetQuery } from "../../types/classifyDataSetQuery";
import { ModelsFactory } from "../models/modelsFactory";
import { LabelClassifyResponse } from "../../types/labelClassifyResponse";
export const TextClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text, dataSet } = query as ClassifyDataSetQuery;
        const modelsFactory = ModelsFactory();
        const model = modelsFactory.create("text");
        const predictionModel = await model.train(dataSet);
        const { predictions } = (await predictionModel.predict(text)) as LabelClassifyResponse;
        return { predictions } as LabelClassifyResponse;
    };
    return { classify, name: "text" } as ClassifierBase;
};
