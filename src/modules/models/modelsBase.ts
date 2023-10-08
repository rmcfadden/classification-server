import { DataSet } from "../../models/dataSet";
import { Model } from "./model";

export interface ModelsBase {
    train: (dataSet: DataSet) => Promise<Model>
}