import { PreProcessorRequest, PreProcessorResponse, PreProcessorBase } from "../../types";
export const ToLowerCasePreProcessor = () => {
    const apply = async ({ text }: PreProcessorRequest): Promise<PreProcessorResponse> =>
        ({
            text: text?.toLowerCase(),
        } as PreProcessorResponse);
    return { apply, name: "toLowerCase" } as PreProcessorBase;
};
