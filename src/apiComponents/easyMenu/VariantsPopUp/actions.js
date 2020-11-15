
import {
  OPEN_VARIANTS_POPUP,
  CLOSE_VARIANTS_POPUP,
} from './constants';

export function openVariantsPopUp(menuItemId) {
  return {
    type: OPEN_VARIANTS_POPUP,
    menuItemId,
  }
}
export function closeVariantsPopUp() {
  return {
    type: CLOSE_VARIANTS_POPUP,
  }
}
