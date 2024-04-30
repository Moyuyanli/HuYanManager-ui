import {post} from "@/utils/methods";

interface LoginUser{
    username:string,
    password:string,
}


interface UserInfo {
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
export function login(data:LoginUser) {
    return post<UserInfo>("auth/login", data)
        .then(res=>{
            localStorage.setItem('token', res.token);
            return res;
        }).catch(error => {
            console.error('Login failed:', error);
            throw error;
        });
}