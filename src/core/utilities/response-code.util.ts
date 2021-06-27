export interface IResponseCode {
    code: ResponseCode;
    reasons: string[];
}

export const enum ResponseCode {
    ServerError = 0,
}

export const responseCodeMap: { [key: number]: { readonly code: string, readonly description: string } } = {
    [ResponseCode.ServerError]: { code: "ERR000", description: "Something went wrong." }
}