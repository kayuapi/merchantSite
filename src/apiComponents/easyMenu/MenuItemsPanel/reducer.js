import produce from 'immer';
import { 
  LOAD_MENU_ITEMS,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_ERROR,
  ADD_MENU_ITEM,
} from './constants';


export const initialState = {
  metaData: {
    menuItemsLength: 0
  }, 
  menuItems: false,
  menuItemsLoading: false,
  menuItemsError: false,
};

/* eslint-disable default-case, no-param-reassign */
function isExistedInStore(menuItemId, store) {
  if (!Array.isArray(store) || !store.length) {
    return -1;
  }
  const k = store.map(({ id }) => id).indexOf(menuItemId);
  return k;
}

const elegantMenuItemsPanelReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MENU_ITEMS: {
        draft.menuItems = false;
        draft.menuItemsLoading = true;
        draft.error = false;
        break;
      }
      case LOAD_MENU_ITEMS_SUCCESS: {
        draft.menuItems = action.menuItems;
        draft.menuItemsLoading = false;
        break;
      }
      case LOAD_MENU_ITEMS_ERROR: {
        draft.menuItemsLoading = false;
        draft.menuItemsError = action.error;
        break;
      }
      case ADD_MENU_ITEM: {
        draft.menuItems.push(action.menuItem)
        break;
      }

    }
  })

export default elegantMenuItemsPanelReducer;