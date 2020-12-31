import produce from 'immer';
import {
  SAVE_TAB_AND_PANEL,
  SAVE_TAB_AND_PANEL_THEN_SWITCH_TAB,
  SAVE_TAB_AND_PANEL_SUCCESS,
  SAVE_TAB_AND_PANEL_ERROR,
  SAVE_TAB,
  SAVE_TAB_SUCCESS,
  SAVE_TAB_ERROR,
  TOGGLE_CATEGORY_SORT_MODE,
  TOGGLE_CATEGORY_SORT_MODE_CONTROLLER,
  RESET_SAVED_SUCCESSFULLY,
  MODIFY_TAB_AND_PANEL_DIRTINESS,
} from './constants';

export const initialState = {
  // _savedSuccessfully is used to make save page ui button works
  _savedSuccessfully: false,
  tabAndPanelSaving: false,
  tabAndPanelError: false,
  categorySortModeOn: false,
  tabSaving: false,
  tabSavingError: false,
  isTabAndPanelDirty: false,
};

/* eslint-disable default-case, no-param-reassign */

const controlReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_TAB_AND_PANEL: {
        draft.tabAndPanelSaving = true;
        draft.tabAndPanelError = false;
        draft._savedSuccessfully = false;
        break;
      }
      case SAVE_TAB_AND_PANEL_THEN_SWITCH_TAB: {
        draft.tabAndPanelSaving = true;
        draft.tabAndPanelError = false;
        draft._savedSuccessfully = false;
        break;
      }
      case SAVE_TAB_AND_PANEL_SUCCESS: {
        draft.tabAndPanelSaving = false;
        draft.tabAndPanelError = false;
        draft._savedSuccessfully = true;
        break;
      }
      case SAVE_TAB_AND_PANEL_ERROR: {
        draft.tabAndPanelSaving = false;
        draft.tabAndPanelError = action.error;
        break;
      }
      case SAVE_TAB: {
        draft.tabSaving = true;
        draft.tabSavingError = false;
        draft._savedSuccessfully = false;
        break;
      }
      case SAVE_TAB_SUCCESS: {
        draft.tabSaving = false;
        draft.tabSavingError = false;
        draft._savedSuccessfully = true;
        break;
      }
      case RESET_SAVED_SUCCESSFULLY: {
        draft._savedSuccessfully = false;
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
      case MODIFY_TAB_AND_PANEL_DIRTINESS: {
        draft.isTabAndPanelDirty = action.status;
        break;
      }
    }
  })

export default controlReducer;