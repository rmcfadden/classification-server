import { ISupportsName } from "types";
import { DataSet } from "./dataSet";
export interface DataSetsBase extends ISupportsName {
    add: (dataSet: DataSet) => Promise<void>;
    get: (name: string) => Promise<DataSet | undefined>;
}
