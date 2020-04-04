import { ISearchData, ISearchError, ISearchCondition, ISearchPageData } from './CommonTypes';
import axios from 'axios'
/**
 * 向服务器端发送请求: 对电影数据进行增删改查
 */

export interface IMovie {
    _id?: string
    name: string
    types: string[]
    area: string[]
    timeLong: number
    isHot: boolean
    isClassic: boolean
    isComming: boolean
    description?: string
    poster?: string
}

export class MovieService {

    public static async add(movie: IMovie): Promise<ISearchData<IMovie> | ISearchError> {
        const result = await axios.post('/api/movie', movie)
        return result.data;
    }   

    public static async delete(movieid: string): Promise<ISearchData<true> | ISearchError> {
        const result = await axios.delete('/api/movie/' + movieid);
        return result.data;
    }

    public static async findById(movieid: string): Promise<ISearchData<IMovie> | ISearchError> {
        const result = await axios.get('/api/movie/' + movieid);
        return result.data;
    }

    public static async find(condition?: ISearchCondition): Promise<ISearchPageData<IMovie>> {
        const result = await axios.get('/api/movie', {
            params: condition
        });
        return result.data;
    }

    public static async modify(movieid: string, movie: Partial<IMovie>): Promise<ISearchData<IMovie> | ISearchError> {
        const result = await axios.put(`/api/movie/${movieid}`, movie);
        return result.data;
    }
}