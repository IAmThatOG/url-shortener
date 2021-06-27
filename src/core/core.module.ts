import { Module } from '@nestjs/common';
import { IUrlService } from './services/url-service.interface';
import { UrlService } from './services/implementation/url.service';

@Module({
    providers: [
        { provide: IUrlService, useClass: UrlService }
    ],
    exports: [IUrlService]
})
export class CoreModule { }
