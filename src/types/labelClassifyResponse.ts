import { ClassifyResponse } from "./classifyResponse";
import { LabelPrediction } from "./labelPrediction";
export interface LabelClassifyResponse extends ClassifyResponse {
    predictions: LabelPrediction[];
}