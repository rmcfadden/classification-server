import { ClassifyResponse } from "./classifyReponse";
import { FeaturePrediction } from "./featurePrediction";
export interface FeatureClassifyResponse extends ClassifyResponse {
    predictions: FeaturePrediction[];
}