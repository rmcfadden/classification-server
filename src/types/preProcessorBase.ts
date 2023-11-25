import { ISupportsName } from "types";
import { PreProcessorRequest } from "./preProcessorRequest";
import { PreProcessorResponse } from "./preProcessorResponse";
export interface PreProcessorBase extends ISupportsName {
    apply: (request: PreProcessorRequest) => Promise<PreProcessorResponse>;
}
