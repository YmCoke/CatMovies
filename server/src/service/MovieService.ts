import { IMovie } from './../db/MovieSchema';
import { Movie } from './../entities/Movie';
import { MovieModel } from '../db';
import { SearchCondition } from '../entities/SearchCondition';
import { ISearchResult } from '../entities/CommonType';
/**
 * 电影模型功能类, 实现数据库的增删改查
 */
export class MovieService {
    /**
     * 向数据库中加入movie, 若成功, 返回movie实体, 若失败, 返回errors字符串数组
     * @param movie 电影实例
     */
    public static async add(movie: Movie): Promise<IMovie | string[]> {
        // 1. 使用transformer进行转换
        const movieObject = Movie.transform(movie);
        // 2. 数据验证
        const errors = await movieObject.validateThis();
        if (errors.length > 0) {
            return errors;
        }
        // 3. 加入数据库
        return MovieModel.create(movie);
    }

    /**
     * 修改对应id的movie对象, 若成功返回空字符串数组, 若失败, 将失败信息放在字符串数组中, 返回.
     */
    public static async modify(id: string, movie: Movie): Promise<string[]> {
        // 1. 使用transformer进行转换
        movie = Movie.transform(movie);
        // 2. 数据验证
        const errors = await movie.validateThis({ skipUndefinedProperties: true });
        if (errors.length > 0) {
            return errors;
        }
        // 3. 修改
        await MovieModel.updateOne({ _id: id }, movie);
        return [];
    }

    public static async delete(id: string) {
        return await MovieModel.deleteOne({ _id: id });
    }

    public static async findById(id: string): Promise<IMovie | null> {
        return await MovieModel.findById(id);
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
        // 1. 使用transformer进行转换
        const conObj = SearchCondition.transform(condition);
        // 2. 数据验证
        const errors = await conObj.validateThis({ skipUndefinedProperties: true });
        if (errors.length > 0) {
            return {
                data: [],
                total: 0,
                errors
            }
        }
        // 3. 进行查询
        const movies = await MovieModel.find({
            name: { $regex: new RegExp(conObj.key) }
        }).skip((conObj.page - 1) * conObj.limit).limit(conObj.limit);
        const total = await MovieModel.find({
            name: { $regex: new RegExp(conObj.key) }
        }).countDocuments();
        return {
            data: movies,
            total,
            errors: []
        };
    }
}
