
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

// Save tab and panel
export function saveTabAndPanel(categories, currentCategory, menuItems) {
  return {
    type: SAVE_TAB_AND_PANEL,
    categories,
    currentCategory,
    menuItems,
  }
}
export function saveTabAndPanelThenSwitchTab(categories, currentCategory, menuItems, toCategory) {
  return {
    type: SAVE_TAB_AND_PANEL_THEN_SWITCH_TAB,
    categories,
    currentCategory,
    menuItems,
    toCategory,
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

export function resetSavedSuccessfully() {
  return {
    type: RESET_SAVED_SUCCESSFULLY,
  }
}


export function modifyTabAndPanelDirtiness(status) {
  return {
    type: MODIFY_TAB_AND_PANEL_DIRTINESS,
    status,
  }
}

