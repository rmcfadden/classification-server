import { DataSet } from "../../models/dataSet";
import { PredictionResult } from "../../models/predictionResult";

export interface ModelBase {
    train: (dataSet: DataSet) => Promise<ModelBase>
    predict: (input: string) => Promise<PredictionResult>;
}