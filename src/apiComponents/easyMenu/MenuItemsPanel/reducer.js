import produce, { setAutoFreeze } from 'immer';
import { 
  UPDATE_USER_ID,
  LOAD_MENU_ITEMS,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_ERROR,
  DELETE_MENU_ITEMS,
  DELETE_MENU_ITEMS_SUCCESS,
  DELETE_MENU_ITEMS_ERROR,
  UPDATE_MENU_ITEMS,
  SYNC_PRV_MENU_ITEMS_IN_CLOUD_AFTER_SAVING_SUCCESSFULLY,
} from './constants';
import awsmobile from '../../../aws-exports';
setAutoFreeze(false);
export const initialState = {
  _prefixUploadedUrl: `https://${awsmobile.aws_user_files_s3_bucket}.s3-${awsmobile.aws_user_files_s3_bucket_region}.amazonaws.com/protected/`,
  _userId: '',
  menuItems: false,
  menuItemsLoading: false,
  menuItemsLoadingError: false,
  menuItemsDeleting: false,
  menuItemsDeletingError: false,
  deletingMenuItems: [], // hold deleting menu items state for optimistic UI failure
};

/* eslint-disable default-case, no-param-reassign */

const elegantMenuItemsPanelReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SYNC_PRV_MENU_ITEMS_IN_CLOUD_AFTER_SAVING_SUCCESSFULLY: {
        draft.menuItems = action._menuItems;
        break;
      }
      case LOAD_MENU_ITEMS: {
        draft.menuItems = false;
        draft.menuItemsLoading = true;
        draft.menuItemsLoadingError = false;
        break;
      }
      case LOAD_MENU_ITEMS_SUCCESS: {
        draft.menuItemsLoading = false;
        if (action.menuItems) {
          draft.menuItems = action.menuItems;
        }
        // draft.menuItems = action.menuItems;
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
      case UPDATE_MENU_ITEMS: {
        draft.menuItems = action.menuItems;
        break;
      }

      case UPDATE_USER_ID: {
        draft._userId = action.userId;
        break;
      }
    }
  })

export default elegantMenuItemsPanelReducer;