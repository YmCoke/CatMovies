import { Order } from './../entities/Order';
import Mongoose from 'mongoose';

export interface IOrder extends Order, Mongoose.Document { }

/**
 * 电影票
 */
const OrderSchema = new Mongoose.Schema<IOrder>({
    movieName: String, // 电影的名称
    date: Date, // 放映时间
    seatName: String, // 座位号
    money: Number, // 单价
    isSale: Boolean, // 是否已经售出
}, {
    versionKey: false
})

export default Mongoose.model<IOrder>('order', OrderSchema);