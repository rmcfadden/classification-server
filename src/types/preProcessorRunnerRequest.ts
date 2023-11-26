export interface PreProcessorRunnerRequest {
    text: string;
    steps: string[];
    variables?: Map<string, string>
}