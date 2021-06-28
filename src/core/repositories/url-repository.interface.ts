import { Url } from "../domain/models/Url";

export const IUrlRepository = Symbol("IUrlRepository");
export interface IUrlRepository {
    FetchWhere(predicate?: (value: Url) => unknown): Url[];
    FetchSingle(predicate: (value: Url) => unknown): Url;
    Add(url: Url): number;
    Update(urlToUpdate: Url): boolean;
}