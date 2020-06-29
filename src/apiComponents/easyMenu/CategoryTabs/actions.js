
import { 
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  ADD_CATEGORY,
  ADD_CATEGORY_ERROR,
  SAVE_CATEGORY,
  SAVE_CATEGORY_SUCCESS,
  SAVE_CATEGORY_ERROR,
  SWITCH_CATEGORY,
} from './constants';

// Load categories
export function loadCategories() {
  return {
    type: LOAD_CATEGORIES,
  }
}
export function categoriesLoaded(categories) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    categories,
  }
}
export function categoriesLoadingError(error) {
  return {
    type: LOAD_CATEGORIES_ERROR,
    error,
  }
}

// Add category: error occurs when adding more than 1 tabs || 
//               any previous actions without saving
export function addCategory() {
  return {
    type: ADD_CATEGORY,
  }
}
export function categoryAddingError(error) {
  return {
    type: ADD_CATEGORY_ERROR,
    error,
  }
}

// Save category
export function saveCategory() {
  return {
    type: SAVE_CATEGORY,
  }
}
export function categorySaved(categories) {
  return {
    type: SAVE_CATEGORY_SUCCESS,
    categories,
  }
}
export function categoriesSavingError(error) {
  return {
    type: SAVE_CATEGORY_ERROR,
    error,
  }
}

// Switch category tab
export function switchCategory(category) {
  return {
    type: SWITCH_CATEGORY,
    category,
  }
}