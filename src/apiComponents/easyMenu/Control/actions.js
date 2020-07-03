
import { 
  SAVE_TAB_AND_PANEL,
  SAVE_TAB_AND_PANEL_SUCCESS,
  SAVE_TAB_AND_PANEL_ERROR,
  SAVE_TAB,
  SAVE_TAB_SUCCESS,
  SAVE_TAB_ERROR,
  TOGGLE_CATEGORY_SORT_MODE,
  TOGGLE_CATEGORY_SORT_MODE_CONTROLLER,
  MODIFY_STATE_TO_DIRTY,
  MODIFY_STATE_TO_CLEAN,
} from './constants';

// Save tab and panel
export function saveTabAndPanel() {
  return {
    type: SAVE_TAB_AND_PANEL,
  }
}
export function tabAndPanelSaved() {
  return {
    type: SAVE_TAB_AND_PANEL_SUCCESS,
  }
}
export function tabAndPanelSavingError(error) {
  return {
    type: SAVE_TAB_AND_PANEL_ERROR,
    error,
  }
}

// Save tab
export function saveTab() {
  return {
    type: SAVE_TAB,
  }
}
export function tabSaved() {
  return {
    type: SAVE_TAB_SUCCESS,
  }
}
export function tabSavingError(error) {
  return {
    type: SAVE_TAB_ERROR,
    error,
  }
}

// Toggle sort mode
// Save tab and panel
export function toggleCategorySortMode() {
  return {
    type: TOGGLE_CATEGORY_SORT_MODE,
  }
}

export function toggleCategorySortModeController() {
  return {
    type: TOGGLE_CATEGORY_SORT_MODE_CONTROLLER,
  }
}
export function modifyStateToClean() {
  return {
    type: MODIFY_STATE_TO_CLEAN,
  }
}
export function modifyStateToDirty() {
  return {
    type: MODIFY_STATE_TO_DIRTY,
  }
}

