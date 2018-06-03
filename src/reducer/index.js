import { combineReducers, createStore, applyMiddleware } from 'redux';
import homeReducer from './HomeReducer';
import createSagaMiddleware from 'redux-saga'
import MainSaga from '../redux-saga/MainSaga';


const sagaMiddleware = createSagaMiddleware()

const appReducer = combineReducers({
    homeReducer
});

let store = createStore(appReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(MainSaga);

export default store;
