import { App } from "vue";
import VeGrid from "./src/index.vue";
import { initConfig } from "pkg/utils/initial";

VeGrid.install = function (app: App, config: Record<string, any>) {
    // 初始化配置
    initConfig(app, 'grid', config)
    // 注册组件
    app.component(VeGrid.name, VeGrid);
};

export default VeGrid;
