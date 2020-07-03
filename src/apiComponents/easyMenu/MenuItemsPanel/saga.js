import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_MENU_ITEMS, DELETE_MENU_ITEMS } from './constants';
import { menuItemsLoaded, menuItemsLoadingError } from './actions';
import { grabFromDb, deleteFromDb } from '../utils/request';
import { makeSelectCurrentCategoryId, makeSelectCurrentCategoryFromId } from '../CategoryTabs/selectors';

export function* getMenuItems() {
  try {
    const categoryId = yield select(makeSelectCurrentCategoryId());
    const category = yield select(makeSelectCurrentCategoryFromId(categoryId));
    console.log('categoryId', categoryId);
    console.log('category', category);
    const itemsToBeGrabbedFromDb = `PluginMenu%23${category}`;
    const { menuItems } = yield call(grabFromDb, itemsToBeGrabbedFromDb);
    if (menuItems) {
      yield put(menuItemsLoaded(menuItems));
    } else {
      yield put(menuItemsLoaded([]));
    }

  } catch (err) {
    yield put(menuItemsLoadingError(err));
  }
}

export function* deleteMenuItems(action) {
  try {
    console.log('deleting menuItems', action);
    // const categoryId = yield select(makeSelectCurrentCategoryId());
    // const category = yield select(makeSelectCurrentCategoryFromId(categoryId));
    // console.log('categoryId', categoryId);
    // console.log('category', category);
    // const itemsToBeGrabbedFromDb = `PluginMenu%23${category}`;
    // const { menuItems } = yield call(deleteFromDb, itemsToBeGrabbedFromDb);
    // if (menuItems) {
    //   yield put(menuItemsLoaded(menuItems));
    // } else {
    //   yield put(menuItemsLoaded([]));
    // }

  } catch (err) {
    yield put(menuItemsLoadingError(err));
  }
}

export default function* menuItemsData() {
  yield all([
    takeLatest(LOAD_MENU_ITEMS, getMenuItems),
    takeLatest(DELETE_MENU_ITEMS, deleteMenuItems),
  ]);
}
