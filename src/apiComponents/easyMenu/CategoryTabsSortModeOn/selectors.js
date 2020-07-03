import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { selectCategories } from '../CategoryTabs/selectors';
const selectElegantMenuCategoryTabsSMODomain = state => 
  state.elegantMenu.categoryTabsSMO || initialState;

const makeSelectSMOCategoryTabs = () =>
  createSelector(
    selectElegantMenuCategoryTabsSMODomain,
    selectCategories,
    (SMOsubstate, categories) => SMOsubstate.tabs ? SMOsubstate.tabs : categories,
  );


export { 
  makeSelectSMOCategoryTabs,
};

