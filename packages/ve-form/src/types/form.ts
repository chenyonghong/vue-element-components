import { IApi } from "@/pkg/types/network";

export interface IFormConfig {
    apis?: IApi[],
    grid?: Record<string, any>,
    rules?: Record<string, any[]>,
    instance?: any
}

export interface IFormData {
    [key: string|number]: any
}