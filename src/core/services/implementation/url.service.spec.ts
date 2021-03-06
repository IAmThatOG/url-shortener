import { Test, TestingModule } from "@nestjs/testing";
import { IUrlRepository } from "../../repositories/url-repository.interface";
import { UrlRepository } from "../../../infrastructure/repositories/url.repository";
import { IUrlService } from "../url-service.interface";
import { UrlService } from "./url.service";
import { Url } from "../../domain/models/Url";
import { EncodeUrlRequestDto } from "../../dto/request/encode-url-request.dto";
import { BadRequestException, ConflictException, HttpStatus, NotFoundException } from "@nestjs/common";
import { URL_DOMAIN } from "../../utilities/app-constants.util";

describe('UrlService', () => {
  let urlService: IUrlService;
  let urlRepo: IUrlRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        //services
        { provide: IUrlService, useClass: UrlService },

        //repositories
        { provide: IUrlRepository, useClass: UrlRepository }
      ]
    }).compile();
    urlService = module.get<IUrlService>(IUrlService);
    urlRepo = module.get<IUrlRepository>(IUrlRepository);
  });

  test('should be defined', () => {
    expect(urlService).toBeDefined();
  });

  test('should be defined', () => {
    expect(urlRepo).toBeDefined();
  });

  const existingUrlString = "https://google.com";
  let existingUrl = new Url(existingUrlString);
  beforeEach(() => {
    urlRepo.Add(existingUrl);
  });

  afterEach(() => {
    urlRepo.DeleteAll();
  });

  describe('encode url', () => {
    test('existing url should throw conflict exception', () => {
      let requestDto: EncodeUrlRequestDto = { longUrl: existingUrlString };
      expect(() => urlService.encodeUrl(requestDto)).toThrow(ConflictException);
    });

    test('should return encoded url', () => {
      let requestDto: EncodeUrlRequestDto = { longUrl: "https://youtube.com" };
      let result = urlService.encodeUrl(requestDto);
      expect(result).toBeDefined();
      expect(result).toStrictEqual(
        {
          status: true,
          statusCode: HttpStatus.CREATED,
          payload: {
            shortUrl: expect.stringContaining(`${URL_DOMAIN}/`)
          }
        }
      );
    });
  });

  describe('decode url', () => {
    test('invalid url should throw bad request exception', () => {
      let invalidUrl = "invalid";
      expect(() => urlService.decodeUrl(invalidUrl)).toThrow(BadRequestException);
    });

    test('invalid host name should throw bad request exception', () => {
      let invalidUrlHost = "https://google.com";
      expect(() => urlService.decodeUrl(invalidUrlHost)).toThrow(BadRequestException);
    });

    test('invalid short url should throw not found exception', () => {
      let invalidShortUrl = `${URL_DOMAIN}/invalid-short-code`;
      expect(() => urlService.decodeUrl(invalidShortUrl)).toThrow(NotFoundException);
    });

    test('should return decoded url', () => {
      let shortUrl = `${URL_DOMAIN}/${existingUrl.shortCode}`;
      let result = urlService.decodeUrl(shortUrl);
      expect(result).toBeDefined();
      expect(result).toStrictEqual(
        {
          status: true,
          statusCode: HttpStatus.TEMPORARY_REDIRECT,
          payload: {
            longUrl: existingUrl.longUrl
          }
        }
      );
    });
  });

  describe('get statistics', () => {
    test('empty url path should throw bad request exception', () => {
      let urlPath = '';
      expect(() => urlService.getStatistics(urlPath)).toThrow(BadRequestException);
    });

    test('invalid url path should throw not found exception', () => {
      let urlPath = 'invalid-path';
      expect(() => urlService.getStatistics(urlPath)).toThrow(NotFoundException);
    });

    test('should return url statistics', () => {
      let urlPath = `${existingUrl.shortCode}`;
      let result = urlService.getStatistics(urlPath);
      expect(result).toBeDefined();
      expect(result).toStrictEqual(
        {
          status: true,
          statusCode: HttpStatus.OK,
          payload: {
            lastVisited: existingUrl.lastVisit,
            numberOfVisits: existingUrl.numberOfVisit
          }
        });
    });
  });
});
