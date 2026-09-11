import { type Error } from './Response.ts'

export type Data<T> = {
    Data?: T;
    Error?: Error;
    Loading: boolean;
}