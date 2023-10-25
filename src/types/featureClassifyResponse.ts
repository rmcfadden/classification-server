import { ClassifyResponse } from "./classifyResponse";
import { FeaturePrediction } from "./featurePrediction";
export interface FeatureClassifyResponse extends ClassifyResponse {
    predictions: FeaturePrediction[];
}