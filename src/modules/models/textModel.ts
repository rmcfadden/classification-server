import { DataSet } from "../../types/dataSet";
import { TextLabel } from "../../types/textLabel";
import { ModelBase } from "../../types/modelBase";
import { PredictionResult } from "../../types/predictionResult";

export const TextModel = (textLabels: TextLabel[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const matchedTextLabels = textLabels.filter(({ text }) => text === input);
        const { length: matchedCount } = matchedTextLabels;
        return {
            predictions: matchedTextLabels.map(({ label }) => ({
                label,
                probability: 100 / matchedCount,
            })),
        };
    };
    const train = async (dataSet: DataSet) => TextModel(dataSet.items as TextLabel[]);
    return { predict, train, name: "text" } as ModelBase;
};
