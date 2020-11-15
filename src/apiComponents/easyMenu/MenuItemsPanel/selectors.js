import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectElegantMenuItemsPanelDomain = state => state.elegantMenu.menuItemsPanel || initialState;
const selectMenuItems = state => state.elegantMenu.menuItemsPanel.menuItems  || initialState['menuItems'];
  
const makeSelectPrefixUploadedUrl = () =>
  createSelector(
    selectElegantMenuItemsPanelDomain,
    substate => substate._prefixUploadedUrl+substate._userId,
  );

const makeSelectMenuItems = () =>
  createSelector(
    selectElegantMenuItemsPanelDomain,
    substate => substate.menuItems,
  );

const makeSelectMenuItemsLoading = () =>
  createSelector(
    selectElegantMenuItemsPanelDomain,
    substate => substate.menuItemsLoading,
  );

const makeSelectMenuItemsError = () =>
  createSelector(
    selectElegantMenuItemsPanelDomain,
    substate => substate.menuItemsError,
  );

export { 
  selectMenuItems,
  makeSelectMenuItems,
  makeSelectMenuItemsLoading,
  makeSelectMenuItemsError,
  makeSelectPrefixUploadedUrl,
};
