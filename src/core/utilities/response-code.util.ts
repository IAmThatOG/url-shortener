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
  UrlExists = 2,
  InvalidUrl = 3,
  InvalidShortUrl = 4,
  InvalidUrlPath = 5,
  UrlNotFound = 6,
}

export const responseCodeMap: {
  [key: number]: { readonly code: string; readonly description: string };
} = {
  [ResponseCode.ServerError]: {
    code: 'ERR000',
    description: 'Something went wrong.',
  },
  [ResponseCode.ClientError]: { code: 'ERR001', description: 'Client Error' },
  [ResponseCode.UrlExists]: {
    code: 'ERR002',
    description: 'Url already exist.',
  },
  [ResponseCode.InvalidUrl]: { code: 'ERR003', description: 'Url is invalid' },
  [ResponseCode.InvalidShortUrl]: {
    code: 'ERR004',
    description: 'Short url is invalid',
  },
  [ResponseCode.InvalidUrlPath]: {
    code: 'ERR005',
    description: 'Url path is invalid',
  },
  [ResponseCode.UrlNotFound]: { code: 'ERR006', description: 'Url not found' },
};
