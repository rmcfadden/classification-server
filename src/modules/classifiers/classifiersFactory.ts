import { ClassifierBase } from "../../types/classifierBase";
import { DataPointLabelClassifier } from "./dataPointLabelClassifier";
import { DataPointClassifier } from "./dataPointClassifier";
import { ImageClassifier } from "./imageClassifier";
import { TextClassifier } from "./textClassifier";
import { NumericalClassifier } from "./numericalClassifier";
import { NDDataPointLabelClassifier } from "./nDDataPointLabelClassifier";

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
    ["dataPointLabel", DataPointLabelClassifier()],
    ["nDDataPointLabel", NDDataPointLabelClassifier()],
    ["dataPoint", DataPointClassifier()],
    ["numerical", NumericalClassifier()],
    ["image", ImageClassifier()],
]);

ClassifiersFactory.add = (classifier: ClassifierBase) =>
    (ClassifiersFactory.lookup = ClassifiersFactory.lookup.set(classifier.name, classifier));
