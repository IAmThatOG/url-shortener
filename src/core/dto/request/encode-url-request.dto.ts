import { IsNotEmpty, IsUrl, isURL } from "class-validator";

export class EncodeUrlRequestDto {
    @IsNotEmpty()
    @IsUrl()
    longUrl: string;
}