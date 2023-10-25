import { DataSet } from "../../types/dataSet";
import { ModelBase } from "../../types/modelBase";
import { PredictionResult } from "../../types/predictionResult";
import { DataPoint } from "../../types/dataPoint";
import { NumericalPredictionResult } from "../../types/numericalPredictionResult";
import { NumberConverter } from "../converters/numberConverter";

export const DataPointsModel = (dataPoints: DataPoint[]) => {
    const predict = async (input: string): Promise<PredictionResult> => {
        const x: number = NumberConverter().parse(input);
        const { y }: DataPoint = dataPoints.find((dp) => dp.x === x) ?? { y: 0, x: 0 }; // TODO: this should regression soon
        return { result: y } as NumericalPredictionResult;
    };
    const train = async (dataSet: DataSet) => DataPointsModel(dataSet.items as DataPoint[]);
    return { predict, train } as ModelBase;
};
