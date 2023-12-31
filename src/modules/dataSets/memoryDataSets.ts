import { DataSetsBase } from "../../types/dataSetsBase";
import { DataSet } from "../../types/dataSet";

let memoryCache = new Map<string, DataSet>();
export const MemoryDataSets = () => {
    const add = async (dataSet: DataSet) => {
        memoryCache = memoryCache.set(dataSet.name, dataSet);
    };
    const get = async (name: string) => memoryCache.get(name);
    return { add, get, name: "memory" } as DataSetsBase;
};
