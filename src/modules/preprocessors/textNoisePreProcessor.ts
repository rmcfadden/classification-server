import { PreProcessorBase } from "./preProcessorBase";

export const TextNoisePreProcessor = () => {
    const replaceTexts = [".", "?", ":", "!", ",", "\\", "/", '"', "'", " "];
    const apply = async (input: string): Promise<string> =>
        input !== undefined && input !== null
            ? replaceTexts.reduce((a: string, c: string) => a.replaceAll(c, ""), input)
            : input;
    return { apply } as PreProcessorBase;
};
