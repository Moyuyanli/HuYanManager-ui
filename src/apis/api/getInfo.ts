import {post} from "@/utils/methods";
import type {Result} from "@/apis/type/Results";
import type {MenuItem} from "@/utils/map-menus";

export interface HomeInfo {
    title: string;
    description: string;
    menus: MenuItem[];
}


export function getInfo() {
    return post<Result<HomeInfo>>("api/getInfo")
}
