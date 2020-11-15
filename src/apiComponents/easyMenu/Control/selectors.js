import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectElegantMenuControlDomain = state => state.elegantMenu.control || initialState;

const makeSelectCategorySortModeOn = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate.categorySortModeOn,
  );

const makeSelectIsTabAndPanelDirty = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate.isTabAndPanelDirty,
  );

const makeSelectTabAndPanelSaving = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate.tabAndPanelSaving,
  );

const makeSelectTabAndPanelError = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate.tabAndPanelError,
  );

const makeSelectTabAndPanelSavedSuccessfully = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate._savedSuccessfully,
  );
  
const makeSelectTabSaving = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate.tabSaving,
  );

const makeSelectTabSavingError = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate.tabSavingError,
  );

const makeSelectSavedSuccessfully = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate._savedSuccessfully,
  );

export {
  makeSelectTabAndPanelSaving,
  makeSelectTabAndPanelError,
  makeSelectCategorySortModeOn,
  makeSelectTabSaving,
  makeSelectTabSavingError,
  makeSelectSavedSuccessfully,
  makeSelectTabAndPanelSavedSuccessfully,
  makeSelectIsTabAndPanelDirty,
};

