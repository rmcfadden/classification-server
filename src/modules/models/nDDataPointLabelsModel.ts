import { DataSet } from "../../types/dataSet";
import { ModelBase } from "../../types/modelBase";
import { PredictionResult } from "../../types/predictionResult";
import { NDDataPointLabel } from "../../types/nDDataPointLabel";
import { LabelPredictionResult } from "../../types/labelPredictionResult";
import { NDDataPoint } from "../../types/nDDataPoint";
import { NDDataPointConverter } from "../converters/nDDataPointConverter";

export const NDDataPointLabelsModel = (dataLabels: NDDataPointLabel[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const { values }: NDDataPoint = NDDataPointConverter().parse(input);
        const sortedLabels = [...dataLabels].sort(
            (a: NDDataPointLabel, b: NDDataPointLabel) =>
                Math.hypot(...a.values.map((a1, i) => values[i] - a1)) -
                Math.hypot(...b.values.map((b1, i) => values[i] - b1))
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
        NDDataPointLabelsModel(dataSet.items as NDDataPointLabel[]);
    return { predict, train, name: "nDDataPointLabel" } as ModelBase;
};
