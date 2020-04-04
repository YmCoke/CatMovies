import { IOrder } from './../db/OrderSchema';
import { Order } from './../entities/Order';
import { OrderModel } from '../db';
import { addDealData } from '../util/decorators';

// 装饰器写法...
@addDealData
export class OrderService {

    public static async add(order: Order): Promise<IOrder | string[]> {
        // 1. 处理数据
        const orderObj = await (this as any).dealData(Order, order);
        if (Array.isArray(orderObj)) {
            return orderObj;
        }
        // 进行相关逻辑操作
        return OrderModel.create(orderObj)
    }
}