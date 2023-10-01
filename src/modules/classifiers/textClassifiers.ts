import { ClassifyQuery } from "../../models/classifyQuery";
import { ClassifyResponse } from "../../models/classifyReponse";

export const TextClassifiers = () => {
    const classify: Promise<ClassifyResponse> = async (query: ClassifyQuery) => { dataSetName: "" } as ClassifyResponse;
    return { classify };
}