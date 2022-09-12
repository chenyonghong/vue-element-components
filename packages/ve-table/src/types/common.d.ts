export declare type TMethod = 'get' | 'post' | 'put' | 'option' | 'delete'
export declare interface IApi {
    url: string,
    method: method,
    params?: string,
    data?: unknown
}

export declare interface IConfig {
    api?: IApi | Function,
}

export declare type IData<T> = T

export interface IReq {
    page?: number,
    size?: number
}
export interface IRes {
  data: TTableData;
  total?: number;
}
