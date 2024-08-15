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
        component: () => import("../modules/admin/home/views/HomeAdminView.vue"),
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
            component: () => import("../modules/admin/events/views/ListEventsView.vue"),
            meta: {
              title: "Eventos",
              requireAuth: false,
            },
          },
          {
            path: "save",
            name: "event-save",
            component: () => import("../modules/admin/events/views/SaveEventView.vue"),
            meta: {
              title: "Crear Evento",
              requireAuth: true,
              role: rolesAllowed,
            },
          },
          {
            path: "detail/:id",
            name: "event-detail",
            component: () => import("../modules/admin/events/views/DetailsEventView.vue"),
            meta: {
              title: "Detalle del Evento",
              requireAuth: false,
            },

          }
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
            component: () => import("../modules/admin/works/views/ListWorksView.vue"),
            meta: {
              title: "Lista de Obras",
              requireAuth: false,
            },
          },
          {
            path: "save",
            name: "work-save",
            component: () => import("../modules/admin/works/views/SaveWorkView.vue"),
            meta: {
              title: "Crear Obra",
              requireAuth: true,
              role: rolesAllowed,
            },
          },
          {
            path: "detail/:id",
            name: "work-detail",
            component: () => import("../modules/admin/works/views/DetailsWorkView.vue"),
            meta: {
              title: "Detalle del Evento",
              requireAuth: false,
            },

          }
        ],
      },
      {
        path: "profile",
        name: "admin-profile",
        component: () => import("../modules/admin/profile/views/ProfileAdminVIew.vue"),
        meta: {
          title: "Perfil",
          requireAuth: false,
        }
      },
      {
        path: "edit-profile",
        name: "admin-edit-profile",
        component: () => import("../modules/admin/profile/views/EditProfileView.vue"),
        meta: {
          title: "Editar Perfil",
          requireAuth: false,
        }
      },
    ]
  }
]
