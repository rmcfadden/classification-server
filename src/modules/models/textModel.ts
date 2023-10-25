import { DataSet } from "../../types/dataSet";
import { TextFeature } from "../../types/textFeature";
import { ModelBase } from "../../types/modelBase";
import { PredictionResult } from "../../types/predictionResult";

export const TextModel = (textFeatures: TextFeature[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const matchedTextFeatures = textFeatures.filter(({ text }) => text === input);
        const { length: matchedCount } = matchedTextFeatures;
        return {
            predictions: matchedTextFeatures.map(({ feature }) => ({
                feature,
                probability: 100 / matchedCount,
            })),
        };
    };
    const train = async (dataSet: DataSet) => TextModel(dataSet.items as TextFeature[]);
    return { predict, train } as ModelBase;
};
