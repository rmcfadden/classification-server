import { DataSetsBase } from "./dataSetsBase";
import { MemoryDataSets } from "./memoryDataSets";
export const DatasetsFactory = () => {
  const dataSetsLookup = new Map<string, DataSetsBase>([
    ["memory", MemoryDataSets()],
  ]);
  const create = (name: string): DataSetsBase => {
    const dataSet = dataSetsLookup.get(name);
    if (!dataSet)
      throw new Error(`Cannot find dataSets name ${name}`);
    return dataSet;
  };
  const getKeys = (): string[] => Array.from(dataSetsLookup.keys());
  return { create, getKeys };
};
