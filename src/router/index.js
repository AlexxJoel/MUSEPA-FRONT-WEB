import Vue from 'vue'
import VueRouter from 'vue-router'
import {jwtDecode} from "jwt-decode";
import publicRoute from "./public-router";
import { ERoles } from '../kernel/types';
import adminRouter from './admin-router';

Vue.use(VueRouter);
const DEFAULT_TITLE = "MUSEPA";

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: { name: "public-musepa" },
    },
    {
      path: "/",
      component: { render: (c) => c("router-view") },
      children: [
        {
          path: "/login",
          props: true,
          name: "login",
          component: () => import("../modules/auth/views/LoginView.vue"),
          meta: {
            title: "Iniciar sesión",
            requireAuth: false,
          },
        },
        {
          path: "/create-account",
          props: true,
          name: "create-account",
          component: () => import("../modules/auth/views/CreateAccountView.vue"),
          meta: {
            title: "Iniciar sesión",
            requireAuth: false,
          },
        },
        ...publicRoute,
        ...adminRouter,
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (localStorage.token) {
    const rl = jwtDecode(localStorage.token);
    const roles = rl["cognito:groups"];
    const role = roles[0];
    if (
      (role === ERoles.MANAGER &&
        to.matched.some((route) => route.path === "/musepa")) ||
      (role === ERoles.MANAGER &&
        to.matched.some((route) => route.path === "/landing")) ||
      (role === ERoles.MANAGER &&
        to.matched.some((route) => route.path === "/login"))
    )
      next("/manager");
    if (
      (role === ERoles.VISITOR &&
        to.matched.some((route) => route.path === "/musepa")) ||
      (role === ERoles.VISITOR &&
        to.matched.some((route) => route.path === "/landing")) ||
      (role === ERoles.VISITOR &&
        to.matched.some((route) => route.path === "/login"))
    )
      next("/visitor");
    if (role && to.matched.some((route) => route.meta.requireAuth)) {
      const allowedRoles = to.meta.role;
      if (allowedRoles.includes(role)) {
        next();
        return;
      }
      next("/login");
      return;
    }
    next();
    return;
  }
  if (!to.matched.some((noAuth) => noAuth.meta.requireAuth)) {
    next();
    return;
  }
  next("/login");
});

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta?.title || DEFAULT_TITLE;
  });
});

export default router
