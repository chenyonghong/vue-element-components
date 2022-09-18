export declare interface IFormField {
    type: string;
    prop: string;
    label?: string;
    hidden?: boolean;
    value?: unknown;
    col?: Record<string, unknown>;
    rule?: any[];
    [key: string]: unknown
}