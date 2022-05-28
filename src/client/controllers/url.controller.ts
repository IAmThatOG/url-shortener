import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { IUrlService } from '../../core/services/url-service.interface';
import { Body } from '@nestjs/common';
import { EncodeUrlRequestDto } from '../../core/dto/request/encode-url-request.dto';
import { BaseResponseDto } from '../../core/dto/response/base-response.dto';

@Controller('url')
export class UrlController {
  constructor(@Inject(IUrlService) private readonly urlService: IUrlService) {}

  @Post('/encode')
  shortenUrl(@Body() requestDto: EncodeUrlRequestDto): BaseResponseDto {
    return this.urlService.encodeUrl(requestDto);
  }

  @Get('/decode')
  @HttpCode(HttpStatus.TEMPORARY_REDIRECT)
  RedirectUrl(@Query('shortUrl') shortUrl: string): BaseResponseDto {
    return this.urlService.decodeUrl(shortUrl);
  }

  @Get('/statistics/:url_path')
  GetStatistics(@Param('url_path') urlPath: string) {
    return this.urlService.getStatistics(urlPath);
  }
}
