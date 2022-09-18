
<script lang="tsx">
import { defineComponent, PropType, defineProps, toRefs, useAttrs, inject, h, Events } from "vue";
import { _capitalize } from "pkg/utils";

interface Group {
    label: string,
    options: Option[]
}
interface Option {
    value: string | number,
    label: string,
    disabled?: boolean
}

type EventName<Str extends EventNameMap> = `on${Capitalize<Str>}`

const eventNameList = ['change', 'visible-change', 'remove-tag', 'clear', 'focus', 'blur'] as const;
type EventNameMap = typeof eventNameList[number];

export default defineComponent({
    props: {
        prop: {
            type: String,
            default: ''
        },
        group: {
            type: Boolean,
            default: false
        },
        options: {
            type: Array as PropType<Option[] | Group[]>,
            default: []
        },
        events: {
            type: Object as PropType<Record<EventName<EventNameMap>, () => {}>>,
            default: {}
        }
    },
    setup(props, { attrs, slots }) {
        const { prop, group, options, events } = toRefs(props);
        const formModel = inject<Record<string | number, any>>('formModel')!

        const OptionTag = (options: Option[]) => (
            options.map((option: Option) => (
                <el-option key={option.value} label={option.label} value={option.value} disabled={option.disabled}>
                    {slots.default && slots.default(option)}
                </el-option>
            ))
        )
        const GroupTag = () =>
            (options.value as Group[]).map((group: Group) => (
                <el-option-group key={group.label} label={group.label}>
                    {OptionTag(group.options)}
                </el-option-group>
            ))
        // 处理事件，重新命名为jsx名称
        const fomattedEvents: Record<string, () => {}> = {};
        if (Reflect.ownKeys(events.value).length) {
            Object.entries(events.value).forEach((event: [string, () => {}]) => {
                const newKey = `on${event[0].split('-').map(nameSlot => _capitalize(nameSlot)).join('')}`;
                fomattedEvents[newKey] = event[1]
            })
        }

        return () => (
            <el-select v-model={formModel[prop.value]} {...attrs} {...fomattedEvents}>
                {group.value ? GroupTag() : OptionTag(options.value as Option[])}
            </el-select>
        )
    }
})
</script>