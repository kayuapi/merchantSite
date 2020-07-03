import produce from 'immer';
import {
  SAVE_TAB_AND_PANEL,
  SAVE_TAB_AND_PANEL_SUCCESS,
  SAVE_TAB_AND_PANEL_ERROR,
  SAVE_TAB,
  SAVE_TAB_ERROR,
  TOGGLE_CATEGORY_SORT_MODE,
  TOGGLE_CATEGORY_SORT_MODE_CONTROLLER,
  MODIFY_STATE_TO_CLEAN,
  MODIFY_STATE_TO_DIRTY,
} from './constants';

export const initialState = {
  canSaveTabAndPanel: true,
  tabAndPanelSaving: false,
  tabAndPanelError: false,
  categorySortModeOn: false,
  tabSaving: false,
  tabSavingError: false,

};

/* eslint-disable default-case, no-param-reassign */

const controlReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_TAB_AND_PANEL: {
        draft.tabAndPanelSaving = true;
        draft.tabAndPanelError = false;
        break;
      }
      case SAVE_TAB_AND_PANEL_SUCCESS: {
        draft.canSaveTabAndPanel = false;
        draft.tabAndPanelSaving = false;
        draft.tabAndPanelError = false;
        break;
      }
      case SAVE_TAB_AND_PANEL_ERROR: {
        draft.canSaveTabAndPanel = true;
        draft.tabAndPanelSaving = false;
        draft.tabAndPanelError = action.error;
        break;
      }
      case SAVE_TAB: {
        draft.tabSaving = true;
        draft.tabSavingError = false;
        break;
      }
      case SAVE_TAB_ERROR: {
        draft.tabSaving = false;
        draft.tabSavingError = true;
        break;
      }
      case TOGGLE_CATEGORY_SORT_MODE: {
        draft.categorySortModeOn = !draft.categorySortModeOn;
        break;
      }
      case TOGGLE_CATEGORY_SORT_MODE_CONTROLLER: {
        break;
      }
      case MODIFY_STATE_TO_DIRTY: {
        draft.canSaveTabAndPanel = true;
        break;
      }
      case MODIFY_STATE_TO_CLEAN: {
        draft.canSaveTabAndPanel = false;
        break;
      }

      
    }
  })

export default controlReducer;