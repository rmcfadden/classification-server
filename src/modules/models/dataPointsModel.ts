import { DataSet } from "../../models/dataSet";
import { ModelBase } from "./modelBase";
import { PredictionResult } from "../../models/predictionResult"
import { DataPointFeature } from "../../models/dataPointFeature";
import { FeaturePredictionResult } from "../../models/featurePredictionResult";
import { DataPoint } from "../../models/dataPoint";

export const DataPointsModel = (dataFeatures: DataPointFeature[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const inputParts = input.split(',');
        const { x, y }: DataPoint = { x: Number(inputParts[0]), y: Number(inputParts[1]) };
        const sortedFeatures = [...dataFeatures].sort((a: DataPointFeature, b: DataPointFeature) =>
            Math.sqrt(Math.pow(x - a.x, 2) + Math.pow(y - a.y, 2)) -
            Math.sqrt(Math.pow(x - b.x, 2) + Math.pow(y - b.y, 2)));
        console.log("sortedFeatures", sortedFeatures)
        // TODO: how do I determine probability based on distance
        return { predictions: sortedFeatures.map(({ feature }) => ({ feature, probability: 100 })) } as FeaturePredictionResult;
    }
    const train = async (dataSet: DataSet) => DataPointsModel(dataSet.items as DataPointFeature[]);
    return { predict, train } as ModelBase;
}