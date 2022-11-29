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
        meta: { transition: 'slide-left' },
      },
      // // orders rotues
      // {
      //   path: "orders",
      //   name: "orders",
      //   component: () => import('@/views/orders/index.vue'),
      //   meta: { transition: 'slide-right'},
      // },

      // invoices rotues
      {
        path: "invoices",
        name: "invoices",
        component: () => import('@/views/invoices/index.vue'),
      },
      {
        path: "recents",
        name: "recents",
        component: () => import('@/views/recents/index.vue'),
      },
      {
        path: "recents/:id",
        name: "recents-view",
        component: () => import('@/views/recents/view.vue'),
      },
      {
        path: "debit",
        name: "debit",
        component: () => import('@/views/debit/index.vue'),
      },
      {
        path: "credit",
        name: "credit",
        component: () => import('@/views/credit/index.vue'),
      },
      // lcoal invoices
      {
        path: "invoices/local",
        name: "invoices-local",
        component: () => import('@/views/invoices/local/index.vue'),
      },
      {
        path: "invoices/local/edit",
        name: "invoices-local-edit",
        component: () => import('@/views/invoices/local/edit.vue'),
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
