import { ClassifyQuery } from "./classifyQuery";
import { DataSet } from "./dataSet";
export interface ClassifyDataSetQuery extends ClassifyQuery {
    dataSet: DataSet;
}