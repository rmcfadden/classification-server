import { PreProcessorBase } from "../../types/preProcessorBase";
import { TextNoisePreProcessor } from "./textNoisePreProcessor";

export const PreProcessorsFactory = () => {
    const preProcessorsLookup = new Map<string, PreProcessorBase>([
        ["text-noise", TextNoisePreProcessor()],
    ]);
    const create = (name: string): PreProcessorBase => {
        const preProcesser = preProcessorsLookup.get(name);
        if (!preProcesser) throw new Error(`Cannot find preProcessor name ${name}`);
        return preProcesser;
    };
    const getKeys = (): string[] => Array.from(preProcessorsLookup.keys());
    return { create, getKeys };
};
