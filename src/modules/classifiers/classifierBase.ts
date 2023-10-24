import { ClassifyQuery } from "../../types/classifyQuery";
import { ClassifyResponse } from "../../types/classifyReponse";
export interface ClassifierBase {
    classify: (query: ClassifyQuery) => Promise<ClassifyResponse>;
}
