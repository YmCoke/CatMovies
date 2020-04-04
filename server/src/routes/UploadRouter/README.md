# 文件上传

1. 通常来说, 文件上传只会定义一个接口, 所有的文件都通过服务器端指定的一个接口进行上传.

2. 如何获取上传文件的信息以及将文件存储到服务器上

使用中间件: multer

## multer

- 使用multer中间件时, multer会自动将文件以一个随机字符串代替文件的名称, 存储到对应的文件夹中. 那么如何自定义文件名?

1. 如何获取文件后缀名

2. 如何获取文件存储到服务器上的文件名

解决上述问题后, 通过multer中的```storage```(用于options配置对象中), 控制文件的存储.

- 对文件进行限制, 例如内存大小的限制, 都是很有必要的. 防止某些用户直接上传一个很大的文件导致服务器内存崩溃.

使用multer中提供的```limits```(用于options配置对象中), 进行限制.

- 引出问题: 若文件过大导致失败, 如何将报错信息返回到客户端上. 若成功, 如何将成功信息返回到客户端.

我们可以对upload函数的第三个函数进行重写, 这样当报错时, 我们可以自行处理错误. 而不是交给multer官方自定义的函数进行处理.

**这里用的很巧妙, 但要注意区分各变量是什么意思**. multer(options).single() 返回的结果是一个函数, 即`RequestHandler`中间件. 我们将upload这个函数自行调用. 在处理请求的函数中.

```ts
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 100 // 1024 = 1kb , 1024 * 1024 = 1mb
    }
}).single("imgfile")

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // 发生错误
            ResponseHelper.sendError(err.message, res);
        }
        else if (err) {
            // 其他错误
            ResponseHelper.sendError(err, res);
        }
        else {
            // 没有错误
            ResponseHelper.sendData("文件上传成功", res);
        }
    })
})
```

- 对文件的类型进行限制

这一点很有必要, 如果不加以限制, 完全不知道会从客户端传过来什么文件. 若是有人故意破坏服务器传入.exe后缀格式. 而服务器端不小心运行了, 那么后果不堪设想. 使用multer官方提供的`fileFilter`函数(用于options配置对象中)