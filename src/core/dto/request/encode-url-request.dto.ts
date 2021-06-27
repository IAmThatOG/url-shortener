import { IsUrl, isURL } from "class-validator";

export class EncodeUrlRequestDto {
    @IsUrl()
    readonly longUrl: string;
}