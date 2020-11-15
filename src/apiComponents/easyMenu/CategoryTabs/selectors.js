import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectElegantMenuDomain = state => state.elegantMenu.categoryTabs || initialState;
const selectCategories = state => state.elegantMenu.categoryTabs.categories || initialState['categories'];
const selectCurrentCategory = state => state.elegantMenu.categoryTabs.currentCategory || initialState['currentCategory'];

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

const makeSelectDeletedSuccessfully = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.deletedSuccessfully,
  );


const makeSelectCurrentCategoryFromId = (id) =>
  createSelector(
    selectCategories,
    substate => {
      if (substate) {
        return substate.filter(category => category.id === id)[0] ? substate.filter(category => category.id === id)[0] : false
      } else {
        return false;
      }
    }
  );
  
const makeSelectCategoryDeleting = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.categoryDeleting,
  );

export { 
  selectCategories,
  selectCurrentCategory,
  makeSelectCategories, 
  makeSelectCategoriesLoading,
  makeSelectCategoriesError,
  makeSelectCanAddCategory,
  makeSelectCategoriesSaving,
  makeSelectCurrentCategoryId,
  makeSelectCurrentCategoryFromId,
  makeSelectCategoryDeleting,
  makeSelectCurrentCategory,
  makeSelectDeletedSuccessfully,
};
