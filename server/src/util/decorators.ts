import { classTypes, EntitesTypes } from "../entities/CommonType";

export function addDealData(constructor: any) {
    constructor.dealData = async (cls: classTypes, data: object): Promise<string[] | EntitesTypes> => {
        console.log("1. 转换数据");
        const dataObj = cls.transform(data);
        console.log("2. 验证数据");
        const errors = await dataObj.validateThis();
        if (errors.length > 0) {
            return errors;
        }
        return dataObj;
    }
}