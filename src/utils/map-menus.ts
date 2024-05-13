// map-menus.ts
import {type RouteRecordRaw} from 'vue-router';

// 假设的菜单数据结构
export interface MenuItem {
    path: string;
    name: string;
    component: string; // 这里应该是组件的实际路径，例如：'@/views/index.vue'
    children?: MenuItem[]; // 可选的子菜单项
}

// 示例菜单数据
export const menuData: MenuItem[] = [
    {
        path: '/about',
        name: 'About',
        component: '@/views/About.vue',
        children: [
            {
                path: 'sub-about',
                name: 'SubAbout',
                component: '@/views/SubAbout.vue'
            }
        ]
    }
];

// 将菜单数据转换为Vue Router的路由格式
export function mapMenusToRoutes(menus: MenuItem[]): RouteRecordRaw[] {
    return menus.map(item => ({
        path: item.path,
        name: item.name,
        component: () => import(
            /* @vite-ignore */
            /* webpackChunkName: "[request]" */
            `${item.component}`), // 动态导入组件
        children: item.children ? mapMenusToRoutes(item.children) : undefined
    }));
}

