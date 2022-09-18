import { ref, toRefs } from "vue";

export default function(localProps, plainAttrs) {
    const refProps = ref<Record<string, any>>({})
    Object.keys(toRefs(localProps)).forEach((key: string) => {
        const propType = plainAttrs[key].type;
        if (key === 'prop') return;
        if (propType === String && localProps[key] === '') {
            return
        }
        if (propType === Function && localProps[key] === null) {
            return
        }
        if (propType === Number && localProps[key] === 0) {
            return
        }
        if (propType === Boolean) {
            if (localProps[key] === false)
                return
            refProps.value[key] = ''
            return;
        }
        refProps.value[key] = localProps[key]
    })
    return {
        refProps
    }
}