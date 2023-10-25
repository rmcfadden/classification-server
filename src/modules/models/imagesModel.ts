import { DataSet } from "../../types/dataSet";
import { ImageFeature } from "../../types/imageFeature";
import { ModelBase } from "../../types/modelBase";
import { PredictionResult } from "../../types/predictionResult";

export const ImagesModel = (imageFeatures: ImageFeature[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const matchedImageFeatures = imageFeatures.filter(({ image }) => image === input);
        const { length: matchedCount } = matchedImageFeatures;
        return {
            predictions: matchedImageFeatures.map(({ feature }) => ({
                feature,
                probability: 100 / matchedCount,
            })),
        };
    };
    const train = async (dataSet: DataSet) => ImagesModel(dataSet.items as ImageFeature[]);
    return { predict, train } as ModelBase;
};
