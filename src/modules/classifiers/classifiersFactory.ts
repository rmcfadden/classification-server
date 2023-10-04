import { ClassifierBase } from "./classifierBase";
import { TextClassifier } from "./textClassifier";
export const ClassifiersFactory = () => {
    const classifiersLookup = new Map<string, ClassifierBase>([
        ["text", TextClassifier()],
    ]);
    const create = (name: string): ClassifierBase => {
        const authenticator = classifiersLookup.get(name);
        if (!authenticator)
            throw new Error(`Cannot find classifierss name ${name}`);
        return authenticator;
    };
    const getKeys = (): string[] => Array.from(classifiersLookup.keys());
    return { create, getKeys };
};
