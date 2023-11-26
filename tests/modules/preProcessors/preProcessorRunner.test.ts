import { PreProcessorRunner } from "../../../src/modules/preProcessors/preProcessorRunner";
test("apply", async () => {
    const { run } = PreProcessorRunner();
    const { text, explainSteps } = await run({ text: "A.B.C.123", steps: ["toLowerCase", "textNoise"] });
    expect(text).toBe('abc123');
    expect(explainSteps.length).toBe(2);
});