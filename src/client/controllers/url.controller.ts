import { Controller, Get } from '@nestjs/common';
import { UrlService } from 'src/core/services/url.service';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {
  }

  @Get()
  getAll(): any {
    return { name: "gabriel okolie" };
  }
}
