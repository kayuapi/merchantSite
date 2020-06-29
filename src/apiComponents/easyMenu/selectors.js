import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectElegantMenuDomain = state => state.elegantMenu || initialState;

const makeSelectMenuItems = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.menuItems,
  );

const makeSelectMenuItemsLoading = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.menuItemsLoading,
  );

const makeSelectMenuItemsError = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.menuItemsError,
  );

export { 
  makeSelectMenuItems, 
  makeSelectMenuItemsLoading,
  makeSelectMenuItemsError,
};
