import { ResponseHelper } from './../ResponseHelper/index';
import { Router } from 'express';
import multer from 'multer';
import path from 'path';

// 允许上传的文件类型
const allowedExtensions = ['.jpg', '.png', '.gif', '.bmp', '.jfif'];
const router = Router();
// 控制文件存储流程
const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '../../public/upload'),
    filename(req, file, cb) {
        // 获取文件后缀名
        const extname = path.extname(file.originalname);
        // 根据时间戳生成文件名称: 防止重复文件名的出现
        const time = new Date().getTime();
        const filename = `${time}${extname}`;
        cb(null, filename);
    }
})
// 用于处理文件上传响应的中间件函数
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 100 // 1024 = 1kb , 1024 * 1024 = 1mb
    },
    fileFilter(req, file, cb) {
        // 获取文件后缀名
        const extname = path.extname(file.originalname);
        if (allowedExtensions.includes(extname)) {
            cb(null, true);
        }
        else {
            cb(new Error("文件类型不符合要求")); // 如果使用cb(null, false)的话虽然会阻止上传. 但不会有响应结果
        }
    }
}).single("imgfile")

router.post('/', (req, res) => {
    upload(req, res, err => {
        if (err) {
            // 发生错误
            ResponseHelper.sendError(err.message, res);
        }
        else { // 没有错误
            const url = `/upload/${req.file.filename}`;
            ResponseHelper.sendData(url, res);
        }
    })
})

export default router;