import { BeforeAfterExplainStep } from "../../types/beforeAfterExplainStep";
import { PreProcessorRunnerRequest } from "../../types/preProcessorRunnerRequest";
import { PreProcessorRunnerResponse } from "../../types/preProcessorRunnerResponse";
import { PreProcessorsFactory } from "./preProcessorsFactory";
import { PreProcessorRequest } from "../../types";

export const PreProcessorRunner = () => {
    const run = async (request: PreProcessorRunnerRequest): Promise<PreProcessorRunnerResponse> => {
        const { create, getKeys } = PreProcessorsFactory();
        const keys = getKeys();
        const { steps } = request;
        const missingSteps = steps.filter((s) => !keys.includes(s));
        if (missingSteps.length > 0)
            throw new Error(`cannot find these pre process steps: ${missingSteps.join(",")}`);
        const preProcessors = steps.map((s) => create(s));
        return await preProcessors.reduce(async (a, c) => {
            const { text, explainSteps } = await a;
            const {
                hrtime: { bigint },
            } = process;
            const start = bigint();
            const response = await c.apply({ text } as PreProcessorRequest);
            const elapsed = bigint() - start;
            return {
                ...a,
                text: response.text,
                explainSteps: [
                    ...explainSteps,
                    {
                        before: text,
                        after: response.text,
                        elapsed: Number(elapsed / 1000n),
                        name: `${c.name}PreProcessor`,
                    } as BeforeAfterExplainStep,
                ],
            };
        }, Promise.resolve({ text: request.text, explainSteps: [] } as PreProcessorRunnerResponse));
    };
    return { run };
};
