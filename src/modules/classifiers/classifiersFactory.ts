import { ClassifiersBase } from "./classifiersBase";
import { TextClassifiers } from "./textClassifiers";
export const ClassifiersFactory = () => {
    const classifiersLookup = new Map<string, ClassifiersBase>([
        ["text", TextClassifiers()],
    ]);
    const create = (name: string): ClassifiersBase => {
        const authenticator = classifiersLookup.get(name);
        if (!authenticator)
            throw new Error(`Cannot find classifierss name ${name}`);
        return authenticator;
    };
    const getKeys = (): string[] => Array.from(classifiersLookup.keys());
    return { create, getKeys };
};
