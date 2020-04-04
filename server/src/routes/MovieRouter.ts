import { ResponseHelper } from './ResponseHelper/index';
import { MovieService } from '../service/MovieService';
import { Router } from 'express';

const router = Router();

/**
 * 获取单部电影数据
 */
router.get('/:id', async (req, res) => {
    try {
        const movieid = req.params.id;
        const movie = await MovieService.findById(movieid);
        ResponseHelper.sendData(movie, res);
    } catch (error) {
        ResponseHelper.sendError("movie-id格式不正确", res);
    }
})

/**
 * 根据条件获取多部电影
 */
router.get('/', async (req, res) => {
    const searchResult = await MovieService.find(req.query);
    ResponseHelper.sendPageData(searchResult, res);
})

/**
 * 添加一部电影
 */
router.post('/', async (req, res) => {
    const resp = await MovieService.add(req.body);
    if (Array.isArray(resp)) {
        ResponseHelper.sendError(resp, res);
    }
    else {
        ResponseHelper.sendData(resp, res);
    }
})

/**
 * 修改一部电影的数据
 */
router.put('/:id', async (req, res) => {
    try {
        const movieid = req.params.id;
        const errors = await MovieService.modify(movieid, req.body);
        if (errors.length > 0) {
            ResponseHelper.sendError(errors, res);
        }
        else {
            ResponseHelper.sendData(true, res);
        }
    } catch (error) {
        ResponseHelper.sendError("movie-id不存在", res);
    }
})

/**
 * 删除某一部电影
 */
router.delete('/:id', async (req, res) => {
    try {
        await MovieService.delete(req.params.id);
        ResponseHelper.sendData(true, res);
    } catch {
        ResponseHelper.sendError("movie-id不存在", res);
    }
})

export default router;