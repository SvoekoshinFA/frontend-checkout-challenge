export type Response<T> = {
    data?: T;
    links?: {
        [key: string]: {
            href: string;
            method: Method;
        }
    };
    error?: Error;
    meta: {
        requestId: string;
    }
}

export type Error = {
    code: string;
    message: string;
    fields?: {
        [key: string]: string;
    }
}

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';