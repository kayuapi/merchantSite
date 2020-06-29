
import { 
  ADD_VARIANT, 
  REMOVE_VARIANT, 
  UPDATE_VARIANT, 
  ADD_MENU_ITEM,
  UPDATE_MENU_ITEM,
} from './constants';

export function addVariant() {
  return {
    type: ADD_VARIANT,
  };
}

export function removeVariant() {
  return {
    type: REMOVE_VARIANT,
  };
}

export function updateVariant() {
  return {
    type: UPDATE_VARIANT,
  };
}

export function updateMenuItems(menuItems) {
  return {
    type: UPDATE_MENU_ITEM,
    menuItems,
  }
}


