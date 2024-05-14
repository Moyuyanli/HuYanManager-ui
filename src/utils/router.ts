import {splicingRouter} from "@/router";

let routeStatus = false;

export function getRouteStatus() {
    return routeStatus
}

export function setRouteStatus(route: boolean) {
    routeStatus = route
}


export async function handleLoginSuccess() {
    // const info = getInfo();
    // 动态添加路由
    splicingRouter();
}
