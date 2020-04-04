# 问题总结

在开发MovieRoute的过程中发现的问题:

### `用户界面传入的id可能并不符合数据库中id的格式`

```ts
router.get('/:id', async (req, res) => {
    const movieid = req.params.id;
    const movie = await MovieService.findById(movieid);
    res.send({
        err: null,
        data: movie,
    })
})
```

在这个过程中可能会报错: ```Cast to ObjectId failed for value "5e799d67669d683e244" at path "_id" for model "Movie"```

- 解决方案:

1. 这个错误是允许发生的, 是预期之内的. 用户的误操作确实会导致这样的后果. 故可以套一层try catch. 当报错的时候直接返回数据null即可.

2. 这个错误不应该发生, 判定为是代码逻辑问题. 那么应该在处理服务端逻辑的代码中进行修改(MovieSerives类), 接收到id后进行检验是否是正确格式, 若不是则返回null.


### `代码冗余`

在进行开发过程中可以发现```response.send```是一个常用逻辑代码. 且返回的数据类型在不同的api route中可能是一致的. 故抽离成一个```ResponseHelper类```. 用于做响应内容.