import { ClassifyQuery } from "./classifyQuery";
import { DataSet } from "./dataSet";

export interface ClassifyDataSetQuery extends ClassifyQuery {
    type: string;
    query: string;
    dataSet: DataSet;
}