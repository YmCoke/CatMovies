import { IsInt, Min, ValidatorOptions } from "class-validator"
import { BaseEntites } from "./BaseEntites";
import { Type } from "class-transformer";

export class SearchCondition extends BaseEntites{
    /**
     * 当前页码数
     */
    @IsInt({message: "当前页码必须是整数"})
    @Min(1, {message: "当前页码不能小于1"})
    @Type(() => Number)
    public page: number = 1

    /**
     * 查询的条数
     */
    @IsInt({message: "查询条数必须是整数"})
    @Min(1, {message: "查询条数不能小于1"})
    @Type(() => Number)
    public limit: number = 10

    /**
     * 关键字
     */
    @Type(() => String)
    public key: string = ""

    /**
     * 将piainObject转换为Movie类的实例
     * @param plainObject 平面对象
     */
    public static transform(plainObject: object): SearchCondition {
        return super.baseTransform(SearchCondition, plainObject);
    }

    public async validateThis(validatorOptions?: ValidatorOptions): Promise<string[]> {
        return super.validateThis(validatorOptions);
    }
}