import { call, put, takeLatest, all } from 'redux-saga/effects';
import { LOAD_CATEGORIES, DELETE_CATEGORY } from './constants';
import { categoriesLoaded, categoriesLoadingError, categoryDeleted, categoryDeletingError, switchCategory } from './actions';
import { closeAlertToContinue } from '../AlertToContinue/actions';
import { grabFromDb, deleteCategoriesAndMenuItemsFromDb } from '../utils/request';

export function* getCategories() {
  try {
    const itemsToBeGrabbedFromDb = `PluginMenuPages`;
    const {categories} = yield call(grabFromDb, itemsToBeGrabbedFromDb);
    yield put(categoriesLoaded(categories));
  } catch (err) {
    yield put(categoriesLoadingError(err));
  }
}



export function* deleteCategory(action) {
  try {
    console.log('saga.js: deleteCategory action', action);
    let success = false;
    // newlyAdded Category does not require network call to delete
    if (!action.deletedCategory.newlyAdded) {
      const { success: successResponse } = yield call(deleteCategoriesAndMenuItemsFromDb, action.categories, action.deletedCategory.name);
      success = successResponse;
    } else {
      success = true;
    }
    if (success) {
      // // alert to continue will always pop up when delete category, so it needs to be closed 
      yield put(categoryDeleted(action.deletedCategory.id));
      yield put(switchCategory(action.categories[0].id));
      yield put(closeAlertToContinue());
    } else {
      throw new Error({message: "error"});
    }
  } catch (err) {
    yield put(categoryDeletingError(err));
  }
}

export default function* categoriesData() {
  yield all([
    takeLatest(LOAD_CATEGORIES, getCategories),
    takeLatest(DELETE_CATEGORY, deleteCategory),
  ]);

}
