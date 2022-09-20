
export declare type TTableData = Record<string, any>[];
import { IFormField } from "@/ve-form/src/types/form-field"

export declare interface IColumn<T> {
  [x: string]: unknown;
  label: string;
  prop: keyof T[0];
  type?: string,
  width?: number;
  children?: IColumn<T>[];
  filter?: IFormField
}

export declare interface ExposeAttrs<T> {
  instance: Ref;
  selections: T[]
}