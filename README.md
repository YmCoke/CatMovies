# CatMovies

学习重心: 各方面如何与TS进行结合

## 介绍: 

- 服务器端: TS + node

- 客户端: TS + React + Antd

## 代码检测工具: tslint

用于检验代码风格的工具. 类似于eslint

1. 安装

```yarn add -D tslint typescript```

2. 初始化

```npx tslint --init```

3. vs-code插件

tslint, 在配置tslint配置文件时有代码提示

4. Rules规则

详情见官方文档. 常见的见本项目中tslint.json文件的配置

- no-empty: 不能有空的块
- no-console: 不能有打印语句. 通常在开发时关闭, 打包时开启
- interface-name: 接口名称必须以大写字母I开头

# 服务器端

1. 数据库交互(mongoose)

mongoose目前并没有很好的支持TS

2. express

使用postman配合调试

3. 验证信息

- class-validator

对数据信息进行验证

- class-transformer

将非该类实例的对象转换为某个类的实例对象, 因为数据通常用于将一个ajax请求得到的

注意: 该库会中会使用到reflect-metadata库. 记得导入(导入位置哪里都行, 只要导入一次. 因为reflect-metadata引入的是一个全局变量)

### @Type

@Type. 该装饰器由class-transformer提供, 用于在转换时对数据进行类型的转换. 

1. 案例说明
```ts
    const m: any = {};
    m.name = 12345;  // 这里name应该为string类型
    m.types = [1,2,3,4]; // 这里types应该为string[]类型

    const movie = plainToClass(Movie, m);
    // 因为类型约束发生在编译前, 执行过程中并没有对类型进行约束, 故这就出现了问题. name和types即使类型错了也不会有报错信息. 
```

2. 解决方案: 在书写Movie类的装饰器时, 加上@type装饰器, 约束类型, 在进行plainToClass转换时, 会将类型进行归正.

3. @Type语法

@Type(函数): 函数返回一个JS类型(String, Number, Array...), 进行plainToClass时就会根据这个类型进行转换. 

4. 偏优实践

- 问题描述:
使用@Type有的时候还是会出现一些情况, 比如数组. 对于某某类型的数组这一点JS的类型并无法描述

假设某个成员定义是一个数组, 那么可以通过直接书写类型. ```@Type(() => String)```. 这样plainToClass会将数组中的每个元素都转换为字符串.

但同时会带来另一个问题, 那就是直接赋值string类型不会报错. 这个时候就应该在书写类装饰器时加上```@IsArray()```进行约束.

5. 总结

- 成员不是数组类型的

通过```@Type(() => 类型)```直接约束成员的类型

- 成员是数组类型的

通过```@Type(() => 类型)```直接约束该成员数组中每一个元素的类型(这一点class-transformer库会实现), 然后使用```@IsArray()```约束成员必须是一个数组类型.

# 客户端

技术栈: TS + React全家桶 + antd

开发顺序:

1. api接口, 使用的是axios

2. 开发redux, 对数据进行管理

3. 路由

4. 页面组件