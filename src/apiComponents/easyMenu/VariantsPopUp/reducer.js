import produce from 'immer';
import { 
  OPEN_VARIANTS_POPUP,
  CLOSE_VARIANTS_POPUP,
} from './constants';

export const initialState = {
  isVariantPopUpOpen: false,
  variantPopUpList: [],
  openedMenuItemId: '',
};

/* eslint-disable default-case, no-param-reassign */

const elegantMenuVariantsPopUpReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case OPEN_VARIANTS_POPUP: {
        draft.isVariantPopUpOpen = true;
        draft.openedMenuItemId = action.menuItemId;
        break;
      }
      case CLOSE_VARIANTS_POPUP: {
        draft.isVariantPopUpOpen = false;
        draft.openedMenuItemId = '';
        break;
      }
    }
  })

export default elegantMenuVariantsPopUpReducer;