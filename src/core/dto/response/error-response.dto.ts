export interface ErrorResponseDto {
    httpMethod: string;
    requestPath: string;
    errorCode: string;
    description: string;
    reasons: string[];
}