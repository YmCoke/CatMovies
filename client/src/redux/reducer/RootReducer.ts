import { combineReducers } from 'redux';
import movie, { IMovieState } from './MovieReducer';
import { connectRouter } from 'connected-react-router'
import history from '../history'

export interface IRootState {
    movie: IMovieState
    router: History
}

export default combineReducers({
    movie,
    router: connectRouter(history)
})