import { getCurrentInstance } from "vue";

type TConfig = {
    [key: string]: any;
}
export default function <T extends TConfig>(type: string, customConfig: T): T {
    const instance = getCurrentInstance();
    const { globalProperties } = instance!.appContext.config;

    const { './defaultConfig.json': { [type]: defaultConfig } }: { './defaultConfig.json': T } = import.meta.globEager('./defaultConfig.json')

    // 合并全局配置
    const mergedConfig: T = Object.assign(defaultConfig, customConfig)

    const { [type]: gConfig }: { [key: string]: T } = globalProperties.vec_config ?? {};

    if (gConfig) {
        for (let key in gConfig) {
            if (!mergedConfig[key]) {
                mergedConfig[key] = gConfig[key]
            }
        }
    }
    return mergedConfig;
}