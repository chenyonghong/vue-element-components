<script lang="tsx">

import { defineComponent, ref, reactive, toRefs, PropType, inject, h } from "vue";
import { IFormConfig } from "./types/form";
import { IFormField } from "./types/form-field";
import baseControls from './components'

export default defineComponent({
    name: 'formItemWrapper',
    props: {
        field: {
            type: Object as PropType<IFormField>,
            default: {

            }
        }
    },
    setup(props) {
        const { field } = toRefs(props);
        const { type, label, prop } = field.value;

        let compType = type;
        if(['password','textarea', 'text'].includes(type)) {
            compType = 'input' 
        }

        const fieldSlots: Record<string, ()=> {}> = inject('fieldSlots')!;
        const slots: Record<string, () => {}> = {};
        for (let slotKey in fieldSlots) {
            let keyFragment = slotKey.split('-');
            if(keyFragment.shift()===compType && keyFragment.shift()===prop) {
                if(keyFragment.length) {
                    slots[keyFragment.join('-')] = fieldSlots[slotKey]
                } else {
                    slots.default = fieldSlots[slotKey]
                }
            }
        }
        
        return () => (
            <el-form-item label={label} prop={prop}>
                {
                    () => h(baseControls[compType], { ...field.value }, slots)
                }
            </el-form-item>

        )

    }
})
</script>
