export default [
    {
        path: "/musepa",
        component: () => import("../modules/public/PublicView.vue"),
        redirect: { name: "landing" },
        name: "public-musepa",
        children: [
            {
                path: "landing",
                name: "landing",
                component: () => import("../modules/public/Landing/LandingPageView.vue"),
                meta: {
                  title: "Inicio",
                  requireAuth: false,
                },
            }, 
            {
                path: "events",
                name: "public-events",
                component: () => import("../modules/public/events/views/EventsView.vue"),
                redirect: { name: "public-events-list" },
                meta: {
                  requireAuth: false,
                },
                children: [
                  {
                    path: "list",
                    name: "public-events-list",
                    component: () => import("../modules/public/events/views/ListEventsView.vue"),
                    meta: {
                      title: "Eventos",
                      requireAuth: false,
                    },
                  },
                  {
                    path: "detail/:id",
                    name: "public-event-detail",
                    component: () => import("../modules/public/events/views/DetailsEventView.vue"),
                    meta: {
                      title: "Detalle del Evento",
                      requireAuth: false,
                    },
                    
                  }
                ],
              },
              {
                path: "works",
                name: "public-works",
                component: () => import("../modules/public/works/views/WorksView.vue"),
                redirect: { name: "public-works-list" },
                meta: {
                  requireAuth: false,
                },
                children: [
                  {
                    path: "list",
                    name: "public-works-list",
                    component: () => import("../modules/public/works/views/ListWorksView.vue"),
                    meta: {
                      title: "Lista de Obras",
                      requireAuth: false,
                    },
                  },
                  {
                    path: "detail/:id",
                    name: "public-work-detail",
                    component: () => import("../modules/public/works/views/DetailsWorkView.vue"),
                    meta: {
                      title: "Detalle de la Obra",
                      requireAuth: false,
                    },
                    
                  }
                ],
                
              },

        ]
    }
]