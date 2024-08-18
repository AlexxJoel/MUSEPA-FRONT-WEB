import Vue from 'vue'
import VueRouter from 'vue-router'
import {jwtDecode} from "jwt-decode";
import publicRoute from "./public-router";
import { ERoles } from '../kernel/types';
import adminRouter from './admin-router';
import visitorRouter from './visitor-router';

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
        {
          path: "/change-temporary-password",
          props: true,
          name: "change-temporary-password",
          component: () => import("../modules/auth/views/ChangeTemporaryView.vue"),
          meta: {
            title: "Cambiar contraseña temporal",
            requireAuth: false,
          },
        },
        ...publicRoute,
        ...visitorRouter,
        ...adminRouter,
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFound404.vue"),
      meta: {
        title: "Página no encontrada",
        requireAuth: false,
      },
    },
  ]
});

router.beforeEach((to, from, next) => {
  if (localStorage.token) {
    const rl = jwtDecode(localStorage.token);

    const roles = rl["cognito:groups"];
    const role = roles[0];

    console.log(role);

    if(!role) {
      next({ name: "login" });
    }

    

    const redirectAdminComponents = [
      "login",
      "create-account",
      "change-temporary-password",
      "public-musepa",  
    ];

    const redirectVisitorComponents = [
      "login",
      "create-account",
      "change-temporary-password",
      "admin",
    ];

    const listToNames = to.matched.map((route) => route.name);

    if (role === ERoles.MANAGER && redirectAdminComponents.find((route) => listToNames.includes(route))) {
      next({ name: "admin" });
    }


    if (role === ERoles.VISITOR && redirectVisitorComponents.find((route) => listToNames.includes(route))) {
      next({ name: "public-musepa" });
    }


    if (role && to.matched.some((route) => route.meta.requireAuth)) {
      const allowedRoles = to.meta.role;
      if (allowedRoles.includes(role)) {
        next();
        return;
      }
      next({ name: "login" });
      return;
    }
    next();
    return;
  }
  if (!to.matched.some((noAuth) => noAuth.meta.requireAuth)) {
    next();
    return;
  }
  next({ name: "login" });
});

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = to.meta?.title || DEFAULT_TITLE;
  });
});

export default router
