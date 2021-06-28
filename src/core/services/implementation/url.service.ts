import { ConflictException, HttpStatus, Inject, Injectable, Scope } from '@nestjs/common';
import { Url } from 'src/core/domain/models/Url';
import { EncodeUrlRequestDto } from 'src/core/dto/request/encode-url-request.dto';
import { BaseResponseDto } from 'src/core/dto/response/base-response.dto';
import { EncodeUrlResponseDto } from 'src/core/dto/response/encode-url-response.dto';
import { ServiceResponseDto } from 'src/core/dto/response/service-response.dto';
import { IUrlRepository } from 'src/core/repositories/url-repository.interface';
import { ResponseCode } from 'src/core/utilities/response-code.util';
import { IUrlService } from '../url-service.interface';

@Injectable({ scope: Scope.REQUEST })
export class UrlService implements IUrlService {
    constructor(@Inject(IUrlRepository) private readonly urlRepo: IUrlRepository) {
    }

    encodeUrl(requestDTO: EncodeUrlRequestDto): BaseResponseDto {
        var host = new URL(requestDTO.longUrl).hostname;
        var url = this.urlRepo.FetchSingle(x => x.host == host);
        if (url) {
            throw new ConflictException({ code: ResponseCode.UrlExists });
        }
        url = new Url(requestDTO.longUrl);
        this.urlRepo.Add(url);
        return <ServiceResponseDto<EncodeUrlResponseDto>>{ status: true, statusCode: HttpStatus.CREATED, payload: { shortUrl: url.shortUrl } }
    }
}
