import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_MENU_ITEMS } from './constants';
import { menuItemsLoaded, menuItemsLoadingError } from './actions';
import { grabFromDb } from '../utils/request';
import { makeSelectCurrentCategory } from '../CategoryTabs/selectors';

export function* getMenuItems() {
  try {
    const category = yield select(makeSelectCurrentCategory());
    const itemsToBeGrabbedFromDb = `PluginMenu%23${category}`;
    const { menuItems } = yield call(grabFromDb, itemsToBeGrabbedFromDb);
    yield put(menuItemsLoaded(menuItems));
  } catch (err) {
    yield put(menuItemsLoadingError(err));
  }
}

export default function* menuItemsData() {
  yield takeLatest(LOAD_MENU_ITEMS, getMenuItems);
}
