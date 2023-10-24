import { ConverterBase } from "./converterBase";
import { DataPoint } from "../../types/dataPoint";
export const DataPointConverter = () => {
    const toString = (source: DataPoint) => `${source.x},${source.y}`;
    const multipleToString = (sources: DataPoint[]) => sources.map((s) => toString(s)).join(";");
    const parse = (source: string): DataPoint => {
        const parts = source.split(",");
        return {
            x: Number(parts[0]),
            y: Number(parts[1]),
        };
    };
    const parseMultiple = (sources: string): DataPoint[] => sources.split(";").map((s) => parse(s));
    return {
        toString,
        multipleToString,
        parse,
        parseMultiple,
    } as ConverterBase<DataPoint>;
};
