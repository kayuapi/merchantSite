import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectElegantMenuVariantsPopUpDomain = state => 
  state.elegantMenu.variantsPopUp || initialState;

const makeSelectOpenedMenuItemId = () =>
  createSelector(
    selectElegantMenuVariantsPopUpDomain,
    substate => substate.openedMenuItemId,
  );

const makeSelectIsVariantPopUpOpen = () =>
  createSelector(
    selectElegantMenuVariantsPopUpDomain,
    substate => substate.isVariantPopUpOpen,
  );

export {
  makeSelectOpenedMenuItemId,
  makeSelectIsVariantPopUpOpen,
};
