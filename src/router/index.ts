import {createRouter, createWebHistory} from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/navigation",
            component: () => import("../views/navigation.vue"),
            meta: { hidden: true },
            children: [
                {
                    path: "/redirect/:path(.*)",
                    component: () => import("@/views/redirect/index.vue"),
                },
            ],
        },
        {
            path: '/',
            name: 'home',
            component: () => import("@/views/home.vue"),
        },

        {
            path: '/test',
            name: 'test',
            component: () => import("@/views/test.vue"),
        }
    ]
})

export default router
