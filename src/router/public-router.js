export default [
    {
        path: "/musepa",
        component: () => import("../views/PublicView.vue"),
        redirect: { name: "landing" },
        name: "musepa",
        children: [
            {
                path: "landing",
                name: "landing",
                component: () => import("../modules/public/views/LandingPageView.vue"),
                meta: {
                  title: "Inicio",
                  requireAuth: false,
                },
            }
        ]
    }
]