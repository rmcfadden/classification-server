import { ClassifierBase } from "./classifierBase";
import { DataPointClassifier } from "./dataPointClassifier";
import { ImageClassifier } from "./imageClassifier";
import { TextClassifier } from "./textClassifier";
export const ClassifiersFactory = () => {
    const classifiersLookup = new Map<string, ClassifierBase>([
        ["text", TextClassifier()],
        ["dataPoint", DataPointClassifier()],
        ["image", ImageClassifier()],
    ]);
    const create = (name: string): ClassifierBase => {
        const authenticator = classifiersLookup.get(name);
        if (!authenticator) throw new Error(`Cannot find classifier name ${name}`);
        return authenticator;
    };
    const getKeys = (): string[] => Array.from(classifiersLookup.keys());
    return { create, getKeys };
};
