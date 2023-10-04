import { ClassifyQuery } from "../../models/classifyQuery";
import { ClassifyResponse } from "../../models/classifyReponse";
export interface ClassifierBase {
    classify: (query: ClassifyQuery) => Promise<ClassifyResponse>;
}
