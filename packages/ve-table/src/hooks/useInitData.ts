import axios from "axios";
import { type Ref, ref, onMounted, watch } from "vue";
import { isNullableArray, isNullable } from "@/utils";
import { IApi, IConfig, IData, IRes } from "../types/common.d";

export default function <T>(
  props: Readonly<{
    config: IConfig;
    data: T;
    params: any
  }>
): { data: Ref<IRes | undefined>, loading: Ref<boolean> } {
  const {
    config: { api },
    data: defaultData,
    params
  } = props;

  const data = ref<IRes>();
  const loading = ref<boolean>(false)

  async function init() {
    loading.value = true;
    if (!isNullable(defaultData)) {
      data.value = { data: defaultData };
      return;
    }
    if (!api) return;
    if (typeof api === "function") {
      data.value = await api(params.value);
    } else {
      data.value = await fetchData(api);
    }
    setTimeout(() => {
      loading.value = false;
    }, 10);
  }
  async function fetchData(api: IApi) {
    let { method, url } = api;
    if(method === 'get') {
      url += '?';
      Object.keys(params.value).forEach((key,index)=> {
        const value = params.value[key]
        if(!isNullable(value)) {

          url += (index>0? '&':'') + key + '=' + value
        }
      })
    }
    const res = await (axios as any)[method](url, params.value);
    return res.data as IRes;
  }
  // init();

  watch(()=> params.value, (n,o)=> {
    console.log(n,o)
    init();
  }, {
    deep: true,
    immediate: true
  })
  return {
    data,
    loading
  };
}
