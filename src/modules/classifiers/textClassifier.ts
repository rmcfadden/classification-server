import { ClassifyQuery } from "../../models/classifyQuery";
import { ClassifyResponse } from "../../models/classifyReponse";
import { ClassifierBase } from "./classifierBase";

export const TextClassifier = () => {
    const classify = async (query: ClassifyQuery) => {
        console.log('QUERY', query);

        return {} as ClassifyResponse;
    }
    return { classify } as ClassifierBase;
}