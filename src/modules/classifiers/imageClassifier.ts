import { ClassifyQuery } from "../../types/classifyQuery";
import { ClassifierBase } from "../../types/classifierBase";
import { ClassifyDataSetQuery } from "../../types/classifyDataSetQuery";
import { ModelsFactory } from "../models/modelsFactory";
import { LabelClassifyResponse } from "../../types/labelClassifyResponse";
export const ImageClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        const { text } = query;
        const { dataSet } = query as ClassifyDataSetQuery;
        const modelsFactory = ModelsFactory();
        const model = modelsFactory.create("image");
        const predictionModel = await model.train(dataSet);
        const { predictions } = (await predictionModel.predict(text)) as LabelClassifyResponse;
        return { predictions } as LabelClassifyResponse;
    };
    return { classify, name: "image" } as ClassifierBase;
};
