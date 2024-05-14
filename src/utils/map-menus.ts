// map-menus.ts
import {type RouteRecordRaw} from 'vue-router';

const modules = import.meta.glob(['@/views/*.vue','@/views/**/index.vue','!@/views/Login.vue'])

// 菜单数据结构
export interface MenuItem {
    path: string;
    name: string;
    component?: string; // 这里应该是组件的实际路径，例如：'@/views/index.vue'
    children?: MenuItem[];
    meta: {
        isShow?: boolean, // 控制当前项是否在菜单栏中渲染出来，比如你写了 login 页面的路由，但是并不希望 login在menu菜单中渲染出来，即可设为false
        title: string, // menu菜单项的名称，没啥好说的
        icon?: string // menu菜单项的图标，我此处是与封装好的 svg 组件结合使用的
    }
}
// 示例菜单数据
export const menuData: MenuItem[] = [
    {
        path: '/home',
        name: 'homeIndex',
        component: '@/views/home/index.vue',
        meta: {
            isShow: true, // 控制当前项是否在菜单栏中渲染出来，比如你写了 login 页面的路由，但是并不希望 login在menu菜单中渲染出来，即可设为false
            title: '首页', // menu菜单项的名称，没啥好说的
            icon: 'menu-home' // menu菜单项的图标，我此处是与封装好的 svg 组件结合使用的
        }
    },
    {
        path: '/echarts',
        name: 'echartIndex',
        meta: {
            isShow: true,
            title: 'Echarts页',
            icon: 'menu-echarts'
        },
        children: [
            {
                path: '/echarts/barCharts',
                name: 'barCharts',
                component: '@/views/About.vue',
                meta: {
                    title: '柱状图'
                }
            },
            {
                path: '/echarts/pieCharts',
                name: 'pieCharts',
                component: '@/views/SubAbout.vue',
                meta: {
                    title: '饼图'
                }
            }
        ]
    },
];


/**
 * 将菜单数据转换为Vue Router的路由格式
 * @param menus
 */
export function mapMenusToRoutes(menus: MenuItem[]): RouteRecordRaw[] {
    // 返回转换后的路由配置
    return menus.map(item => ({
        path: item.path,
        name: item.name,
        component: item.component ?
            modules[`${item.component.replace("@","/src")}`]
            // () => import(
            /* @vite-ignore */
            /* webpackChunkName: "[request]" */
            // `${item.component}`)
            : () => import('@/views/Error.vue'),
        meta: {
            isShow: item.meta.isShow ?? false,
            title: item.meta.title,
            icon: item.meta.icon ?? undefined,
        },
        children: item.children ? mapMenusToRoutes(item.children) : undefined
    }));
}
