import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectElegantMenuDomain = state => state.elegantMenu.categoryTabs || initialState;
const selectCategories = state => state.elegantMenu.categoryTabs.categories || initialState;

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

const makeSelectCurrentCategoryId = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.currentCategory.id,
  );

const makeSelectCurrentCategory = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.currentCategory,
  );


const makeSelectCurrentCategoryFromId = (id) =>
  createSelector(
    selectCategories,
    substate => substate.filter(category => category.id === id)[0] ? substate.filter(category => category.id === id)[0].name : '',
  );
  
const makeSelectCategoryDeleting = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.categoryDeleting,
  );

export { 
  selectCategories,
  makeSelectCategories, 
  makeSelectCategoriesLoading,
  makeSelectCategoriesError,
  makeSelectCanAddCategory,
  makeSelectCategoriesSaving,
  makeSelectCurrentCategoryId,
  makeSelectCurrentCategoryFromId,
  makeSelectCategoryDeleting,
  makeSelectCurrentCategory,
};
