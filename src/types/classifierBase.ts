import { ClassifyQuery } from "./classifyQuery";
import { ClassifyResponse } from "./classifyResponse";
export interface ClassifierBase {
    classify: (query: ClassifyQuery) => Promise<ClassifyResponse>;
}
