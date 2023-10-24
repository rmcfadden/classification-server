import { DataSet } from "../../types/dataSet";
import { PredictionResult } from "../../types/predictionResult";

export interface ModelBase {
    train: (dataSet: DataSet) => Promise<ModelBase>;
    predict: (input: string) => Promise<PredictionResult>;
}
