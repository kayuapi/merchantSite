import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { v4 as uuidv4 } from 'uuid';

const selectElegantMenuItemsPanelDomain = state => state.elegantMenu.menuItemsPanel || initialState;
const selectMenuItems = state => state.elegantMenu.menuItemsPanel.menuItems  || initialState['menuItems'];
const selectPrvMenuItemsInCloud = state => state.elegantMenu.menuItemsPanel._menuItemsInCloud || initialState['_menuItemsInCloud'];
const selectMenuItemsVariants = (state, menuItemId) => {
  return state.elegantMenu.menuItemsPanel.menuItems.filter(({id})=> id === menuItemId)[0].variants ?
    state.elegantMenu.menuItemsPanel.menuItems.filter(({id})=> id === menuItemId)[0].variants: [];

}
  // state.elegantMenuItemsPanel.menuItems.filter(({id})=> id === menuItemId).variants ?
  //   state.elegantMenuItemsPanel.menuItems.filter(({id})=> id === menuItemId).variants: [];
const selectMenuItemsLayout = state => {
  if (state.elegantMenu.menuItemsPanel.menuItems) {
    const thing = state.elegantMenu.menuItemsPanel.menuItems.reduce(
      (acc, {id, uiLocation: {x, y, w, h}}) => {
        const k = {
          i: id,
          x,
          y,
          w,
          h
        }
        acc.push(k);
        return acc;
      }, []);
    const thingWithAddCard = [...thing, {
      i: "777de917-038b-4704-bb3e-22a02d29365e",
      x: thing.length % 2,
      y: Math.floor(thing.length / 2) * 2,
      w: 1,
      h: 2,
    }];
    return thingWithAddCard;
  } else {
    return [{
      i: "777de917-038b-4704-bb3e-22a02d29365e",
      x: 0,
      y: 0,
      w: 1,
      h: 2,
    }]
  }
}

const makeSelectIsMenuItemsDirty = () =>
  createSelector(
    selectElegantMenuItemsPanelDomain,
    substate => substate._isDirty,
  );
  
const makeSelectPrefixUploadedUrl = () =>
  createSelector(
    selectElegantMenuItemsPanelDomain,
    substate => substate._prefixUploadedUrl,
  );

const makeSelectMenuItemsLayout = () =>
  createSelector(
    selectMenuItemsLayout,
    substate => substate,
  );

const makeSelectMenuItems = () =>
  createSelector(
    selectElegantMenuItemsPanelDomain,
    substate => substate.menuItems,
  );

const makeSelectMenuItemsWithAddItem = () =>
  createSelector(
    selectElegantMenuItemsPanelDomain,
    substate => substate.menuItems ? [
      ...substate.menuItems, 
      {
        id: "777de917-038b-4704-bb3e-22a02d29365e",
        key: "777de917-038b-4704-bb3e-22a02d29365e",
        uiLocation: {
          add: true,
          x: substate.menuItems.length % 2,
          y: Math.floor(substate.menuItems.length / 2) * 2,
          w: 1,
          h: 2,
        }
      }
    ]: [
      {
        id: "777de917-038b-4704-bb3e-22a02d29365e",
        key: "777de917-038b-4704-bb3e-22a02d29365e",
        uiLocation: {
          add: true,
          x: 0,
          y: 0,
          w: 1,
          h: 2,
        }
      }
    ],
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
  selectPrvMenuItemsInCloud,
  selectMenuItemsLayout,
  selectMenuItemsVariants,
  makeSelectMenuItemsLayout,
  makeSelectMenuItems,
  makeSelectMenuItemsLoading,
  makeSelectMenuItemsError,
  makeSelectMenuItemsWithAddItem,
  makeSelectPrefixUploadedUrl,
  makeSelectIsMenuItemsDirty,
};
