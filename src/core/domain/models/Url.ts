import { nanoid } from "nanoid";
import { URL } from "url";

export class Url {
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        if (!this._id || this._id <= 0) {
            this._id = v;
        }
    }


    private _host: string;
    public get host(): string {
        return this._host;
    }

    private _longUrl: string;
    public get longUrl(): string {
        return this._longUrl;
    }

    private _shortCode: string;
    public get shortCode(): string {
        return this._shortCode;
    }

    private _numberOfVisit: number;
    public get numberOfVisit(): number {
        return this._numberOfVisit;
    }

    private _dateAdded: string;
    public get dateAdded(): string {
        return this._dateAdded;
    }

    private _lastVisit: string;
    public get lastVisit(): string {
        return this._lastVisit;
    }

    /**
     *
     */
    constructor(longUrl: string) {
        this._host = new URL(longUrl).hostname;
        this._longUrl = longUrl;
        this._shortCode = nanoid(10);
        this._dateAdded = new Date().toISOString();
        this._numberOfVisit = 0;
    }

    visitLongUrl() {
        this._numberOfVisit += 1;
        this._lastVisit = new Date().toISOString();
    }
}