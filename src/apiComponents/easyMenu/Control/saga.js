import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { SAVE_TAB_AND_PANEL, TOGGLE_CATEGORY_SORT_MODE_CONTROLLER, SAVE_TAB_AND_PANEL_THEN_SWITCH_TAB } from './constants';
import { makeSelectCategorySortModeOn } from './selectors';
import { 
  tabAndPanelSaved, 
  tabAndPanelSavingError, 
  saveTab, 
  tabSaved, 
  tabSavingError, 
  toggleCategorySortMode,
} from './actions';
import { switchCategory, updateCategories } from '../CategoryTabs/actions';
import { saveCategoriesToDb, saveCategoriesAndMenuItemsToDb } from '../utils/request';

import { makeSelectSMOCategoryTabs } from '../CategoryTabsSortModeOn/selectors';
import { closeAlertToContinue } from '../AlertToContinue/actions';
import { syncPrvMenuItemsInCloudAfterSavingSuccessfully, updateMenuItems } from '../MenuItemsPanel/actions';
import { selectElegantMenuAlertToContinueIsAlertOn } from '../AlertToContinue/selectors';
import { store } from '../../../App';
// saveCategorySortModeOn

const validateNoDuplicateCategoryName = (categories) => {
  const categoryNames = categories.map(category => category.name);
  let tmpSet = new Set();
  categoryNames.forEach(categoryName => {
    tmpSet.add(categoryName);
  })
  if (tmpSet.size === categoryNames.length) {
    return true;
  }
  return false;
}

export function* saveTabAndPanelThenSwitchTab(action) {
  try {
    console.log('1');
    console.log('action in saga', action);
    if (validateNoDuplicateCategoryName(action.categories)) {
    }
    else {
      throw new Error({message: 'failed validation: duplicated category names'});
    }
    console.log('2');
    if (!action.categories) {
      action.categories = [];
    }
    if (!action.menuItems) {
      action.menuItems = [];
    }
    // const success = true;
    const { success } = yield call(
      saveCategoriesAndMenuItemsToDb, 
      action.categories ? action.categories : [], 
      action.currentCategory.name, 
      action.menuItems ? action.menuItems : []
    );
    console.log('succes', success);
    if (success) {
      yield put(tabAndPanelSaved());
      yield put(closeAlertToContinue());
      yield put(updateCategories(action.categories));
      yield put(updateMenuItems(action.menuItems));
      // yield put(syncPrvMenuItemsInCloudAfterSavingSuccessfully(action.menuItems));
      // console.log('selectElegantMenuAlertToContinueIsAlertOn(store.getState())', selectElegantMenuAlertToContinueIsAlertOn(store.getState()));
      yield put(switchCategory(action.toCategory));

      // if (selectElegantMenuAlertToContinueIsAlertOn(store.getState())) {
      //   yield put(closeAlertToContinue());
      // }
    } else {
      throw new Error({message: "error"});
    }
  } catch (err) {
    console.log('err', err);
    yield put(tabAndPanelSavingError(err));
  }
}



export function* saveTabAndPanel(action) {
  try {
    console.log('saving');
    console.log('action', action);
    if (validateNoDuplicateCategoryName(action.categories)) {
    }
    else {
      throw new Error({message: 'failed validation: duplicated category names'});
    }
    if (!action.categories) {
      action.categories = [];
    }
    if (!action.menuItems) {
      action.menuItems = [];
    }
    // const success = true;
    const { success } = yield call(
      saveCategoriesAndMenuItemsToDb, 
      action.categories ? action.categories : [], 
      action.currentCategory.name, 
      action.menuItems ? action.menuItems : []
    );
    if (success) {
      yield put(tabAndPanelSaved());
      yield put(syncPrvMenuItemsInCloudAfterSavingSuccessfully(action.menuItems));
      console.log('selectElegantMenuAlertToContinueIsAlertOn(store.getState())', selectElegantMenuAlertToContinueIsAlertOn(store.getState()));
      if (selectElegantMenuAlertToContinueIsAlertOn(store.getState())) {
        yield put(closeAlertToContinue());
      }
    } else {
      throw new Error({message: "error"});
    }
  } catch (err) {
    yield put(tabAndPanelSavingError(err));
  }
}

export function* toggleCategorySortModeController() {
  const categorySortModeOn = yield select(makeSelectCategorySortModeOn());
  console.log('CATEGORY SORT MODE', categorySortModeOn);
  if (!categorySortModeOn) {
    yield put(toggleCategorySortMode());
  }
  else {
    yield put(saveTab());
    try {
      const categoriesToBeSavedToDb = yield select(makeSelectSMOCategoryTabs());
      const { success: categoriesSubmittedSuccess } = yield call(saveCategoriesToDb, categoriesToBeSavedToDb);
      if (categoriesSubmittedSuccess) {
        yield all([
          put(tabSaved()),
          put(toggleCategorySortMode()),
        ]);
      }
    } catch (err) {
      yield put(tabSavingError(err));
    }
  }
}

export default function* controlData() {
  yield all([
    takeLatest(SAVE_TAB_AND_PANEL, saveTabAndPanel),
    takeLatest(SAVE_TAB_AND_PANEL_THEN_SWITCH_TAB, saveTabAndPanelThenSwitchTab),
    takeLatest(TOGGLE_CATEGORY_SORT_MODE_CONTROLLER, toggleCategorySortModeController)
  ])
  // yield takeLatest(TOGGLE_CATEGORY_SORT_MODE_CONTROLLER, toggleCategorySortModeController);
}
