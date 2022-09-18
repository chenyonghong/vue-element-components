import VeForm from "./src/index.vue";
import { initConfig } from "pkg/utils/initial";

VeForm.install = function (app, config) {
    // 初始化配置
    initConfig(app, 'form', config)
    // 注册组件
    app.component(VeForm.name, VeForm);
};

export default VeForm;
