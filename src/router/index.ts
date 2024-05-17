import {createRouter, createWebHistory} from 'vue-router'
import {getMenuItems, mapMenusToRoutes} from '@/utils/map-menus'
import {getToken} from "@/utils/auth";
import Login from "@/views/Login.vue";


// 初始化基础路由
const baseRoutes =

    [
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
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: baseRoutes,
})

// 动态添加路由的函数
async function addDynamicRoutes() {
    try {
        const menuData = await getMenuItems(); // 假设此函数异步获取菜单数据
        const dynamicRoutes = mapMenusToRoutes(menuData);
        dynamicRoutes.forEach(route => router.addRoute('layoutIndex', route));
    } catch (error) {
        console.error("Failed to load dynamic routes:", error);
    }
}

// 用户登录成功的处理
export async function handleLoginSuccess() {
    await addDynamicRoutes(); // 登录后加载动态路由
    // 可以在此处进行重定向等操作
}

// 路由守卫
router.beforeEach(async (to, from, next) => {
    const token = getToken();

    // 如果是登录页面且有token，重定向到首页
    if (to.path === '/login' && token) {
        next('/home');
    } else if (token) {
        // 已登录但动态路由可能还未加载，可以考虑加个加载页面或直接等待
        if (router.getRoutes().length <= baseRoutes.length) {
            // 这里可以重定向到一个加载页面，或者直接等待动态路由加载完成
            // 为简化示例，这里假设addDynamicRoutes已处理好异步逻辑
            await addDynamicRoutes();
        }
        next();
    } else {
        // 未登录处理
        if (!to.path.includes('/login')) {
            next('/login');
        } else {
            next();
        }
    }
});

export default router;
