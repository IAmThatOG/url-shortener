import { nanoid } from "nanoid";
import { URL } from "url";

export class Url {
    id: number;
    readonly host: string;
    readonly longUrl: string;
    readonly shortUrl: string;
    readonly numberOfVisit: number;
    readonly dateAdded: string;
    readonly lastVisit?: string;

    /**
     *
     */
    constructor(longUrl: string) {
        this.host = new URL(longUrl).hostname;
        this.longUrl = longUrl;
        this.shortUrl = `http://short.est/${nanoid(10)}`;
        this.dateAdded = new Date().toISOString();
    }
}