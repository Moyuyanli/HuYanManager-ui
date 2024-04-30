import { get } from '@/utils/methods'

export interface UserRequest{
    pageNum?:number,
    pageSize?:number,
}


export  function userRequest(params: UserRequest) {
    return get('/users', { params }); //测试接口
}
