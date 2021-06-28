import { ErrorResponseDto } from "./error-response.dto";

export class BaseResponseDto {
    status: boolean;
    statusCode: number;
    message?: string;
    error?: ErrorResponseDto;
}