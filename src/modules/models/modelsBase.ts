import { DataSet } from "../../models/dataSet";
import { ModelsBase } from "../../models/modelsBase";
export interface ModelsBase {
    train: (dataSet: DataSet) => Promise<ModelsBase>
}