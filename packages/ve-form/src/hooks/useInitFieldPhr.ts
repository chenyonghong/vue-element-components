import { ref, toRefs, useAttrs, inject } from "vue";
import { IGlobalProperty } from "../types/common";
import { IFormField } from "../types/form-field";

export default function () {
    const { config } = inject<IGlobalProperty>('globalProperties')!
    const attrs = useAttrs();
    const placeholder = ref('')
    const { show, showPropName } = config?.defaultPhr ?? {}

    const actionNameMap: Record<string, string> = {
        input: '输入',
        'input-number': '输入',
        select: '选择'
    }
    if (show && !attrs.placeholder) {
        placeholder.value = `请${actionNameMap[attrs.compType as string]}${showPropName ? attrs.label : ''}`
    }
    return placeholder
}