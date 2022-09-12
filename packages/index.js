import VeTable from "./ve-table";
import { version } from "../package.json";

//按需引入
export { VeTable };
const components = [VeTable];

const install = (app) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};
export default {
  install,
  version,
};


