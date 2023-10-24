import { DataSet } from "../../types/dataSet";
import { ModelBase } from "./modelBase";
import { PredictionResult } from "../../types/predictionResult";
import { DataPointFeature } from "../../types/dataPointFeature";
import { FeaturePredictionResult } from "../../types/featurePredictionResult";
import { DataPoint } from "../../types/dataPoint";
import { DataPointConverter } from "../converters/dataPointConverter";

export const DataPointFeaturesModel = (dataFeatures: DataPointFeature[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const { x, y }: DataPoint = DataPointConverter().parse(input);
        const sortedFeatures = [...dataFeatures].sort(
            (a: DataPointFeature, b: DataPointFeature) =>
                Math.hypot(x - a.x, y - a.y) - Math.hypot(x - b.x, y - b.y)
        );
        // TODO: how do I determine probability based on distance (posterior probability?)
        return {
            predictions: sortedFeatures.map(({ feature }) => ({
                feature,
                probability: 100,
            })),
        } as FeaturePredictionResult;
    };
    const train = async (dataSet: DataSet) =>
        DataPointFeaturesModel(dataSet.items as DataPointFeature[]);
    return { predict, train } as ModelBase;
};
