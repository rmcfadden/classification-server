import { PreProcessorRequest, PreProcessorResponse, PreProcessorBase } from "../../types";

export const TextNoisePreProcessor = () => {
    const replaceTexts = [".", "?", ":", "!", ",", "\\", "/", '"', "'", " "];
    const apply = async ({ text }: PreProcessorRequest): Promise<PreProcessorResponse> =>
        ({
            text:
                text !== undefined && text !== null
                    ? replaceTexts.reduce((a: string, c: string) => a.replaceAll(c, ""), text)
                    : text,
        } as PreProcessorResponse);
    return { apply, name: "textNoise" } as PreProcessorBase;
};
