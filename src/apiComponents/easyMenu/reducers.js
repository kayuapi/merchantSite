import categoryTabsReducer from './CategoryTabs/reducer';
import menuItemsPanelReducer from './MenuItemsPanel/reducer';
import controlReducer from './Control/reducer';
import categoryTabsSortModeReducer from './CategoryTabsSortModeOn/reducer';
import variantsPopUpReducer from './VariantsPopUp/reducer';
import alertToContinueReducer from './AlertToContinue/reducer';
import { combineReducers } from 'redux';

export const initialState = {
  isCategoryStateAndMenuItemsPanelDirty: false,
};

/* eslint-disable default-case, no-param-reassign */
const elegantMenuReducer = combineReducers({
  categoryTabs: categoryTabsReducer,
  menuItemsPanel: menuItemsPanelReducer,
  control: controlReducer,
  categoryTabsSMO: categoryTabsSortModeReducer,
  variantsPopUp: variantsPopUpReducer,
  alertToContinue: alertToContinueReducer,
})

export default elegantMenuReducer;