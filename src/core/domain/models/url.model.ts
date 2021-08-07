import { nanoid } from "nanoid";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { URL } from "url";
import { BaseModel } from "./base.model";

@Entity("url")
export class Url extends BaseModel {
    // @PrimaryGeneratedColumn({ name: 'id' })
    // private _id: number;
    // public get id(): number {
    //     return this._id;
    // }
    // public set id(v: number) {
    //     if (!this._id || this._id <= 0) {
    //         this._id = v;
    //     }
    // }

    @Column({ name: "host" })
    private _host: string;
    public get host(): string {
        return this._host;
    }

    @Column({ name: "long_url" })
    private _longUrl: string;
    public get longUrl(): string {
        return this._longUrl;
    }

    @Column({ name: "short_code" })
    private _shortCode: string;
    public get shortCode(): string {
        return this._shortCode;
    }

    @Column({ name: "number_of_visit" })
    private _numberOfVisit: number;
    public get numberOfVisit(): number {
        return this._numberOfVisit;
    }

    @Column({ name: "date_added" })
    private _dateAdded: string;
    public get dateAdded(): string {
        return this._dateAdded;
    }

    @Column({ name: "last_visit" })
    private _lastVisit: string;
    public get lastVisit(): string {
        return this._lastVisit;
    }

    /**
     *
     */

    static GetInstance(longUrl: string): Url {
        let instance = new this();
        instance._host = new URL(longUrl).hostname;
        instance._longUrl = longUrl;
        instance._shortCode = nanoid(10);
        instance._dateAdded = new Date().toISOString();
        instance._numberOfVisit = 0;
        return instance;
    }

    GenerateUrl(longUrl: string) {
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