import { ToLowerCasePreProcessor } from "../../../src/modules/preProcessors/toLowerCasePreProcessor";
test("apply", async () => {
    const { apply } = ToLowerCasePreProcessor();
    const { text } = await apply({ text: "ZerBBg!123AA" });
    expect(text).toBe("zerbbg!123aa");
});
