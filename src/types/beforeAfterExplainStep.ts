import { ExplainStep } from "./explainStep";
export interface BeforeAfterExplainStep extends ExplainStep {
    before: string;
    after: string;
}
