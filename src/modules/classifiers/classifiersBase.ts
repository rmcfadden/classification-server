import { ClassifyQuery } from "../../models/classifyQuery";
import { ClassifyResponse } from "../../models/classifyReponse";
export interface ClassifiersBase {
    classify: (query: ClassifyQuery) => Promise<ClassifyResponse>;
}
