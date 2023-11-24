import { PreProcessorRequest, PreProcessorResponse, PreProcessorBase } from "../../types";
export const ToUpperCasePreProcessor = () => {
    const apply = async ({ text }: PreProcessorRequest): Promise<PreProcessorResponse> =>
        ({
            text: text?.toUpperCase(),
        } as PreProcessorResponse);
    return { apply, name: "toUpperCase" } as PreProcessorBase;
};
