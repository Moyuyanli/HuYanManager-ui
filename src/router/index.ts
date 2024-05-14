import {createRouter, createWebHistory} from 'vue-router'
import {mapMenusToRoutes, menuData, type MenuItem} from '@/utils/map-menus'
import {getToken} from "@/utils/auth";
import Login from "@/views/Login.vue";
import {handleLoginSuccess} from "@/utils/router";

function createAppRouter() {
    return createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: '',
                name: 'layoutIndex',
                component: () => import('@/layout/index.vue'),
                children: [],

            },
            {
                path: '/login',
                name: 'Login',
                component: Login,
            },
        ],
    });
}

const router = createAppRouter()

/**
 * 拼接动态路由
 * @param menu
 */
export function splicingRouter(menu: MenuItem[] = menuData) {
    const dynamicRoutes = mapMenusToRoutes(menu);
    dynamicRoutes.forEach(route => router.addRoute('layoutIndex', route));
}

/**
 * 路由守卫
 */
router.beforeEach(async (to, from, next) => {
    // 获取token
    const token = getToken();

    // 如果有token，则直接通过
    if (token) {
        if (to.path !== '/login') {
            if (router.getRoutes().length == 2) {
                handleLoginSuccess().then(() => {
                    next('/home')
                })
                return
            }
        }
        next();
    } else {
        // 没有token且前往的不是登录页，则重定向到登录页
        if (!to.path.includes('/login')) {
            next('/login');
        } else {
            // 正在前往登录页，直接通过
            next();
        }
    }
});


export default router;
