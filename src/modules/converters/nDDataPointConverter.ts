import { ConverterBase } from "./converterBase";
import { NDDataPoint } from "../../types/nDDataPoint";
export const NDDataPointConverter = () => {
    const toString = ({ values }: NDDataPoint) => values.join(",");
    const multipleToString = (sources: NDDataPoint[]) => sources.map((s) => toString(s)).join(";");
    const parse = (source: string): NDDataPoint => {
        const values = source.split(",").map((a) => Number(a));
        return {
            values,
        };
    };
    const parseMultiple = (sources: string): NDDataPoint[] =>
        sources.split(";").map((s) => parse(s));
    return {
        toString,
        multipleToString,
        parse,
        parseMultiple,
    } as ConverterBase<NDDataPoint>;
};
