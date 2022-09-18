export declare type TValue = string | number | boolean | null | undefined | symbol | any[]

export declare type TRecord = Record<string|number, TValue>

export declare type TKeyValueMapping = Record<string | number, TValue | TRecord>