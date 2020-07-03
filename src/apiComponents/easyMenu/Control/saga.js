import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { SAVE_TAB_AND_PANEL, TOGGLE_CATEGORY_SORT_MODE_CONTROLLER } from './constants';
import { makeSelectCategorySortModeOn } from './selectors';
import { 
  tabAndPanelSaved, 
  tabAndPanelSavingError, 
  saveTab, 
  tabSaved, 
  tabSavingError, 
  toggleCategorySortMode,
  modifyStateToClean,
  modifyStateToDirty, 
} from './actions';
import { saveCategoriesToDb, savePanelToDb } from '../utils/request';
import { 
  selectCategories, 
  makeSelectCategories, 
  makeSelectCurrentCategoryId, 
  makeSelectCurrentCategoryFromId 
} from '../CategoryTabs/selectors';
import { makeSelectSMOCategoryTabs } from '../CategoryTabsSortModeOn/selectors';
import { makeSelectMenuItems } from '../MenuItemsPanel/selectors';

// import { store } from '../../../App';


export function* saveTabAndPanel() {
  try {
    const categoriesToBeSavedToDb = yield select(makeSelectCategories());
    const { success: categoriesSubmittedSuccess } = yield call(saveCategoriesToDb, categoriesToBeSavedToDb);

    const items = yield select(makeSelectMenuItems());
    const categoryId = yield select(makeSelectCurrentCategoryId());
    const category = yield select(makeSelectCurrentCategoryFromId(categoryId));
    const { success: panelSubmittedSuccess } = yield call(savePanelToDb, items, category);

    if (categoriesSubmittedSuccess && panelSubmittedSuccess) {
      yield put(tabAndPanelSaved());
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
    takeLatest(TOGGLE_CATEGORY_SORT_MODE_CONTROLLER, toggleCategorySortModeController)
  ])
  // yield takeLatest(TOGGLE_CATEGORY_SORT_MODE_CONTROLLER, toggleCategorySortModeController);
}
