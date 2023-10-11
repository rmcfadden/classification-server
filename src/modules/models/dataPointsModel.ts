import { DataSet } from "../../models/dataSet";
import { ModelBase } from "./modelBase";
import { PredictionResult } from "../../models/predictionResult";
import { DataPoint } from "../../models/dataPoint";
import { NumericalPredictionResult } from "../../models/numericalPredictionResult";
import { DataPointConverter } from "../converters/dataPointConverter";

export const DataPointsModel = (dataPoints: DataPoint[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const { x, y }: DataPoint = DataPointConverter().parse(input);
        return {} as NumericalPredictionResult;
        /*
        const sortedFeatures = [...dataPoints].sort(
            (a: DataPointFeature, b: DataPointFeature) =>
                Math.hypot(x - a.x, y - a.y) - Math.hypot(x - b.x, y - b.y)
        );
        // TODO: how do I determine probability based on distance
        return {
            predictions: sortedFeatures.map(({ feature }) => ({
                feature,
                probability: 100,
            })),
        } as FeaturePredictionResult;
        */
    };
    const train = async (dataSet: DataSet) =>
        DataPointsModel(dataSet.items as DataPoint[]);
    return { predict, train } as ModelBase;
};
