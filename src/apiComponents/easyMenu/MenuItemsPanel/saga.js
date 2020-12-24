import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { LOAD_MENU_ITEMS } from './constants';
import { menuItemsLoaded, menuItemsLoadingError } from './actions';
import { grabFromDb } from '../utils/request';
import { selectCurrentCategory } from '../CategoryTabs/selectors';

export function* getMenuItems() {
  try {
    const currentCategory = yield select(selectCurrentCategory);
    if (currentCategory) {
      // avoid network call if currentCategory name is empty (assumption of empty currentCategory name = newly Added is made)
      if (currentCategory.pageId && currentCategory.name) {
        const itemsToBeGrabbedFromDb = `PluginMenu%23${currentCategory.pageId}`;
        const { menuItems } = yield call(grabFromDb, itemsToBeGrabbedFromDb);
        if (menuItems) {
          yield put(menuItemsLoaded(menuItems));
        } else {
          yield put(menuItemsLoaded());
        }  
      } else {
        yield put(menuItemsLoaded());
      }
    }

  } catch (err) {
    yield put(menuItemsLoadingError(err));
  }
}

export default function* menuItemsData() {
  yield all([
    takeLatest(LOAD_MENU_ITEMS, getMenuItems),
  ]);
}
