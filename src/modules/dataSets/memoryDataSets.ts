import { DataSetsBase } from "./dataSetsBase";
import { DataSet } from "../../models/dataSet";

let memoryCache = new Map<string, DataSet>();
export const MemoryDataSets = () => {
    const add = async (dataSet: DataSet) => {
        memoryCache = memoryCache.set(dataSet.name, dataSet);
    };
    const get = async (name: string) =>
        memoryCache.get(name);
    return { add, get } as DataSetsBase;
}