import { ErrorResponseDto } from "./error-response.dto";

export class BaseResponseDto {
    status: boolean;
    statusCode: number;
    error: ErrorResponseDto;
}