import { Test, TestingModule } from '@nestjs/testing';
import { IUrlService } from '../../core/services/url-service.interface';
import { UrlService } from '../../core/services/implementation/url.service';
import { UrlController } from './url.controller';
import { CoreModule } from '../../core/core.module';
import { EncodeUrlRequestDto } from '../../core/dto/request/encode-url-request.dto';
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { URL_DOMAIN } from '../../core/utilities/app-constants.util';
import { ServiceResponseDto } from 'src/core/dto/response/service-response.dto';
import { EncodeUrlResponseDto } from 'src/core/dto/response/encode-url-response.dto';
import { ErrorResponseDto } from 'src/core/dto/response/error-response.dto';
import {
  ResponseCode,
  responseCodeMap,
} from '../../core/utilities/response-code.util';
import { BaseResponseDto } from '../../core/dto/response/base-response.dto';

describe('UrlController', () => {
  let urlController: UrlController;
  let urlService: IUrlService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlController],
      imports: [CoreModule],
    }).compile();

    urlController = module.get<UrlController>(UrlController);
    urlService = module.get<IUrlService>(IUrlService);
  });

  test('should be defined', () => {
    expect(urlController).toBeDefined();
  });

  describe('shorten url', () => {
    test('existing url should throw conflict error', () => {
      const result: BaseResponseDto = {
        status: false,
        statusCode: HttpStatus.CONFLICT,
        message: '',
        error: <ErrorResponseDto>{
          errorCode: responseCodeMap[ResponseCode.InvalidShortUrl].code,
          description:
            responseCodeMap[ResponseCode.InvalidShortUrl].description,
          reasons: [],
          httpMethod: 'POST',
          requestPath: '/url/encode',
        },
      };
      const mock = jest
        .spyOn(urlService, 'encodeUrl')
        .mockImplementationOnce(() => result);

      expect(urlController.shortenUrl({ longUrl: 'httpsL//google.com' })).toBe(
        result,
      );
      mock.mockClear();
    });

    test('should return encoded url', () => {
      const requestDto: EncodeUrlRequestDto = {
        longUrl: 'https://twitter.com',
      };
      const result = urlController.shortenUrl(requestDto);
      console.log('result', result);
      expect(result).toBeDefined();
      expect(result).toEqual({
        status: true,
        statusCode: HttpStatus.CREATED,
        payload: {
          shortUrl: expect.stringContaining(`${URL_DOMAIN}/`),
        },
      });
    });
  });
});
