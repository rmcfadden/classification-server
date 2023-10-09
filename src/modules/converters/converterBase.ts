export interface ConverterBase<T extends unknown> {
  toString(source: T): string;
  multipleToString(sources: Array<T>): string;
  parse(source: string): T;
  parseMultiple(item: string): Array<T>;
}
