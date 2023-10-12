export interface PreProcessorBase {
    apply: (input: string) => Promise<string>;
}
