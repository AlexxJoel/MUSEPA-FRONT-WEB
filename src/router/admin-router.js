export default [
  {
    path: "/musepa/admin",
    component: () => import("../modules/admin/views/TemplateView.vue"),
    redirect: { name: "events" },
    name: "admin",
    children: [
      {
        path: "events",
        name: "events",
        component: () => import("../modules/admin/views/events/EventsView.vue"),
        redirect: { name: "events-list" },
        meta: {
          title: "Inicio",
          requireAuth: false,
        },
        children: [
          {
            path: "list",
            name: "events-list",
            component: () => import("../modules/admin/views/events/ListEvenstView.vue"),
            meta: {
              title: "Eventos",
              requireAuth: false,
            },
          },
        ],
      },
    ]
  }
]
