import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { v4 as uuidv4 } from 'uuid';

const selectElegantMenuDomain = state => state.elegantMenuItemsPanel || initialState;
const selectMenuItems = state => state.elegantMenuItemsPanel.menuItems;
const makeSelectMenuItems = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.menuItems,
  );

const makeSelectMenuItemsWithAddItem = () =>
  createSelector(
    selectElegantMenuDomain,
    substate => substate.menuItems ? [
      ...substate.menuItems, 
      {
        id: uuidv4(),
        key: uuidv4(),
        uiLocation: {
          add: true,
          x: substate.menuItems.length % 2,
          y: Math.floor(substate.menuItems.length / 2),
          w: 1,
          h: 2,
        }
      }
    ]: substate.menuItems,
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
  selectMenuItems,
  makeSelectMenuItems, 
  makeSelectMenuItemsLoading,
  makeSelectMenuItemsError,
  makeSelectMenuItemsWithAddItem,
};
