import { EncodeUrlRequestDto } from '../dto/request/encode-url-request.dto';
import { BaseResponseDto } from '../dto/response/base-response.dto';

export const IUrlService = Symbol('IUrlService');
export interface IUrlService {
  encodeUrl(requestDTO: EncodeUrlRequestDto): BaseResponseDto;
  decodeUrl(shortUrl: string): BaseResponseDto;
  getStatistics(urlPath: string): BaseResponseDto;
}
