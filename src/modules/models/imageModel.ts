import { DataSet } from "../../models/dataSet";
import { ImageFeature } from "../../models/imageFeature";
import { ModelBase } from "./modelBase";
import { PredictionResult } from "../../models/predictionResult";

export const ImageModel = (imageFeatures: ImageFeature[]) => {
  const predict = async (input: string): Promise<PredictionResult> => {
    const matchedImageFeatures = imageFeatures.filter(
      ({ image }) => image === input
    );
    const { length: matchedCount } = matchedImageFeatures;
    return {
      predictions: matchedImageFeatures.map(({ feature }) => ({
        feature,
        probability: 100 / matchedCount,
      })),
    };
  };
  const train = async (dataSet: DataSet) =>
    ImageModel(dataSet.items as ImageFeature[]);
  return { predict, train } as ModelBase;
};
