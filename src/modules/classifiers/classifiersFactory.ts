import { ClassifierBase } from "../../types/classifierBase";
import { DataPointFeatureClassifier } from "./dataPointFeatureClassifier";
import { DataPointClassifier } from "./dataPointClassifier";
import { ImageClassifier } from "./imageClassifier";
import { TextClassifier } from "./textClassifier";
import { NumericalClassifier } from "./numericalClassifier";
import { NDDataPointFeatureClassifier } from "./nDDataPointFeatureClassifier";

export const ClassifiersFactory = () => {
    const { lookup } = ClassifiersFactory;
    const create = (name: string): ClassifierBase => {
        const classifier = lookup.get(name);
        if (!classifier) throw new Error(`Cannot find classifier name ${name}`);
        return classifier;
    };
    const getKeys = (): string[] => Array.from(lookup.keys());
    return { create, getKeys };
};

ClassifiersFactory.lookup = new Map<string, ClassifierBase>([
    ["text", TextClassifier()],
    ["dataPointFeature", DataPointFeatureClassifier()],
    ["nDDataPointFeature", NDDataPointFeatureClassifier()],
    ["dataPoint", DataPointClassifier()],
    ["numerical", NumericalClassifier()],
    ["image", ImageClassifier()],
]);

ClassifiersFactory.add = (key: string, classifier: ClassifierBase) => {
    ClassifiersFactory.lookup = ClassifiersFactory.lookup.set(key, classifier);
}
