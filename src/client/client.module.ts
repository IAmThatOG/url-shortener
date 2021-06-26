import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { UrlController } from './controllers/url.controller';

@Module({
    controllers: [UrlController],
    imports: [CoreModule]
})
export class ClientModule { }
