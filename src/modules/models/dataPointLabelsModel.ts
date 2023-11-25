import { DataSet } from "../../types/dataSet";
import { ModelBase } from "../../types/modelBase";
import { PredictionResult } from "../../types/predictionResult";
import { DataPointLabel } from "../../types/dataPointLabel";
import { LabelPredictionResult } from "../../types/labelPredictionResult";
import { DataPoint } from "../../types/dataPoint";
import { DataPointConverter } from "../converters/dataPointConverter";

export const DataPointLabelsModel = (dataLabels: DataPointLabel[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const { x, y }: DataPoint = DataPointConverter().parse(input);
        const sortedLabels = [...dataLabels].sort(
            (a: DataPointLabel, b: DataPointLabel) =>
                Math.hypot(x - a.x, y - a.y) - Math.hypot(x - b.x, y - b.y)
        );
        // TODO: how do I determine probability based on distance (posterior probability?)
        return {
            predictions: sortedLabels.map(({ label }) => ({
                label,
                probability: 100,
            })),
        } as LabelPredictionResult;
    };
    const train = async (dataSet: DataSet) =>
        DataPointLabelsModel(dataSet.items as DataPointLabel[]);
    return { predict, train, name: "dataPointLabel" } as ModelBase;
};
