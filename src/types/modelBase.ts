import { DataSet } from "./dataSet";
import { PredictionResult } from "./predictionResult";

export interface ModelBase {
    train: (dataSet: DataSet) => Promise<ModelBase>;
    predict: (input: string) => Promise<PredictionResult>;
}
