import produce from 'immer';
import { 
  UPDATE_PREFIX_UPLOADED_URL,
  LOAD_MENU_ITEMS,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_ERROR,
  DELETE_MENU_ITEMS,
  DELETE_MENU_ITEMS_SUCCESS,
  DELETE_MENU_ITEMS_ERROR,
  ADD_MENU_ITEM,
  REMOVE_MENU_ITEM,
  UPDATE_MENU_ITEM_NAME,
  UPDATE_MENU_ITEM_PRICE,
  UPDATE_MENU_ITEM_IMAGE,
  UPDATE_MENU_ITEMS_LOCATION,
  UPDATE_MENU_ITEM_VARIANTS,
} from './constants';
import _ from "lodash";
import awsmobile from '../../../aws-exports';

export const initialState = {
  metaData: {
    menuItemsLength: 0
  }, 
  _prefixUploadedUrl: `https://${awsmobile.aws_user_files_s3_bucket}.s3-${awsmobile.aws_user_files_s3_bucket_region}.amazonaws.com/protected/`,
  menuItems: [],
  menuItemsLoading: false,
  menuItemsLoadingError: false,
  menuItemsDeleting: false,
  menuItemsDeletingError: false,
  deletingMenuItems: [], // hold deleting menu items state for optimistic UI failure
};

/* eslint-disable default-case, no-param-reassign */
function isExistedInStore(menuItemId, store) {
  if (!Array.isArray(store) || !store.length) {
    return -1;
  }
  const k = store.map(({ id }) => id).indexOf(menuItemId);
  return k;
}

function deleteAndAdjustUILocation(menuItems, deletedMenuItemId) {
  const droppedIndex = _.findIndex(menuItems, {id: deletedMenuItemId});
  const unaffectedMenuItems = _.slice(menuItems, 0, droppedIndex);
  const affectedMenuItems = _.drop(menuItems, droppedIndex + 1);
  affectedMenuItems.forEach((el) => {
    if (el.uiLocation.x === 0) {
      el.uiLocation.y -= 1;
    }
    el.uiLocation.x = Number(!el.uiLocation.x)
  });
  return [...unaffectedMenuItems, ...affectedMenuItems];
}

const elegantMenuItemsPanelReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_MENU_ITEMS: {
        draft.menuItems = [];
        draft.menuItemsLoading = true;
        draft.menuItemsLoadingError = false;
        break;
      }
      case LOAD_MENU_ITEMS_SUCCESS: {
        draft.menuItems = action.menuItems;
        draft.menuItemsLoading = false;
        break;
      }
      case LOAD_MENU_ITEMS_ERROR: {
        draft.menuItemsLoading = false;
        draft.menuItemsLoadingError = action.error;
        break;
      }
      case DELETE_MENU_ITEMS: {
        draft.menuItemsDeleting = true;
        draft.menuItemsDeletingError = false;
        draft.deletingMenuItems = action.deletingMenuItems;
        break;
      }
      case DELETE_MENU_ITEMS_SUCCESS: {
        draft.menuItemsDeleting = false;
        draft.deletingMenuItems = [];
        break;
      }
      case DELETE_MENU_ITEMS_ERROR: {
        draft.menuItemsDeletingError = action.error;
        draft.menuItems = draft.deletingMenuItems;
        draft.deletingMenuItems = [];
        break;
      }
      case ADD_MENU_ITEM: {
        draft.menuItems.push(action.menuItem);
        break;
      }
      case REMOVE_MENU_ITEM: {
        draft.menuItems = deleteAndAdjustUILocation(draft.menuItems, action.menuItemId);
        break;
      }

      case UPDATE_MENU_ITEM_NAME: {
        let k = [];
        draft.menuItems.forEach(menuItem => {
          if (menuItem.id === action.menuItemId) {
            menuItem.name = action.menuItemName;
          }
          k.push(menuItem);
        });
        draft.menuItems = k;
        break;
      }

      case UPDATE_MENU_ITEM_PRICE: {
        let k = [];
        draft.menuItems.forEach(menuItem => {
          if (menuItem.id === action.menuItemId) {
            menuItem.price = action.menuItemPrice;
          }
          k.push(menuItem);
        });
        draft.menuItems = k;
        break;
      }

      case UPDATE_MENU_ITEM_IMAGE: {
        let k = [];
        draft.menuItems.forEach(menuItem => {
          if (menuItem.id === action.menuItemId) {
            menuItem.image = action.menuItemImage;
          }
          k.push(menuItem);
        });
        draft.menuItems = k;
        break;
      }

      case UPDATE_MENU_ITEMS_LOCATION: {
        let k = [];
        draft.menuItems.forEach(menuItem => {
          const foundIndex = action.menuItemIdAndLocationArray.findIndex(x => x.i === menuItem.id);
          const updatedUiLocation = {
            x: action.menuItemIdAndLocationArray[foundIndex].x,
            y: action.menuItemIdAndLocationArray[foundIndex].y,
            w: action.menuItemIdAndLocationArray[foundIndex].w,
            h: action.menuItemIdAndLocationArray[foundIndex].h,
          };
          menuItem.uiLocation = updatedUiLocation;
          k.push(menuItem);
        });
        draft.menuItems = k;
        break;
      }


      case UPDATE_MENU_ITEM_VARIANTS: {
        let k = [];
        draft.menuItems.forEach(menuItem => {
          if (menuItem.id === action.menuItemId) {
            menuItem.variants = action.variants;
          }
          k.push(menuItem);
        });
        console.log('k is', k);
        draft.menuItems = k;
        break;
      }

      case UPDATE_PREFIX_UPLOADED_URL: {
        draft._prefixUploadedUrl = draft._prefixUploadedUrl+action.userId+'/';
        break;
      }
    }
  })

export default elegantMenuItemsPanelReducer;