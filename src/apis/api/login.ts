import {post} from "@/utils/methods";
import type {Result} from "@/apis/type/Results";

export interface LoginUser {
    username: string,
    password: string,
}


export interface UserInfo {
    user: {
        id: number;
        username: string;
        email: string;
    };
    token: string;
}

/**
 * 登录
 * @param data
 */
export function login(data: LoginUser) {
    return post<Result<UserInfo>>("auth/login", data)
}