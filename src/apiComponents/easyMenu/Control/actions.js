
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
  RESET_SAVED_SUCCESSFULLY,
} from './constants';

// Save tab and panel
export function saveTabAndPanel(categories, currentCategory, menuItems) {
  return {
    type: SAVE_TAB_AND_PANEL,
    categories,
    currentCategory,
    menuItems,
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

export function resetSavedSuccessfully() {
  return {
    type: RESET_SAVED_SUCCESSFULLY,
  }
}

