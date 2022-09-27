export declare type TMethod = 'get' | 'post' | 'put' | 'option' | 'delete'
export declare interface IApi {
    url: string,
    method: TMethod,
    params?: string,
    data?: unknown
}

export declare interface IPagination {
    layout?: string,
    style?: string
}

export declare interface IConfig {
    api?: IApi | Function,
    pagination?: IPagination,
    filter?: any
}

export declare type IData<T> = T

export interface IReq {
    pageNum?: number,
    pageSize?: number,
    [key: string]: any
}
export interface IRes {
  data: TTableData;
  total?: number;
}
