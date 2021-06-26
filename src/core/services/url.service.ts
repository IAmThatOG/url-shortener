import { Injectable, Scope } from '@nestjs/common';
import { IUrlService } from './interfaces/IUrlService';

@Injectable({ scope: Scope.REQUEST })
export class UrlService implements IUrlService {
    getCategoryById(id: number): Promise<number> {
        throw new Error('Method not implemented.');
    }
}
