import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_CATEGORIES } from './constants';
import { categoriesLoaded, categoriesLoadingError } from './actions';
import { grabFromDb } from '../utils/request';

export function* getCategories() {
  try {
    const itemsToBeGrabbedFromDb = `PluginMenuPages`;
    const {pageNames: categories} = yield call(grabFromDb, itemsToBeGrabbedFromDb);
    console.log('noted', categories);
    yield put(categoriesLoaded(categories));
  } catch (err) {
    yield put(categoriesLoadingError(err));
  }
}

export default function* categoriesData() {
  yield takeLatest(LOAD_CATEGORIES, getCategories);
}
