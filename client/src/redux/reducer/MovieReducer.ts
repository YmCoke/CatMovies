import { IMovieSwitchChangeAction } from './../action/MovieActions';
import { Reducer } from './ReducerType';
import { MovieActions, IMovieSaveAction, IMovieDeleteAction, IMovieConditionAction, IMovieLoadingAction } from '../action/MovieActions';
import { IMovie } from "../../services/MovieService"
import { ISearchCondition } from "../../services/CommonTypes"

/**
 * 存储在仓库中的数据是必填的, 否则会导致数据缺失
 */
type IMovieCondition = Required<ISearchCondition>

/**
 * 电影状态
 */
export interface IMovieState {
    /**
     * 电影数据
     */
    data: IMovie[],
    /**
     * 筛选条件
     */
    condition: IMovieCondition
    /**
     * 是否正在加载
     */
    isLoading: boolean
    /**
     * 电影数据的总数
     */
    total: number

    /**
     * 总页数
     */
    totalPage: number
}

// 规定movieReducer的格式: state必须是IMovieState, action类型由各自reducer接收action而定
type MovieReducer = Reducer<IMovieState, any>

const saveMovieReducer: MovieReducer = function (state, action: IMovieSaveAction) {
    return {
        ...state,
        data: action.payload.movies,
        total: action.payload.total,
        totalPage: getTotalPage(action.payload.total, state.condition.limit)
    }
}

const deleteMovieReducer: MovieReducer = function (state, action: IMovieDeleteAction) {
    return {
        ...state,
        data: state.data.filter(m => m._id !== action.payload),
        total: state.total - 1,
        totalPage: getTotalPage(state.total - 1, state.condition.limit)
    }
}

const setMovieConditionReducer: MovieReducer = function (state, action: IMovieConditionAction) {
    const newState = {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload
        }
    }
    newState.totalPage = getTotalPage(newState.total, newState.condition.limit);
    return newState;
}

const setMovieLoadingReducer: MovieReducer = function (state, action: IMovieLoadingAction) {
    return {
        ...state,
        isLoading: action.payload
    }
}

const updateMovieSwitch: MovieReducer = function (state, action: IMovieSwitchChangeAction) {
    // 1. 获取改变的movie对象
    const movie = state.data.find(d => d._id === action.payload.id);
    if (!movie) return state;
    // 2. 克隆原对象
    const newObj = {...movie};
    // 3. 找到对应的类型, 更改其值
    newObj[action.payload.type] = action.payload.newVal;
    // 4. 覆盖原数组, 并生成一个新的数组覆盖原数据
    const newData = state.data.map(d => {
        if (d._id !== action.payload.id) return d;
        return newObj;
    })
    return {
        ...state,
        data: newData
    }
}

/**
 * movie默认state
 */
const movieDefaultState: IMovieState = {
    data: [],
    condition: {
        page: 1,
        limit: 10,
        key: "",
    },
    total: 0,
    isLoading: false,
    totalPage: 0
}

export default (state: IMovieState = movieDefaultState, action: MovieActions): IMovieState => {
    switch (action.type) {
        case "movie_save":
            return saveMovieReducer(state, action);
        case "movie_delete":
            return deleteMovieReducer(state, action);
        case "movie_condition":
            return setMovieConditionReducer(state, action);
        case "movie_loading":
            return setMovieLoadingReducer(state, action);
        case "movie_switch": 
            return updateMovieSwitch(state, action);
        default:
            return state;
    }
}

export enum SwitchType {
    isHot = "isHot", isClassic = "isClassic", isComming = "isComming"
}

/**
 * 根据总条数和每页限制数计算总页码
 */
function getTotalPage (total: number, limit: number): number {
    return Math.floor((total + limit - 1) / limit);
}