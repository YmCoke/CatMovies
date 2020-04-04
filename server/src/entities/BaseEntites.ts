import { Movie } from "./Movie";
import { plainToClass } from "class-transformer";
import { ValidatorOptions, validate } from "class-validator";
import { ClassType } from "class-transformer/ClassTransformer";

export abstract class BaseEntites {
    /**
     * 将piainObject转换为Movie类的实例
     * @param plainObject 平面对象
     */
    protected static baseTransform<T>(cls: ClassType<T>, plainObject: object): T {
        if (plainObject instanceof cls) {
            return plainObject;
        }
        return plainToClass(cls, plainObject);
    }

    public async validateThis(validatorOptions?: ValidatorOptions): Promise<string[]> {
        const validationError = await validate(this, validatorOptions);
        let errors: string[] = [];
        validationError.forEach(e => {
            const error = Object.values(e.constraints);
            if (error.length > 0) {
                errors = errors.concat(error);
            }
        })
        return errors;
    }
}