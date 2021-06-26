import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from 'src/core/services/url.service';
import { UrlController } from './url.controller';

describe('UrlController', () => {
  let controller: UrlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      providers: [UrlService],
    }).compile();

    controller = module.get<UrlController>(UrlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
