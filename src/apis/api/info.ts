import {post} from "@/utils/methods";
import type {Result} from "@/apis/type/Results";
import type {MenuItem} from "@/utils/map-menus";
import {ElMessage} from "element-plus";

export interface RouterInfo {
    menus: MenuItem[];
}

export interface SystemInfo {
    title: string;
    description: string;
    service_version: string;
    ui_version: string;
    plugin_version: string;
}

export interface OtherInfo {
    title: string;
    description: string;
    service_version: string;
    ui_version: string;
    plugin_version: string;
}

/**
 * 获取路由信息
 */
export async function getRouter() {
    return post<Result<RouterInfo>>("api/getRouter")
}

/**
 * 获取系统信息
 */
export async function getSysInfo() {
    return post<Result<SystemInfo>>("api/getSysInfo")
}
