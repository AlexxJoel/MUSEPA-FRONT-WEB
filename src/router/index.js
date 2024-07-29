import Vue from 'vue'
import VueRouter from 'vue-router'
import publicRoute from "./public-router";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/musepa",
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
        ...publicRoute,
      ]
    }
  ]
})

export default router
