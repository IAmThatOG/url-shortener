import { Test, TestingModule } from '@nestjs/testing';
import { IUrlService } from '../url-service.interface';
import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: IUrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlService],
    }).compile();

    service = module.get<IUrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
