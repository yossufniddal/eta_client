import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Base from "@/components/base/base.vue";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Base,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
      },
      // orders rotues
      {
        path: "orders",
        name: "orders",
        component: () => import('@/views/orders/index.vue'),
      },
      {
        path: "orders/unconverted",
        name: "orders/unconverted",
        component: () => import('@/views/orders/unconverted.vue'),
      },

      // invoices rotues
      {
        path: "invoices",
        name: "invoices",
        component: () => import('@/views/invoices/index.vue'),
      },
    ]
  },
  // {
  //   path: '/server-error',
  //   component: () => import('@/views/errors/server.vue'),
  // },
  {
    path: '/login',
    component:Login
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
