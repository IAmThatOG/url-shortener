import { BadRequestException, ConflictException, HttpStatus, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { URL_DOMAIN } from '../../utilities/app-constants.util';
import { Url } from '../../domain/models/Url';
import { EncodeUrlRequestDto } from '../../dto/request/encode-url-request.dto';
import { BaseResponseDto } from '../../dto/response/base-response.dto';
import { DecodeUrlResponseDto } from '../../dto/response/decode-url-response.dto';
import { EncodeUrlResponseDto } from '../../dto/response/encode-url-response.dto';
import { ServiceResponseDto } from '../../dto/response/service-response.dto';
import { UrlStatisticsResponse } from '../../dto/response/url-statistics-response.dto';
import { IUrlRepository } from '../../repositories/url-repository.interface';
import { ResponseCode } from '../../utilities/response-code.util';
import { IUrlService } from '../url-service.interface';

@Injectable()
export class UrlService implements IUrlService {
    constructor(@Inject(IUrlRepository) private readonly urlRepo: IUrlRepository) {
    }

    encodeUrl(requestDTO: EncodeUrlRequestDto): BaseResponseDto {
        let url = this.urlRepo.FetchSingle(x => x.longUrl == requestDTO.longUrl);
        if (url) {
            throw new ConflictException({ code: ResponseCode.UrlExists });
        }
        url = new Url(requestDTO.longUrl);
        this.urlRepo.Add(url);
        return <ServiceResponseDto<EncodeUrlResponseDto>>{ status: true, statusCode: HttpStatus.CREATED, payload: { shortUrl: `${URL_DOMAIN}/${url.shortCode}` } }
    }

    decodeUrl(shortUrl: string): BaseResponseDto {
        let validUrl: URL;
        try {
            validUrl = new URL(shortUrl);//validate if shortUrl is url
        } catch (error) {
            throw new BadRequestException({ code: ResponseCode.InvalidShortUrl });
        }
        if (validUrl.hostname != "short.est") {
            throw new BadRequestException({ code: ResponseCode.InvalidShortUrl });
        }
        const shortCode = validUrl.pathname.replace("/", "");
        var url = this.urlRepo.FetchSingle(x => x.shortCode == shortCode);
        if (!url) {
            throw new NotFoundException({ code: ResponseCode.UrlNotFound });
        }
        url.visitLongUrl();
        this.urlRepo.Update(url);
        return <ServiceResponseDto<DecodeUrlResponseDto>>{ status: true, statusCode: HttpStatus.TEMPORARY_REDIRECT, payload: { longUrl: url.longUrl } };
    }

    getStatistics(urlPath: string): BaseResponseDto {
        if (!urlPath) {
            throw new BadRequestException({ code: ResponseCode.InvalidUrlPath });
        }
        var url = this.urlRepo.FetchSingle(x => x.shortCode == urlPath);
        if (!url) {
            throw new NotFoundException({ code: ResponseCode.UrlNotFound });
        }
        return <ServiceResponseDto<UrlStatisticsResponse>>{ status: true, statusCode: HttpStatus.OK, payload: { lastVisited: url.lastVisit, numberOfVisits: url.numberOfVisit } };
    }
}
