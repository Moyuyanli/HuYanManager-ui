// map-menus.ts
import {type RouteRecordRaw} from 'vue-router';
import {defineAsyncComponent} from "vue";

const modules = import.meta.glob(['@/views/*.vue', '@/views/**/index.vue', '!@/views/Login.vue'])

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
            icon: 'Histogram' // menu菜单项的图标，我此处是与封装好的 svg 组件结合使用的
        }
    },
    {
        path: '/mirai',
        name: 'mirai',
        component: '@/views/mirai/index.vue',
        meta: {
            isShow: true, // 控制当前项是否在菜单栏中渲染出来，比如你写了 login 页面的路由，但是并不希望 login在menu菜单中渲染出来，即可设为false
            title: 'mirai管理', // menu菜单项的名称，没啥好说的
            icon: 'Setting' // menu菜单项的图标，我此处是与封装好的 svg 组件结合使用的
        }
    },
    {
        path: '/huyan-session',
        name: 'huyan-session',
        meta: {
            isShow: true,
            title: '壶言会话',
            icon: 'ChatLineSquare'
        },
        children: [
            {
                path: '/huyan-session/config',
                name: 'huyan-session-config',
                component: '@/views/plugin/config/index.vue',
                meta: {
                    title: '配置管理'
                }
            },
            {
                path: '/huyan-session/data',
                name: 'huyan-session-data',
                component: '@/views/plugin/data/index.vue',
                meta: {
                    title: '数据管理'
                }
            },
            {
                path: '/huyan-session/other',
                name: 'huyan-session-other',
                component: '@/views/plugin/other/index.vue',
                meta: {
                    title: '其他管理'
                }
            },
        ]
    },


];

/**
 * 将菜单数据转换为Vue Router的路由格式
 * @param menus
 */
export function mapMenusToRoutes(menus: MenuItem[]): RouteRecordRaw[] {
    console.log("modules",modules)
    // 返回转换后的路由配置
    return menus.map(item => ({
        path: item.path,
        name: item.name,
        component: modules[`${item.component?.replace("@", "/src")}`],
        meta: {
            isShow: item.meta.isShow ?? false,
            title: item.meta.title,
            icon: item.meta.icon ?? undefined,
        },
        children: item.children ? mapMenusToRoutes(item.children) : undefined
    }));
}
