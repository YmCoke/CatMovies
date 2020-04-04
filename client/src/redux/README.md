# TS与redux的联用

- redux
- - action: 提供action创建函数
- - reducer: 提供reducer函数

## 开发顺序

1. 开发reducer, reducer需要俩个参数: state和action

2. 根据state, 开发对应的interface. 并使用接口定义defaultState

3. 根据开发需求, 定义action创建函数, 通常而言action的类型为```{type: , payload: {}}```. 定义一个通用的```IAction```接口, 然后进行扩展.

4. 使用action接口修饰action creator的返回值. 导出action creator.

5. 在reducer文件夹中, 导入对应的```action interface```, 修饰action.

## 可辨识的联合类型

在reducer函数的action参数而言, 使用的是多个action的联合类型.

配合```switch case```可以实现类型的辨识.

对应到不同的函数中时, 对应的action的payload可以得到对应的类型提示.

## TS与redux-thunk联用

前置知识: thunk是一个中间件, 它允许dispatch一个函数, 用于处理副作用函数.

1. 编写为副作用函数的action

thunk对于函数有限制, 限制条件为```ThunkAction```, 为一个泛型, 需要我们传入```<R: 返回值, S: state, E: extra(thunk中的额外参数, 基本没用到), A: action>.```

设置后返回的函数将可以取得类型检查. 比如说:
```dispatch```的参数类型是`A`或者`ThunkAction<Promise<void>, IRootState, undefined, MovieActions>`, 
```getState```返回值类型是`S`

```ts
function fetchMovies(condition: ISearchCondition): ThunkAction<Promise<void>, IRootState, undefined, MovieActions> {
    return async (dispatch, getState) => {...}
}
```

2. 配置MiddleWare

dispatch一个副作用函数会报错, 这是因为redux与redux-thunk是由不同团队书写的, dispatch的参数类型不同而导致的报错.

解决方案如下: 

- 将副作用函数类型断言为any

```ts
dispatch(MovieActions.fetchMovies({}) as any)
```

- 将中间件类型断言为ThunkMiddleware

底层原理不懂, 但大致结果是使dispatch的参数可以包含多一个ThunkAction类型

```ts
export default createStore(RootReducer, 
    applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger)
)
```