import { ModelBase } from "./modelBase";
import { TextModel } from "./textModel";
import { DataPointsModel } from "./dataPointsModel";
import { ImageModel } from "./imageModel";

export const ModelsFactory = () => {
  const modelsLookup = new Map<string, ModelBase>([
    ["text", TextModel([])],
    ["dataPoint", DataPointsModel([])],
    ["image", ImageModel([])],
  ]);
  const create = (name: string): ModelBase => {
    const authenticator = modelsLookup.get(name);
    if (!authenticator) throw new Error(`Cannot find model name ${name}`);
    return authenticator;
  };
  const getKeys = (): string[] => Array.from(modelsLookup.keys());
  return { create, getKeys };
};
