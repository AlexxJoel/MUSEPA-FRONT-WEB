export default [
  {
    path: "/musepa/admin",
    component: () => import("../modules/admin/TemplateView.vue"),
    redirect: { name: "admin-events" },
    name: "admin",
    children: [
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
        ],
      },
    ]
  }
]
