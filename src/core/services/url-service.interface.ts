export const IUrlService = Symbol("IUrlService");
export interface IUrlService {
    getCategoryById(id: number): Promise<number>;
}