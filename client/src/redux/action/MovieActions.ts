import { SwitchType } from './../reducer/MovieReducer';
import { MovieService } from './../../services/MovieService';
import { IMovie } from '../../services/MovieService';
import { IAction } from './ActionType';
import { ISearchCondition } from '../../services/CommonTypes';
import { ThunkAction } from 'redux-thunk'
import { IRootState } from '../reducer/RootReducer';

/**
 * 规定更新movie数据action的格式
 */
export type IMovieSaveAction = IAction<'movie_save', {
    movies: IMovie[],
    total: number
}>

export function createSaveAction(movies: IMovie[], total: number): IMovieSaveAction {
    return {
        type: "movie_save",
        payload: {
            movies, total
        }
    }
}

/**
 * 规定删除某movie数据action的格式
 */
export type IMovieDeleteAction = IAction<'movie_delete', string>

export function createDeleteAction(movieid: string): IMovieDeleteAction {
    return {
        type: "movie_delete",
        payload: movieid
    }
}

/**
 * 规定更新loading数据action的格式
 */
export type IMovieLoadingAction = IAction<'movie_loading', boolean>

export function createLoadingAction(loadingState: boolean): IMovieLoadingAction {
    return {
        type: "movie_loading",
        payload: loadingState
    }
}

/**
 * 规定设置condition数据action的格式
 */
export type IMovieConditionAction = IAction<'movie_condition', ISearchCondition>

export function createConditionAction(condition: ISearchCondition): IMovieConditionAction {
    return {
        type: "movie_condition",
        payload: condition
    }
}

/**
 * 某个swtich发生变化
 */
export function createSwitchChangeAction(type: SwitchType, newVal: boolean, id: string): IMovieSwitchChangeAction {
    return {
        type: "movie_switch",
        payload: {
            newVal, id, type
        }
    }
}

/**
 * 异步获取movie数据
 */
export function fetchMovies(condition: ISearchCondition): ThunkAction<Promise<void>, IRootState, undefined, MovieActions> {
    return async function (dispatch, getState) {
        // 1. 将正在获取数据的状态设置为true
        dispatch(createLoadingAction(true));
        // 2. 设置condition
        dispatch(createConditionAction(condition));
        // 3. 根据新的condition进行查询
        const resp = await MovieService.find(getState().movie.condition);
        // 4. 根据返回值更新数据
        if (!resp.err) {
            dispatch(createSaveAction(resp.data, resp.total));
        }
        // 5. 将状态设置回来
        dispatch(createLoadingAction(false));
    }
}

/**
 * 删除一个电影
 */
export function deleteMovie(movieid: string): ThunkAction<Promise<void>, IRootState, undefined, MovieActions> {
    return async dispatch => {
        dispatch(createLoadingAction(true));
        await MovieService.delete(movieid);
        dispatch(createDeleteAction(movieid));
        dispatch(createLoadingAction(false));
    }
}

/**
 * 异步修改某个电影的switch状态
 */
export function switchChange(type: SwitchType, newVal: boolean, id: string): ThunkAction<Promise<void>, IRootState, undefined, MovieActions> {
    return async dispatch => {
        // 1. 将是否正在加载状态设置为true
        dispatch(createLoadingAction(true));
        // 2. 异步修改对应的值
        await MovieService.modify(id, {
            [type]: newVal
        })
        // 3. 修改store中的状态
        dispatch(createSwitchChangeAction(type, newVal, id));
        // 4. 将是否正在加载状态设置为false
        dispatch(createLoadingAction(false));
    }
}

export type IMovieSwitchChangeAction = IAction<'movie_switch', {
    newVal: boolean
    id: string,
    type: SwitchType
}>


export type MovieActions = IMovieSaveAction | IMovieDeleteAction | IMovieLoadingAction | IMovieConditionAction | IMovieSwitchChangeAction;