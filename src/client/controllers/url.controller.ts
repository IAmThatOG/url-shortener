import { BadRequestException, Controller, Get, Inject, Post } from '@nestjs/common';
import { IUrlService } from 'src/core/services/url-service.interface';
import { UrlService } from 'src/core/services/implementation/url.service';
import { ResponseCode } from 'src/core/utilities/response-code.util';
import { Body } from '@nestjs/common';
import { EncodeUrlRequestDto } from 'src/core/dto/request/encode-url-request.dto';
import { BaseResponseDto } from 'src/core/dto/response/base-response.dto';

@Controller('url')
export class UrlController {
  constructor(@Inject(IUrlService) private readonly urlService: IUrlService) {
  }

  @Get()
  getAll(): any {
    // throw new BadRequestException({ code: ResponseCode.ServerError, reasons: ["black sheep"] }, "blah");
    // return { name: "gabriel okolie" };
  }

  @Post('/encode')
  shortenUrl(@Body() requestDto: EncodeUrlRequestDto): BaseResponseDto {
    return this.urlService.encodeUrl(requestDto);
  }
}
