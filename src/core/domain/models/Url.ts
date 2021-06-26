export class Url {
    readonly id: string;
    readonly longUrl: string;
    readonly shortUrl: String;
    readonly numberOfVisit: Number;

    /**
     *
     */
    constructor(longUrl: string, shortUrl: string, numberOfVisit: number) {
        this.longUrl = longUrl;
    }
}