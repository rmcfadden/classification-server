import { PreProcessorBase } from "./preProcessorBase";
import { TextPreProcessing } from "./textPreProcessing";

export const PreProcessingsFactory = () => {
    const preProcessorsLookup = new Map<string, PreProcessorBase>([
        ["text-noise", TextPreProcessing([])],
    ]);
    const create = (name: string): PreProcessorBase => {
        const preProcesser = preProcessorsLookup.get(name);
        if (!preProcesser) throw new Error(`Cannot find preProcessor name ${name}`);
        return preProcesser;
    };
    const getKeys = (): string[] => Array.from(preProcessorsLookup.keys());
    return { create, getKeys };
};
