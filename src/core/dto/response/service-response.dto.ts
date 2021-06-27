import { BaseResponseDto } from "./base-response.dto";

export class ServiceResponseDto<T> extends BaseResponseDto {
    payload: T;
}