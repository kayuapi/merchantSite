import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectElegantMenuDomain = state => state.elegantMenuCategory || initialState;

const makeSelectCategories = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.categories,
  );

const makeSelectCategoriesLoading = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.categoriesLoading,
  );

const makeSelectCategoriesError = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.categoriesError,
  );

const makeSelectCanAddCategory = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.canAddCategory,
  );

const makeSelectCategoriesSaving = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.categoriesSaving,
  );

const makeSelectCurrentCategory = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.currentCategory,
  );

export { 
  makeSelectCategories, 
  makeSelectCategoriesLoading,
  makeSelectCategoriesError,
  makeSelectCanAddCategory,
  makeSelectCategoriesSaving,
  makeSelectCurrentCategory,
};
