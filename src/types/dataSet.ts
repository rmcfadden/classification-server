import { Data } from "./data"
export interface DataSet {
    name: string;
    type?: string;
    dataTypes: string;
    items: Data[];
}