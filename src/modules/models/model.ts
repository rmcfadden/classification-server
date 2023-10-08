import { PredictionResult } from "../../models/predictionResult";

export interface Model {
    predict: (input: string) => Promise<PredictionResult>
};