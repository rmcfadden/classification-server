import { DataSet } from "../../models/dataSet";
export interface DataSetsBase {
  add: (dataSet: DataSet) => Promise<void>;
  get: (name: string) => Promise<DataSet | undefined>;
}