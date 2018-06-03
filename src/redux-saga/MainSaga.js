import { API_MOVIELIST_FETCH,API_MOVIELIST_SUCCESS } from './../actions/homeActionType';
import { connect } from 'react-redux';
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import {HomeReducerSaga} from './HomeReducerSaga'

export default function* MainSaga() {
    try {
        yield all([
            ...HomeReducerSaga])
    }
    catch (error) {
    }
}

