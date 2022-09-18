const files = import.meta.globEager('./**/index.vue');
const cmptMap: Record<string, any> = {};

Object.keys(files).forEach((key) => {
    const vueCmpt = files[key].default;
    const cmptName = key.replace(/(.*\/)(.*)\/([^.]+).*/gi, '$2');
    cmptMap[cmptName] = vueCmpt;
});
export default cmptMap;
