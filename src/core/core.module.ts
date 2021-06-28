import { Module } from '@nestjs/common';
import { IUrlService } from './services/url-service.interface';
import { UrlService } from './services/implementation/url.service';
import { IUrlRepository } from './repositories/url-repository.interface';
import { UrlRepository } from 'src/infrastructure/repositories/url.repository';

@Module({
    // imports: [CoreModule],
    providers: [
        //services
        { provide: IUrlService, useClass: UrlService },

        //repositories
        { provide: IUrlRepository, useClass: UrlRepository }
    ],
    exports: [IUrlService]
})
export class CoreModule { }
