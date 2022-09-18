export declare type TMethod = 'get' | 'post' | 'put' | 'option' | 'delete'
export declare interface IApi {
    url: string,
    method: TMethod,
    params?: string,
    data?: unknown
}

export declare type IData<T> = T

export declare interface IReq {
    page?: number,
    size?: number,
    [key: string|number]: any
}
export declare interface IRes {
  [key: string|number]: any
}
