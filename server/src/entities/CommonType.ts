import { Order } from './Order';
import { Movie } from './Movie';
export interface ISearchResult<T> {
    data: T[],
    total: number,
    errors: string[]
}

export type classTypes = typeof Order | typeof Movie;

export type EntitesTypes = Order | Movie;