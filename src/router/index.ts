import {createRouter, createWebHistory} from 'vue-router'
import {mapMenusToRoutes, menuData} from '@/utils/map-menus'
import {getToken} from "@/utils/auth";
import Login from "@/views/Login.vue";

async function createAppRouter() {
    const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
            {
                path: '',
                name: 'layoutIndex',
                component: () => import('@/layout/index.vue'),
                children: [
                    {
                        path: '/home',
                        name: 'homeIndex',
                        component: () => import('@/views/home/index.vue'),
                        meta: {
                            isShow: true, // 控制当前项是否在菜单栏中渲染出来，比如你写了 login 页面的路由，但是并不希望 login在menu菜单中渲染出来，即可设为false
                            title: '首页', // menu菜单项的名称，没啥好说的
                            icon: 'menu-home' // menu菜单项的图标，我此处是与封装好的 svg 组件结合使用的
                        }
                    },
                    {
                        path: '/echarts',
                        name: 'echartIndex',
                        // component: () => import('@/views/echarts/index.vue'),
                        meta: {
                            isShow: true,
                            title: 'Echarts页',
                            icon: 'menu-echarts'
                        },
                        children: [
                            {
                                path: '/echarts/barCharts',
                                name: 'barCharts',
                                component: () => import('@/views/About.vue'),
                                meta: {
                                    title: '柱状图'
                                }
                            },
                            {
                                path: '/echarts/pieCharts',
                                name: 'pieCharts',
                                component: () => import('@/views/SubAbout.vue'),
                                meta: {
                                    title: '饼图'
                                }
                            }
                        ]
                    },
                ],

            },
            {
                path: '/login',
                name: 'Login',
                component: Login,
            },
        ],
    });

    // const userMenuData :HomeInfo = (await getInfo()).data; // 假设这是获取菜单数据的方法

    // 将菜单数据映射为路由
    const dynamicRoutes = mapMenusToRoutes(menuData  /*userMenuData.menus*/);
    dynamicRoutes.forEach(route => router.addRoute(route));

    return router;
}

const router = await createAppRouter()

router.beforeEach(async (to, from, next) => {
    // 获取token
    const token = getToken();

    // 如果有token，则直接通过
    if (token) {
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


// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         {
//             path: "/navigation",
//             component: () => import("../views/Navigation.vue"),
//             meta: { hidden: true },
//             children: [
//                 {
//                     path: "/redirect/:path(.*)",
//                     component: () => import("@/views/redirect/index.vue"),
//                 },
//             ],
//         },
//         {
//             path: '/',
//             name: 'home',
//             component: () => import("@/views/Login.vue"),
//         },
//
//         {
//             path: '/test',
//             name: 'test',
//             component: () => import("@/views/test.vue"),
//         }
//     ]
// })

// export default router
