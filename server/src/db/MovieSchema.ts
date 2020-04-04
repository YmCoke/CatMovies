import { Movie } from './../entities/Movie';
import Mongoose from 'mongoose';

export interface IMovie extends Movie, Mongoose.Document { }

/**
 * 电影
 */
const movieSchema = new Mongoose.Schema<IMovie>({
    name: String,
    types: [String],
    area: [String],
    timeLong: Number,
    isHot: Boolean,
    isClassic: Boolean,
    isComming: Boolean,
    description: String,
    poster: String,
}, {
    versionKey: false
})

export default Mongoose.model<IMovie>("Movie", movieSchema);