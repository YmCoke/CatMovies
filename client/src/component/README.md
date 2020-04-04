# antd-Table组件的使用

## Table组件的基本属性

- column: 列描述数据对象，是 columns 中的一项

常见属性:
1. title: 用于显示列名
2. dataindex: 列数据在数据项中对应的路径，支持通过数组查询嵌套路径. obj[dataindex]
3. render: 接收三个参数, text: 当前行的值, record: 当前行数据, index: 当前行索引. 返回的值会喧嚷到页面上
筛选功能:
4. filterDropdown: 返回一个组件, 用于实现筛选, 但是筛选的功能需要自行完成.
    - 实现筛选的方法: 将Input的value受控, 与关键字联系到一起. 当改变时触发事件, 让外界关键字也同时发生变化. 当点击确认或者按下回车键时根据最新的condition获取数据
5. filterIcon: 自定义 filter 图标. 

- pagination: 用于实现分页 false | undefined | TablePaginationConfig

TablePaginationConfig常见属性:
1. current: 当前页数
2. pageSize: 每页限制的条数
3. total: 总条数

- rowKey: 指定行数据中唯一的key值作为每一行数据的唯一标识

- onChange: 分页、排序、筛选变化时触发 --> Function(pagination, filters, sorter, extra: { currentDataSource: [] })

- loading: 数据是否正在加载中, 若为true会显示加载中的组件(Spin)

## Upload组件的基本使用

组件位置: imgUploader.tsx

基本属性介绍: 

- action: 图片上传的地址

- name: 上传的文件是以什么字段为key值的

- listType: 图片列表显示的样式

- fileList: 上传的图片列表, 是一个由UploadFile构成的数组
uploadFile: {
    uid: 唯一标识
    name: 图片名称
    url: 图片的路径
}
基本上每一个uploadFile只需要填这三个属性

- onPreview: 图片预览触发函数

官方有给的案例

- onRemove: 点击删除图片时触发的函数

- customRequest: 当设置该属性时会覆盖掉默认的图片上传函数

- onChange: 当点击了上传按钮进行新图片上传时触发的函数

该组件的坑: 若是将```listType```属性受控, 那么对应的onChange函数仅会触发一次

推荐做法是将```customRequest```函数重置. 

而将```customRequest```重置就意味着要将对应的图片数据通过ajax的方式发送对该组件对应的action路径上. 也就是要运用到html5中```FormData```的知识

### 如何发送文件数据

```ts
private handleRequest = async (options: RcCustomRequestOptions) => {
    // 1. 将数据放置到formData的消息体中
    const formData = new FormData();
    formData.append(options.filename, options.file); // append(文件名, 数据内容)
    // 2. 发送ajax 
    const request = new Request(options.action, { // Request(路径, {body: 放formData, method: 请求方式})
        body: formData,
        method: "post"
    })
    const resp = await fetch(request).then(resp => resp.json());
    this.props.onChange(resp.data);
}
```