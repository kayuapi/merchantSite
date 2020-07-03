import produce from 'immer';
import {
  INIT_TABS,
  REARRANGE_TABS,
} from './constants';

export const initialState = {
  tabs: false,
};

/* eslint-disable default-case, no-param-reassign */

const categoryTabsSortModeOnReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT_TABS: {
        draft.tabs = action.tabs;
        break;
      }
      case REARRANGE_TABS: {
        draft.tabs = action.tabs;
        break;
      }
    }
  })

export default categoryTabsSortModeOnReducer;