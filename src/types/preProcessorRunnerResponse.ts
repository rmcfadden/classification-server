import { ExplainStep } from "./explainStep";
export interface PreProcessorRunnerResponse {
    text: string;
    explainSteps: ExplainStep[]
}