import { DataSet } from "../../models/dataSet";
import { TextFeature } from "../../models/textFeature"
import { Model } from "./model";
import { PredictionResult } from "../../models/predictionResult"


export const TextModel = (textFeatures: TextFeature[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const matchedTextFeatures = textFeatures.filter(({ text }) => text === input);
        const matchedCount = matchedTextFeatures.length;
        return { predictions: matchedTextFeatures.map(tf => ({ feature: tf.feature, probability: 100 / matchedCount })) }
    }
    const train = async (dataSet: DataSet) => TextModel(dataSet.items as TextFeature[]);
    return { predict, train } as Model;
}