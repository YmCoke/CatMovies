import { createStore, applyMiddleware } from 'redux';
import RootReducer, { IRootState } from './reducer/RootReducer';
import thunk, { ThunkMiddleware } from 'redux-thunk';

export default createStore(RootReducer, 
    applyMiddleware(thunk as ThunkMiddleware<IRootState>)
)