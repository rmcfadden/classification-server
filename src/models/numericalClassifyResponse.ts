import { ClassifyResponse } from "./classifyReponse";
export interface NumericalClassifyResponse extends ClassifyResponse {
    result: number;
}