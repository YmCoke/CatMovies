import { Type } from "class-transformer"
import { IsNotEmpty, MinLength, MaxLength, IsDate, IsInt, Min, Max, ValidatorOptions } from "class-validator"
import { BaseEntites } from "./BaseEntites"

/**
 * 电影票
 */
export class Order extends BaseEntites {
    /**
     * 电影名称
     */
    @IsNotEmpty({ message: "电影名称不能为空" })
    @MinLength(4, { message: "电影名称长度不能小于4" })
    @MaxLength(12, { message: "电影名称的长度不能超过12" })
    @Type(() => String)
    public movieName: string

    /**
     * 播放时间
     */
    @IsNotEmpty({ message: "播放开始的时间不能为空" })
    @IsDate({ message: "播放时间必须是Date类型" })
    @Type(() => Date)
    public date: Date

    /**
     * 座位号
     */
    @IsNotEmpty({ message: "座位号不能为空" })
    @IsInt({ message: "座位号必须是整数, 不能为小数" })
    @Min(1, { message: "座位号不能小于1, 请检查数据是否有异常" })
    @Max(99999, { message: "座位号大于99999, 请检查数据是否有异常" })
    @Type(() => Number)
    public seatName: number

    /**
     * 电影票单价
     */
    @IsNotEmpty({ message: "电影票的单价不能为空" })
    @Min(0, { message: "电影票的单价不能为负数" })
    @Type(() => Number)
    public money: number

    /**
     * 是否已经售出
     */
    @IsNotEmpty({ message: "该电影票是否已经售出的状态不能为空" })
    @Type(() => Boolean)
    public isSale: boolean

    public static transform(plainObject: object): Order {
        return super.baseTransform(this, plainObject);
    }

    public async validateThis(validatorOptions?: ValidatorOptions): Promise<string[]> {
        return await super.validateThis(validatorOptions);
    }
}