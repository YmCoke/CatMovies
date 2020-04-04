import { ISearchResult } from './../../entities/CommonType';
import { Response } from "express";

export class ResponseHelper {

    public static sendData (data: any, res: Response) {
        res.send({
            err: null,
            data,
        })
    }

    public static sendError (error: string | string[], res: Response) {
        let err: string;
        if (Array.isArray(error)) {
            err = error.join(";");
        }
        else {
            err = error;
        }
        res.send({
            err,
            data: null,
        })
    }

    public static sendPageData<T> (searchResult: ISearchResult<T>, res: Response) {
        if (searchResult.errors.length > 0) {
            this.sendError(searchResult.errors, res);
        }
        else {
            res.send({
                err: null,
                data: searchResult.data,
                total: searchResult.total
            })
        }
    }

}