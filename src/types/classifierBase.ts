import { ISupportsName } from "types";
import { ClassifyQuery } from "./classifyQuery";
import { ClassifyResponse } from "./classifyResponse";
export interface ClassifierBase extends ISupportsName {
    classify: (query: ClassifyQuery) => Promise<ClassifyResponse>;
}
