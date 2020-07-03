import produce from 'immer';
import { 
  ADD_VARIANT_ENTRY,
  REMOVE_VARIANT_ENTRY,
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
      case ADD_VARIANT_ENTRY: {
        draft.variantPopUpList.push(action.variantEntry);
        break;
      }
      case REMOVE_VARIANT_ENTRY: {
        // eslint-disable-next-line no-undef
        draft.variantPopUpList = draft.variantPopUpList.filter(variantEntry => variantEntry.id !== action.variantEntryId);
        break;
      }
      case OPEN_VARIANTS_POPUP: {
        draft.isVariantPopUpOpen = true;
        draft.openedMenuItemId = action.menuItemId;
        draft.variantPopUpList = action.variantEntries;
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