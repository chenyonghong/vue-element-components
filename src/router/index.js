import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  mode
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/select",
    name: "BaseSelect",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/select/index.vue"),
  },
  {
    path: "/tree",
    name: "BaseTree",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/tree/index.vue"),
  },
  {
    path: "/table",
    name: "VeTable",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/table/index.vue"),
  },
  {
    path: "/table2",
    name: "VeTable2",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/table/index2.vue"),
  },
  {
    path: "/form",
    name: "VeForm",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/form/index.vue"),
  },
  {
    path: "/dialog",
    name: "VeDialog",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/dialog/index.vue"),
  },
];

const router = new VueRouter({
  routes
})

export default router
