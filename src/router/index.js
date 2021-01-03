import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
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
];

const router = new VueRouter({
  routes
})

export default router
