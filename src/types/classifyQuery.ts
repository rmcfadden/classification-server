export interface ClassifyQuery {
    text: string;
    type?: string;
    scheme?: string;
    shouldIncludExplain?: boolean;
    options?: Map<string, string>;
    preProcessSteps?: string[];
}