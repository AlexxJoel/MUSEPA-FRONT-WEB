import { ERoles } from '../kernel/types';

const rolesAllowed = [ERoles.VISITOR];


export default [
  {
    path: "/musepa/visitor",
    component: () => import("../modules/public/PublicView.vue"),
    redirect: { name: "landing" },
    name: "visitor-musepa",
    children: [
      {
        path: "profile",
        name: "visitor-profile",
        component: () => import("../modules/visitor/profile/views/ProfileView.vue"),
        meta: {
          title: "Perfil",
          requireAuth: true,
          role: rolesAllowed,
        },
      },
    ],
  }
]