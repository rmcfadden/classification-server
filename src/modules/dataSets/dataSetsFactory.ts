import { DataSetsBase } from "../../types/dataSetsBase";
import { MemoryDataSets } from "./memoryDataSets";
export const DataSetsFactory = () => {
    const { lookup } = DataSetsFactory;
    const create = (name: string): DataSetsBase => {
        const dataSet = lookup.get(name);
        if (!dataSet) throw new Error(`Cannot find dataSets name ${name}`);
        return dataSet;
    };
    const getKeys = (): string[] => Array.from(lookup.keys());
    return { create, getKeys };
};
DataSetsFactory.lookup = new Map<string, DataSetsBase>([["memory", MemoryDataSets()]]);
DataSetsFactory.add = (dataSet: DataSetsBase) =>
    (DataSetsFactory.lookup = DataSetsFactory.lookup.set(dataSet.name, dataSet));
