import { ISupportsName } from "types";
import { Data } from "./data";
import { DataSet } from "./dataSet";
import { PredictionResult } from "./predictionResult";

export interface ModelBase<
    PResult extends PredictionResult = PredictionResult,
    DataSetT extends Data = Data
> extends ISupportsName {
    train: (dataSet: DataSet<DataSetT>) => Promise<ModelBase>;
    predict: (input: string) => Promise<PResult>;
}
