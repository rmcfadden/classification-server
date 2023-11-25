import { DataSet } from "../../types/dataSet";
import { ImageLabel } from "../../types/imageLabel";
import { ModelBase } from "../../types/modelBase";
import { PredictionResult } from "../../types/predictionResult";

export const ImagesModel = (imageLabels: ImageLabel[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const matchedImageLabels = imageLabels.filter(({ image }) => image === input);
        const { length: matchedCount } = matchedImageLabels;
        return {
            predictions: matchedImageLabels.map(({ label }) => ({
                label,
                probability: 100 / matchedCount,
            })),
        };
    };
    const train = async (dataSet: DataSet) => ImagesModel(dataSet.items as ImageLabel[]);
    return { predict, train, name: "image" } as ModelBase;
};
