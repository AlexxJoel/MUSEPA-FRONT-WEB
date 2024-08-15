const rolesAllowed = ["manager"];
export default [
  {
    path: "/musepa/admin",
    component: () => import("../modules/admin/TemplateView.vue"),
    redirect: { name: "admin-home" },
    name: "admin",
    children: [
      {
        path: "dashboard",
        name: "admin-home",
        component: () =>
          import("../modules/admin/home/views/HomeAdminView.vue"),
        meta: {
          requireAuth: false,
        },
      },
      {
        path: "events",
        name: "admin-events",
        component: () => import("../modules/admin/events/views/EventsView.vue"),
        redirect: { name: "events-list" },
        meta: {
          requireAuth: false,
        },
        children: [
          {
            path: "list",
            name: "events-list",
            component: () =>
              import("../modules/admin/events/views/ListEventsView.vue"),
            meta: {
              title: "Eventos",
              requireAuth: false,
            },
          },
          {
            path: "save",
            name: "event-save",
            component: () =>
              import("../modules/admin/events/views/SaveEventView.vue"),
            meta: {
              title: "Crear Evento",
              requireAuth: true,
              role: rolesAllowed,
            },
          },
          {
            path: "detail/:id",
            name: "event-detail",
            component: () =>
              import("../modules/admin/events/views/DetailsEventView.vue"),
            meta: {
              title: "Detalle del Evento",
              requireAuth: false,
            },
          },
        ],
      },
      {
        path: "works",
        name: "admin-works",
        component: () => import("../modules/admin/works/views/WorksView.vue"),
        redirect: { name: "works-list" },
        meta: {
          requireAuth: false,
        },
        children: [
          {
            path: "list",
            name: "works-list",
            component: () =>
              import("../modules/admin/works/views/ListWorksView.vue"),
            meta: {
              title: "Lista de Obras",
              requireAuth: true,
              role: rolesAllowed,
            },
          },
          {
            path: "save",
            name: "work-save",
            component: () =>
              import("../modules/admin/works/views/SaveWorkView.vue"),
            meta: {
              title: "Crear Obra",
              requireAuth: true,
              role: rolesAllowed,
            },
          },
          {
            path: "detail/:id",
            name: "work-detail",
            component: () =>
              import("../modules/admin/works/views/DetailsWorkView.vue"),
            meta: {
              title: "Detalle del Evento",
              requireAuth: true,
              role: rolesAllowed,
            },
          },
        ],
      },
      {
        path: "profile",
        name: "admin-profile",
        component: () =>
          import("../modules/admin/profile/views/ProfileAdminVIew.vue"),
        meta: {
          title: "Perfil",
          requireAuth: false,
          role: rolesAllowed,
        },
      },
      {
        path: "edit-profile",
        name: "admin-edit-profile",
        component: () =>
          import("../modules/admin/profile/views/EditProfileView.vue"),
        meta: {
          title: "Editar Perfil",
          requireAuth: true,
          role: rolesAllowed,
        },
      },
      {
        path: "users",
        name: "admin-users",
        component: () => import("../modules/admin/users/views/UsersView.vue"),
        redirect: { name: "users-list" },
        meta: {
          requireAuth: false,
        },
        children: [
          {
            path: "list",
            name: "users-list",
            component: () => import("../modules/admin/users/views/ListUsersView.vue"),
            meta: {
              title: "Usuarios",
              requireAuth: false,
            },
          },
          {
            path: "save",
            name: "user-save",
            component: () => import("../modules/admin/users/views/SaveUserView.vue"),
            meta: {
              title: "Crear Usuario",
              requireAuth: true,
              role: rolesAllowed,
            },
          },
          {
            path: "detail/:id",
            name: "user-detail",
            component: () => import("../modules/admin/users/views/DetailsUserView.vue"),
            meta: {
              title: "Detalle del usuario",
              requireAuth: false,
            },

          }
        ],
      },
    ]
  }
]
