
import { 
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

export function deleteMenuItems(deletingMenuItems) {
  return {
    type: DELETE_MENU_ITEMS,
    deletingMenuItems,
  }
}
export function menuItemsDeleted(menuItems) {
  return {
    type: DELETE_MENU_ITEMS_SUCCESS,
    menuItems,
  }
}
export function menuItemsDeletingError(error) {
  return {
    type: DELETE_MENU_ITEMS_ERROR,
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

export function updateMenuItemName(menuItemId, menuItemName) {
  return {
    type: UPDATE_MENU_ITEM_NAME,
    menuItemId,
    menuItemName,
  }
}

export function updateMenuItemPrice(menuItemId, menuItemPrice) {
  return {
    type: UPDATE_MENU_ITEM_PRICE,
    menuItemId,
    menuItemPrice,
  }
}

export function updateMenuItemImage(menuItemId, menuItemImage) {
  return {
    type: UPDATE_MENU_ITEM_IMAGE,
    menuItemId,
    menuItemImage,
  }
}

export function updateMenuItemsLocation(menuItemIdAndLocationArray) {
  return {
    type: UPDATE_MENU_ITEMS_LOCATION,
    menuItemIdAndLocationArray,
  }
}

export function updateMenuItemVariants(menuItemId, variants) {
  return {
    type: UPDATE_MENU_ITEM_VARIANTS,
    menuItemId,
    variants,
  }
}
