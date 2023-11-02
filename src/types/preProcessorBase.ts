import { ISupportsName } from "types";
export interface PreProcessorBase extends ISupportsName {
    apply: (input: string) => Promise<string>;
}
