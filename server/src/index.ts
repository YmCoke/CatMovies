import "reflect-metadata";
import Express from 'express';
import MovieRouter from './routes/MovieRouter';
import UploadRouter from './routes/UploadRouter';
import path from 'path';
import history from 'connect-history-api-fallback';

const app = Express();

// 转换路径
app.use(history());

app.use('/', Express.static(path.resolve(__dirname, 'public/build')));

// 请求静态资源. 注意: 如果这里相对路径不好使, 那么就是用绝对路径
app.use("/upload", Express.static(path.resolve(__dirname, 'public/upload')));

app.use(Express.json()); // 解析消息体中的数据信息

// 电影数据增删改查
app.use('/api/movie', MovieRouter);

// 文件上传
app.use('/api/upload', UploadRouter)

app.listen(4014);