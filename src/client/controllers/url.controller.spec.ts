import { Test, TestingModule } from '@nestjs/testing';
import { IUrlService } from '../../core/services/url-service.interface';
import { UrlService } from '../../core/services/implementation/url.service';
import { UrlController } from './url.controller';
import { CoreModule } from '../../core/core.module';

describe('UrlController', () => {
  let controller: UrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      imports: [CoreModule]
    }).compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


});
