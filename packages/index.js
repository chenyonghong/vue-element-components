import VeTable from "./ve-table";
import VeForm from "./ve-form";
import { version } from "../package.json";
import { initConfig } from "@/utils/initial";

//按需引入
export { VeTable, VeForm };
const components = [VeTable, VeForm];

const install = (app, config) => {
  initConfig(app, '', config);
  components.forEach((component) => {
    app.component(component.name, component);
  });
};
export default {
  install,
  version,
};


