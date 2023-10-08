import { ModelBase } from "./modelBase";
import { TextModel } from "./textModel";
export const ModelsFactory = () => {
    const modelsLookup = new Map<string, ModelBase>([
        ["text", TextModel([])],
    ]);
    const create = (name: string): ModelBase => {
        const authenticator = modelsLookup.get(name);
        if (!authenticator) throw new Error(`Cannot find model name ${name}`);
        return authenticator;
    };
    const getKeys = (): string[] => Array.from(modelsLookup.keys());
    return { create, getKeys };
};