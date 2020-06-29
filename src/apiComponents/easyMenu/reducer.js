import produce from 'immer';
import { 
  ADD_VARIANT, 
  REMOVE_VARIANT, 
  UPDATE_VARIANT, 
  UPDATE_MENU_ITEM,
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

const elegantMenuReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_VARIANT: {
        break;
      }
      case REMOVE_VARIANT: {
        break;
      }
      case UPDATE_VARIANT: {
        break;
      }
      case UPDATE_MENU_ITEM: {
        action.menuItems.forEach(menuItem => {
          draft.push(menuItem);
        });
        break;
      }
    }
  })

export default elegantMenuReducer;