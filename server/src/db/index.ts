import Mongoose from 'mongoose';
import MovieModel from './MovieSchema';
import OrderModel from './OrderSchema'

Mongoose.connect('mongodb://localhost:27017/movie', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    // console.log("数据库连接成功");
});

// Mongoose.connect('mongodb://localhost:27017/order', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log("数据库连接成功");
// })

export { MovieModel, OrderModel }