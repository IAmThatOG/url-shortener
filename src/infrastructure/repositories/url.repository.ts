import { Url } from "src/core/domain/models/Url";
import { IUrlRepository } from "src/core/repositories/url-repository.interface";

export class UrlRepository implements IUrlRepository {
    static readonly urls: Array<Url> = [];
    constructor() {

    }

    /**
     * GetUrls
     */
    FetchWhere(predicate?: (value: Url) => unknown): Url[] {
        if (predicate) {
            return UrlRepository.urls.filter(predicate);
        }
        return UrlRepository.urls;
    }

    FetchSingle(predicate: (value: Url) => unknown): Url {
        return UrlRepository.urls.find(predicate);
    }

    /**
     * AddUrl
     */
    Add(url: Url): number {
        const id = UrlRepository.urls.length + 1;
        url.id = id;
        UrlRepository.urls.push(url);
        return id;
    }

    /**
     * UpdateUrl
     */
    Update(urlToUpdate: Url): boolean {
        if (!urlToUpdate) {
            return false;
        }
        let foundIndex = UrlRepository.urls.findIndex((url) => url.id == urlToUpdate.id);
        if (foundIndex < 0) {
            return false;
        }
        UrlRepository.urls.splice(foundIndex, 1, urlToUpdate);
        return true;
    }
}