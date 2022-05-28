import { Url } from '../domain/models/url.model';

export const IUrlRepository = Symbol('IUrlRepository');
export interface IUrlRepository {
  FetchWhere(predicate?: (value: Url) => unknown): Url[];
  FetchSingle(predicate: (value: Url) => unknown): Url;
  Add(url: Url): number;
  Update(urlToUpdate: Url): boolean;
  DeleteSingle(urlToDelete: Url): boolean;
  DeleteAll();
}
