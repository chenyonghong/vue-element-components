
export declare type TTableData = Record<string, any>[];

export declare interface IColumn<T> {
  label: string;
  prop: keyof T[0];
  type?: string,
  width?: number;
  children?: IColumn<T>[];
}

export declare interface ExposeAttrs<T> {
    instance: Ref;
    selections: T[]
}