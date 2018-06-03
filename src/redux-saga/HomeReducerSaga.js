import * as Actions from './../actions/homeActionType';
import { connect } from 'react-redux';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import movie from '../config/movie';


function* fetchMovieList(action) {
    try {
        const data = yield movie.getMovieList(action.title);
            yield put({ type: Actions.API_MOVIELIST_SUCCESS, data})
    }
    catch (e) {
        console.log(e);
    }
}
function* fetchMovieListByID(action) {
    try {
        const data = yield movie.getMovieListById(action.id);
            yield put({ type: Actions.API_MOVIELISTBYID_SUCCESS, data})
    }
    catch (e) {
        console.log(e);
    }
}

export const HomeReducerSaga = [
    takeEvery(Actions.API_MOVIELIST_FETCH, fetchMovieList),
    takeEvery(Actions.API_MOVIELISTBYID_FETCH, fetchMovieListByID)
]
