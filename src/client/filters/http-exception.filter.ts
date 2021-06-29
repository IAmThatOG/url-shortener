import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { IResponseObject, ResponseCode, responseCodeMap } from '../../core/utilities/response-code.util';
import { BaseResponseDto } from '../../core/dto/response/base-response.dto';

interface ErrorObject {
  httpStatus: number;
  timestamp: string;
  path: string;
  method: string;
  error: string;
  message: string
  responseCode?: ResponseCode;
  reasons: string[];
}

// export interface ErrorRes

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const httpStatus = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;



    // let errorMsg: string;

    // switch (httpStatus) {
    //   case HttpStatus.BAD_REQUEST:
    //     errorMsg = 'Invalid Request. Kindly send a valid request';
    //     break;
    //   case HttpStatus.NOT_MODIFIED:
    //     errorMsg = 'Failed to update data. Please try again';
    //     break;
    //   case HttpStatus.UNAUTHORIZED:
    //     errorMsg = 'User unauthorised. Please login.';
    //     break;
    //   case HttpStatus.NOT_FOUND:
    //     errorMsg = 'Entity does not exist';
    //     break;
    //   case HttpStatus.UNPROCESSABLE_ENTITY:
    //     errorMsg = 'Request could not be processed. Please try again';
    //     break;
    //   default:
    //     errorMsg = responseCodeMap[ResponseCode.ServerError].description;
    //     break;
    // }

    // var responseObject = exception.getResponse() as IResponseObject;
    // if (!responseObject) {
    //   const
    // }
    let messages: Array<string> = [];
    if (exception.getResponse()["message"]) {
      if (typeof exception.getResponse()["message"] == "string") {
        messages.push(exception.getResponse()["message"]);
      } else {
        const source = exception.getResponse()["message"][0]["constraints"];
        const keys = Object.keys(source);
        for (let k of keys) {
          messages.push(source[k]);
        };
      }
    }




    const errorObj: ErrorObject = {
      httpStatus: httpStatus,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      error: exception.name,
      message: exception.message || null,
      responseCode: (exception.getResponse() as IResponseObject).code,
      reasons: (exception.getResponse() as IResponseObject).reasons || messages
    };

    Logger.error(`${request.method} ==> ${request.url}`, JSON.stringify(errorObj), HttpExceptionFilter.name);
    const errorResponse: BaseResponseDto = {
      status: false,
      statusCode: httpStatus,
      message: errorObj.message,
      error: {
        httpMethod: errorObj.method,
        requestPath: errorObj.path,
        errorCode: responseCodeMap[errorObj.responseCode || ResponseCode.ClientError].code || exception.name,
        description: responseCodeMap[errorObj.responseCode || ResponseCode.ClientError].description,
        reasons: errorObj.reasons
      }
    };
    response.status(httpStatus).json(errorResponse);
  }
}
