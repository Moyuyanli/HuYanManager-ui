export interface Result<T> {
    code: number;
    msg: string;
    data: any | T;
}