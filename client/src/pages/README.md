# TS与react-router联用

1. 使用Route匹配对应component时会给组件注入属性(`history, match, location`). 那么如何在组件中获得类型提示呢?

无论是函数组件还是类组件, 都可以通过泛型对`prop`进行类型约束.

```RouteComponentProps```是react-router对`history, match, location`三个属性的类型约束接口. 可以直接导入使用.

2. 在match.params中如果传入了参数, 如何获取参数呢?

```RouteComponentProps```同时也是一个泛型, 可以传递一个```IParams```接口对其进行约束

3. 如果除了Route给组件注入的属性外, 组件本身有其他外界需要传入的属性应该怎么办?
    1. 使用接口继承(如下代码)
    2. 使用交叉类型(如下代码)

```ts
// 定义params中的属性
interface IParams {
    id: string
}

interface IMovieModifyProps extends RouteComponentProps<IParams> {
    // 写该组件需要使用到的props
}

或者:
interface IMyProps {
    // 写该组件需要使用到的props
}

type IMovieModifyProps = RouteComponentProps<IParams> & IMyProps

export class MovieModify extends React.Component<IMovieModifyProps> {
    render() {
        return (
            <h1>电影修改页面{this.props.match.params.id}</h1>
        )
    }
}
```

# 使用antd

坑点: 使用antd一定要记得引入antd自带的css文件: ```antd/dist/antd.css```. 一般在index.tsx中引入

css3知识点: 如果一个元素为flex: auto, 那么如果其父元素为display: flex的话该元素的高度是可以自动增长的.