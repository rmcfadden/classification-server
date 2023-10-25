import { ClassifyResponse } from "./classifyResponse";
export interface NumericalClassifyResponse extends ClassifyResponse {
    result: number;
}