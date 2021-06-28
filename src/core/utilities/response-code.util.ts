export interface IBaseResponseObject {
    statusCode: string;
    message: string;
}
export interface IResponseObject {
    code: ResponseCode;
    reasons: string[];
}

export const enum ResponseCode {
    ServerError = 0,
    ClientError = 1,
    UrlExists = 2
}

export const responseCodeMap: { [key: number]: { readonly code: string, readonly description: string } } = {
    [ResponseCode.ServerError]: { code: "ERR000", description: "Something went wrong." },
    [ResponseCode.ClientError]: { code: "ERR001", description: "Client Error" },
    [ResponseCode.UrlExists]: { code: "ERR002", description: "Url already exist." }
}