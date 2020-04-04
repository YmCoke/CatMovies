import { MinLength, MaxLength, IsNotEmpty, ArrayMinSize, Min, Max, IsArray, validate, ValidationOptions, ValidatorOptions } from "class-validator"
import { Type, plainToClass } from "class-transformer"
import { BaseEntites } from "./BaseEntites"

/**
 * 电影类, 记录一个电影实例的成员
 */
export class Movie extends BaseEntites{
    /**
     * 电影名称
     */
    @IsNotEmpty({ message: "电影名称不能为空" })
    @MinLength(4, { message: "电影名称长度不能小于4" })
    @MaxLength(12, { message: "电影名称的长度不能超过12" })
    @Type(() => String)
    public name: string

    /**
     * 电影类型
     */
    @IsNotEmpty({ message: "电影的类型不能为空" })
    @IsArray({ message: "电影的类型必须是数组" })
    @ArrayMinSize(1, { message: "电影的类型不能小于1" })
    @Type(() => String)
    public types: string[]

    /**
     * 电影上映地区
     */
    @IsNotEmpty({ message: "电影的上映地区不能为空" })
    @IsArray({ message: "电影的上映地区必须是数组" })
    @ArrayMinSize(1, { message: "电影的上映地区不能小于1" })
    @Type(() => String)
    public area: string[]

    /**
     * 电影播放时长(分钟为单位)
     */
    @IsNotEmpty({ message: "电影时长不能为空" })
    @Min(1, { message: "电影时长不足一分钟, 请检查时长是否有误" })
    @Max(99999, { message: "电影时长超过99999分钟, 请检查时长是否有误" })
    @Type(() => Number)
    public timeLong: number

    /**
     * 电影是否热映
     */
    @IsNotEmpty({ message: "是否热映不能为空" })
    @Type(() => Boolean)
    public isHot: boolean

    /**
     * 电影是否为经典电影
     */
    @IsNotEmpty({ message: "是否是经典电影不能为空" })
    @Type(() => Boolean)
    public isClassic: boolean

    /**
     * 电影是否即将上映
     */
    @IsNotEmpty({ message: "是否即将上映不能为空" })
    @Type(() => Boolean)
    public isComming: boolean

    /**
     * 电影的描述
     */
    @Type(() => String)
    public description?: string

    /**
     * 电影的海报: 图片
     */
    @Type(() => String)
    public poster?: string

    /**
     * 将piainObject转换为Movie类的实例
     * @param plainObject 平面对象
     */
    public static transform(plainObject: object): Movie {
        return super.baseTransform(this, plainObject);
    }

    public async validateThis(validatorOptions?: ValidatorOptions): Promise<string[]> {
        return super.validateThis(validatorOptions);
    }
}
