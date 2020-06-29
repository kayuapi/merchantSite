
import { 
  LOAD_MENU_ITEMS,
  LOAD_MENU_ITEMS_SUCCESS,
  LOAD_MENU_ITEMS_ERROR,
  ADD_MENU_ITEM,
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
export function addMenuItem(menuItem) {
  return {
    type: ADD_MENU_ITEM,
    menuItem,
  }
}
