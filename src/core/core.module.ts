import { Module } from '@nestjs/common';
import { IUrlService } from './services/url-service.interface';
import { UrlService } from './services/implementation/url.service';
import { IUrlRepository } from './repositories/url-repository.interface';
import { UrlRepository } from '../infrastructure/data/repositories/url.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { getConnectionOptions } from 'typeorm';
import { Url } from './domain/models/url.model';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => Object.assign(await getConnectionOptions(), {})
        }),
        // TypeOrmModule.forFeature([])
    ],
    providers: [
        //services
        { provide: IUrlService, useClass: UrlService },

        //repositories
        { provide: IUrlRepository, useClass: UrlRepository }
    ],
    exports: [IUrlService]
})
export class CoreModule { }
