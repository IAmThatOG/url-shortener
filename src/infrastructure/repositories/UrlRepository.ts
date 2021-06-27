import { Url } from "src/core/domain/models/Url";

class UrlRepository {
    static readonly urls: Url[];
    constructor() {

    }

    /**
     * GetUrls
     */
    public FetchWhere(predicate?: (value: Url) => unknown) {
        if (predicate) {
            return UrlRepository.urls.filter(predicate);
        }
        return UrlRepository.urls;
    }

    public FetchSingle(predicate: (value: Url) => unknown) {
        return UrlRepository.urls.find(predicate);
    }

    /**
     * AddUrl
     */
    public Add(url: Url) {
        const id = UrlRepository.urls.length + 1;
        url.id = id;
        UrlRepository.urls.push(url);
    }

    /**
     * UpdateUrl
     */
    public Update(urlToUpdate: Url) {
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