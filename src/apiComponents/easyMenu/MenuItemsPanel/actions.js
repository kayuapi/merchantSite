
import { 
  UPDATE_USER_ID,
  LOAD_MENU_ITEMS,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_ERROR,
  ADD_MENU_ITEM,
  REMOVE_MENU_ITEM,
  UPDATE_MENU_ITEMS,
  SYNC_PRV_MENU_ITEMS_IN_CLOUD_AFTER_SAVING_SUCCESSFULLY,
} from './constants';

export function syncPrvMenuItemsInCloudAfterSavingSuccessfully(_menuItems) {
  return {
    type: SYNC_PRV_MENU_ITEMS_IN_CLOUD_AFTER_SAVING_SUCCESSFULLY,
    _menuItems,
  }
}

export function updateUserId(userId) {
  return {
    type: UPDATE_USER_ID,
    userId,
  }
}
// Menu items
export function loadMenuItems() {
  return {
    type: LOAD_MENU_ITEMS,
  }
}
export function menuItemsLoaded(menuItems) {
  return {
    type: LOAD_MENU_ITEMS_SUCCESS,
    menuItems,
  }
}
export function menuItemsLoadingError(error) {
  return {
    type: LOAD_MENU_ITEMS_ERROR,
    error,
  }
}

export function addMenuItem(menuItem) {
  return {
    type: ADD_MENU_ITEM,
    menuItem,
  }
}
export function removeMenuItem(menuItemId) {
  return {
    type: REMOVE_MENU_ITEM,
    menuItemId,
  }
}

export function updateMenuItems(menuItems) {
  return {
    type: UPDATE_MENU_ITEMS,
    menuItems,
  }
}
