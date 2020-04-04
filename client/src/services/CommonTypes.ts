// 导出公共的类型

/**
 * 通过ajax, 返回的是一个正常的数据
 */
export interface ISearchData<T> {
    data: T,
    err: null
}

/**
 * 通过ajax, 返回的是一个异常的数据
 */
export interface ISearchError {
    err: string,
    data: null
}

/**
 * 通过ajax, 返回的是一个分页的数据
 */
export interface ISearchPageData<T> {
    err: string | null,
    data: T[],
    total: number
}

/**
 * 通过条件查询多条数据
 */
export interface ISearchCondition {
    page?: number,
    limit?: number,
    key?: string
}