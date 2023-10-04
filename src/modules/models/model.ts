export interface Model {
    predict: (input: string) => Promise<unknown>
};