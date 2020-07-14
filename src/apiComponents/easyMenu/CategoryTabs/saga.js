import { call, select, put, takeLatest, all } from 'redux-saga/effects';
import { LOAD_CATEGORIES, SWITCH_CATEGORY, DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS } from './constants';
import { categoriesLoaded, categoriesLoadingError, categoryDeleted, categoryDeletingError, switchCategory } from './actions';
import { closeAlertToContinue } from '../AlertToContinue/actions';
import { grabFromDb, deleteCategoriesAndMenuItemsFromDb } from '../utils/request';
import { selectElegantMenuAlertToContinueIsAlertOn } from '../AlertToContinue/selectors';

export function* getCategories() {
  try {
    const itemsToBeGrabbedFromDb = `PluginMenuPages`;
    const {categories} = yield call(grabFromDb, itemsToBeGrabbedFromDb);
    if (categories) {
      if (categories.length !== 0) {
        yield put(categoriesLoaded(categories));
      } else {
        yield put(categoriesLoaded());
      }
    } else {
      yield put(categoriesLoaded());
    }
  } catch (err) {
    yield put(categoriesLoadingError(err));
  }
}

export function* closeAlertWindowAfterSwitchCategory() {
  // check if alert to continue on, if so, close it
  const isAlertToContinueOn = yield select(selectElegantMenuAlertToContinueIsAlertOn);
  if (isAlertToContinueOn) {
    yield put(closeAlertToContinue());
  }
}

export function* deletingCategory(action) {
  try {
    let success = false;
    // newlyAdded Category does not require network call to delete
    if (!action.deletingCategory.newlyAdded) {
      const { success: successResponse } = yield call(deleteCategoriesAndMenuItemsFromDb, action.categories, action.deletingCategory);
      success = successResponse;
    } else {
      success = true;
    }
    if (success) {
      yield put(categoryDeleted(action.categories, action.deletingCategory, action.currentCategory));

      // // alert to continue will always pop up when delete category, so it needs to be closed 
      yield put(closeAlertToContinue());
    } else {
      throw new Error({message: "error"});
    }
  } catch (err) {
    yield put(categoryDeletingError(err));
  }
}

// takes care of switching category after delete a category
export function* deletedCategory(action) {
  const remainingCategories = action.categoriesBeforeDeleting.filter(category => category.id !== action.deletedCategory.id);
  const isThereRemainingCategories = remainingCategories.length !== 0;
  // if there are remaining categories, and deleting category is the same as current category, then switch category to the first one 
  if (action.deletedCategory.id === action.currentCategoryBeforeDeleting.id) {
    if (isThereRemainingCategories) {
      yield put(switchCategory(remainingCategories[0]));
    }
  }
}

export default function* categoriesData() {
  yield all([
    takeLatest(LOAD_CATEGORIES, getCategories),
    takeLatest(SWITCH_CATEGORY, closeAlertWindowAfterSwitchCategory),
    takeLatest(DELETE_CATEGORY, deletingCategory),
    takeLatest(DELETE_CATEGORY_SUCCESS, deletedCategory),
  ]);

}
