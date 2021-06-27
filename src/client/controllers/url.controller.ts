import { Controller, Get, Inject, Post } from '@nestjs/common';
import { IUrlService } from 'src/core/services/url-service.interface';
import { UrlService } from 'src/core/services/implementation/url.service';

@Controller('url')
export class UrlController {
  constructor(@Inject(IUrlService) private readonly urlService: IUrlService) {
  }

  @Get()
  getAll(): any {
    return { name: "gabriel okolie" };
  }

  // @Post('/encode')
  // shortenUrl()
}
