import { ConverterBase } from "./converterBase";
export const NumberConverter = () => {
    const toString = (source: number) => `${source}`;
    const multipleToString = (sources: number[]) =>
        sources.map((s) => toString(s)).join(";");
    const parse = (source: string): number => Number(source);
    const parseMultiple = (sources: string): number[] => sources.split(";").map((s) => parse(s));
    return {
        toString,
        multipleToString,
        parse,
        parseMultiple,
    } as ConverterBase<number>;
};
