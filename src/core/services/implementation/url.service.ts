import { Injectable, Scope } from '@nestjs/common';
import { IUrlService } from '../url-service.interface';

@Injectable({ scope: Scope.REQUEST })
export class UrlService implements IUrlService {
    getCategoryById(id: number): Promise<number> {
        throw new Error('Method not implemented.');
    }
}
