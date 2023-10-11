import { ClassifyQuery } from "../../models/classifyQuery";
import { ClassifierBase } from "./classifierBase";
import { ClassifyDataSetQuery } from "../../models/classifyDataSetQuery";
import { ModelsFactory } from "../models/modelsFactory";
import { FeatureClassifyResponse } from "../../models/featureClassifyResponse";
export const ImageClassifier = () => {
  const classify = async (query: ClassifyQuery) => {
    const { text } = query;
    const { dataSet } = query as ClassifyDataSetQuery;
    const modelsFactory = ModelsFactory();
    const model = modelsFactory.create("image");
    const predictionModel = await model.train(dataSet);
    const { predictions } = (await predictionModel.predict(
      text
    )) as FeatureClassifyResponse;
    return { predictions } as FeatureClassifyResponse;
  };
  return { classify } as ClassifierBase;
};
