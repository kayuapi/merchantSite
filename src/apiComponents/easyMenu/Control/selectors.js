import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectElegantMenuControlDomain = state => state.elegantMenu.control || initialState;

const makeSelectCategorySortModeOn = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate.categorySortModeOn,
  );


const makeSelectElegantMenuCanSaveTabAndPanel = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate.canSaveTabAndPanel,
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

const makeSelectIsCategoryStateAndMenuItemsPanelDirty = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate.canSaveTabAndPanel,
  );

const makeSelectSavedSuccessfully = () =>
  createSelector(
    selectElegantMenuControlDomain,
    substate => substate._savedSuccessfully,
  );

export { 
  makeSelectElegantMenuCanSaveTabAndPanel, 
  makeSelectTabAndPanelSaving,
  makeSelectTabAndPanelError,
  makeSelectCategorySortModeOn,
  makeSelectTabSaving,
  makeSelectTabSavingError,
  makeSelectIsCategoryStateAndMenuItemsPanelDirty,
  makeSelectSavedSuccessfully,
};

