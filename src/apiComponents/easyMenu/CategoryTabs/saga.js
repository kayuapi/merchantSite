import { call, select, put, takeLatest, all } from 'redux-saga/effects';
import { LOAD_CATEGORIES, LOAD_CATEGORIES_SUCCESS, SWITCH_CATEGORY, DELETE_CATEGORY, UNPUBLISH_CATEGORY } from './constants';
import { categoriesLoaded, categoriesLoadingError, categoryDeleted, categoryDeletingError, switchCategory, categoryUnpublished } from './actions';
import { loadMenuItems, updateMenuItems } from '../MenuItemsPanel/actions';
import { closeAlertToContinue } from '../AlertToContinue/actions';
import { grabFromDb, deleteCategoriesAndMenuItemsFromDb, unpublishCategoriesToDb } from '../utils/request';
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

// once categories loaded succesfully, switch category to the first one if it exists
export function* getMenuItemsFromCategory(action) {
  if (action.categories) {
    const currentCategory = action.categories[0];
    if (currentCategory) {
      yield put(switchCategory(currentCategory));
    }
  }
}

// when category is switched, load the menu items
export function* getMenuItemsWhenSwitchCategory(action) {
  // check if alert to continue on, if so, close it
  const isAlertToContinueOn = yield select(selectElegantMenuAlertToContinueIsAlertOn);
  if (isAlertToContinueOn) {
    yield put(closeAlertToContinue());
  }
  yield put(loadMenuItems());
}

export function* unpublishingCategory(action) {
  try {
    const { success } = yield call(unpublishCategoriesToDb, action.categories, action.unpublishingCategory);
    if (success) {
      const remainingCategories = action.categories.filter(category => category.id !== action.unpublishingCategory.id);
      const isThereRemainingCategories = remainingCategories.length !== 0;
      // if there are remaining categories, and unpublishing category is the same as current category, then switch category to the first one 
      if (action.unpublishingCategory.id === action.currentCategory.id) {
        if (isThereRemainingCategories) {
          yield put(switchCategory(remainingCategories[0]));
        }
      }
      yield put(categoryUnpublished(action.categories, action.unpublishingCategory, action.currentCategory));
      // // alert to continue will always pop up when delete category, so it needs to be closed 
      yield put(closeAlertToContinue());
    } else {
      throw new Error({message: "error"});
    }
  } catch (err) {
    // yield put(categoryUnpublishingError(err));
  }
}

export function* deletingCategory(action) {
  try {
    let success = false;
    // if the category to be deleted has _name == false, it is a newly created category. Newly created category does not need network call to delete
    if (action.deletingCategory._newlyAdded) {
      success = true;
    } else {
      const { success: successResponse } = yield call(deleteCategoriesAndMenuItemsFromDb, action.categories, action.deletingCategory);
      success = successResponse;

    }
    if (success) {
      const remainingCategories = action.categories.filter(category => category.id !== action.deletingCategory.id);
      const isThereRemainingCategories = remainingCategories.length !== 0;
      // if there are remaining categories, and deleting category is the same as current category, then switch category to the first one 
      if (action.deletingCategory.id === action.currentCategory.id) {
        if (isThereRemainingCategories) {
          yield put(switchCategory(remainingCategories[0]));
        // for ensuring when switch from unpublished menu to published menu, the menu items is false to ensure dirtiness update
        } else {
          yield put(updateMenuItems(false));
        }
      }
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
// export function* deletedCategory(action) {
//   const remainingCategories = action.categoriesBeforeDeleting.filter(category => category.id !== action.deletedCategory.id);
//   const isThereRemainingCategories = remainingCategories.length !== 0;
//   // if there are remaining categories, and deleting category is the same as current category, then switch category to the first one 
//   if (action.deletedCategory.id === action.currentCategoryBeforeDeleting.id) {
//     if (isThereRemainingCategories) {
//       yield put(switchCategory(remainingCategories[0]));
//     }
//   }
// }

export default function* categoriesData() {
  yield all([
    takeLatest(LOAD_CATEGORIES, getCategories),
    takeLatest(LOAD_CATEGORIES_SUCCESS, getMenuItemsFromCategory),
    takeLatest(SWITCH_CATEGORY, getMenuItemsWhenSwitchCategory),
    takeLatest(DELETE_CATEGORY, deletingCategory),
    takeLatest(UNPUBLISH_CATEGORY, unpublishingCategory),
    // takeLatest(DELETE_CATEGORY_SUCCESS, deletedCategory),
  ]);

}
