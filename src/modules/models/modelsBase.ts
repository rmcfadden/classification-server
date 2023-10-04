import { DataSet } from "../../models/dataSet";

export interface ModelsBase {
    train: (dataSet: DataSet) => Promise<string>
}