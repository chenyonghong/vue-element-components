import { ref, toRefs, reactive, Ref } from "vue";
import { IFormField } from "../types/form-field";

export default function (model: Record<string | number, any> = reactive({}), fields: IFormField[]) {
    const fieldValue: Record<string, ''|number|[]> = {
        input: '',
        text: '',
        textarea: '',
        // 'input-number': 0,
        select: '',
        'multi-select': []
    }
    // const model: Record<string, '' | 0 | [] > = reactive({});
    fields.forEach(field=> {
        const { prop, type } = field;
        let _type = type;
        // 选择框多选模式，默认值为空数组
        if (type === 'select' && field?.multiple !== undefined && field?.multiple !== false) {
            _type = 'multi-select'
        }

        let value = fieldValue[_type]
        // input-number 默认值为最小值
        if (type === 'input-number' && field?.min !== undefined) {
            value = field.min as number
        }
        model[prop] = value
    })
}