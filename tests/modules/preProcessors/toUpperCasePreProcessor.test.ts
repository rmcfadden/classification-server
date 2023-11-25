import { ToUpperCasePreProcessor } from "../../../src/modules/preProcessors/toUpperCasePreProcessor";
test("apply", async () => {
    const { apply } = ToUpperCasePreProcessor();
    const { text } = await apply({ text: "asdfFg!123" });
    expect(text).toBe("ASDFFG!123");
});
