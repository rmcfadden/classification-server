import { TextFeature } from "../../models/textFeature"
import { Model } from "./model";

export const TextModel = (textFeatures: TextFeature[]) => {
    const predict = async (input: string): Promise<unknown> => textFeatures.filter(({ feature }) => feature === input);
    return { predict } as Model;
}