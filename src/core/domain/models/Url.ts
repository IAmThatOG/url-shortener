export class Url {
    id: number;
    readonly longUrl: string;
    readonly shortUrl: String;
    readonly numberOfVisit: Number;
    readonly dateAdded: Date;

    /**
     *
     */
    constructor(longUrl: string, shortUrl: string) {
        this.longUrl = longUrl;
        this.shortUrl = shortUrl;
    }
}