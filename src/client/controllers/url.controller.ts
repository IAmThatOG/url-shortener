import { BadRequestException, Controller, Get, Inject, Post } from '@nestjs/common';
import { IUrlService } from 'src/core/services/url-service.interface';
import { UrlService } from 'src/core/services/implementation/url.service';
import { ResponseCode } from 'src/core/utilities/response-code.util';

@Controller('url')
export class UrlController {
  constructor(@Inject(IUrlService) private readonly urlService: IUrlService) {
  }

  @Get()
  getAll(): any {
    // throw new BadRequestException({ code: ResponseCode.ServerError, reasons: ["black sheep"] }, "blah");
    // return { name: "gabriel okolie" };
  }

  // @Post('/encode')
  // shortenUrl()
}
