import { ModelsBase } from "./modelsBase";
import { TextModels } from "./textModels";
export const ModelsFactory = () => {
    const modelsLookup = new Map<string, ModelsBase>([
        ["text", TextModels()],
    ]);
    const create = (name: string): ModelsBase => {
        const authenticator = modelsLookup.get(name);
        if (!authenticator) throw new Error(`Cannot find model name ${name}`);
        return authenticator;
    };
    const getKeys = (): string[] => Array.from(modelsLookup.keys());
    return { create, getKeys };
};