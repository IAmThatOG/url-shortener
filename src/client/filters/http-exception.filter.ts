import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger, HttpStatus, BadRequestException } from '@nestjs/common';
import { Response, Request } from 'express';
import { stringLiteral } from '@babel/types';
import { IResponseCode, ResponseCode, responseCodeMap } from 'src/core/utilities/response-code.util';
import { BaseResponseDto } from 'src/core/dto/response/base-response.dto';
import { ErrorResponseDto } from 'src/core/dto/response/error-response.dto';

interface ErrorObject {
  httpStatus: number;
  timestamp: string;
  path: string;
  method: string;
  error: string;
  message: string
  responseCode: ResponseCode;
  reasons: string[];
}

// export interface ErrorRes

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const httpStatus = exception.getStatus();

    const errorObj: ErrorObject = {
      httpStatus: httpStatus,
      timestamp: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      error: exception.name,
      message: exception.message || null,
      responseCode: (exception.getResponse() as IResponseCode).code,
      reasons: (exception.getResponse() as IResponseCode).reasons
    };

    let errorMsg: string;

    switch (httpStatus) {
      case HttpStatus.BAD_REQUEST:
        errorMsg = 'Invalid Request. Kindly send a valid request';
        break;
      case HttpStatus.NOT_MODIFIED:
        errorMsg = 'Failed to update data. Please try again';
        break;
      case HttpStatus.UNAUTHORIZED:
        errorMsg = 'User unauthorised. Please login.';
        break;
      case HttpStatus.NOT_FOUND:
        errorMsg = 'Entity does not exist';
        break;
      case HttpStatus.UNPROCESSABLE_ENTITY:
        errorMsg = 'Request could not be processed. Please try again';
        break;
      default:
        errorMsg = responseCodeMap[ResponseCode.ServerError].description;
        break;
    }

    Logger.error(`${request.method} ==> ${request.url}`, JSON.stringify(errorObj), HttpExceptionFilter.name);
    const errorResponse: BaseResponseDto = {
      status: false,
      statusCode: httpStatus,
      error: {
        errorCode: responseCodeMap[errorObj.responseCode].code,
        description: responseCodeMap[errorObj.responseCode].description || errorMsg,
        reasons: errorObj.reasons
      }
    };
    response.status(httpStatus).json(errorResponse);
  }
}
