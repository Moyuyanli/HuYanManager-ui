import {post} from "@/utils/methods";
import type {Result} from "@/apis/type/Results";

export interface LoginUser {
    username: string,
    password: string,
}

export interface UserInfo {
    id: number;
    username: string;
    url: string;
    startTime: Date;
}


export interface LoginResult {
    user: UserInfo;
    token: string;
}

/**
 * 登录
 * @param data
 */
export function login(data: LoginUser) {
    return post<Result<LoginResult>>("auth/login", data)
}
