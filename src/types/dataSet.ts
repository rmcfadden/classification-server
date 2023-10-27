import { Data } from "./data";
export interface DataSet<T = Data> {
    name: string;
    type?: string;
    dataTypes: string;
    items: T[];
}
