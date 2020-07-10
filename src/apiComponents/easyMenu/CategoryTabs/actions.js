
import { 
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  ADD_CATEGORY,
  ADD_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  SAVE_CATEGORY,
  SAVE_CATEGORY_SUCCESS,
  SAVE_CATEGORY_ERROR,
  SWITCH_CATEGORY,
  REMOVE_CATEGORY_NEWLY_ADDED,
  UPDATE_CATEGORY_NAME,
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
export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  }
}
export function categoryAddingError(error) {
  return {
    type: ADD_CATEGORY_ERROR,
    error,
  }
}

export function deleteCategory(categories, deletedCategory) {
  return {
    type: DELETE_CATEGORY,
    categories,
    deletedCategory,
  }
}
export function categoryDeleted(categoryId) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    categoryId,
  }
}
export function categoryDeletingError(error) {
  return {
    type: DELETE_CATEGORY_ERROR,
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

export function removeCategoryNewlyAdded(categoryId) {
  return {
    type: REMOVE_CATEGORY_NEWLY_ADDED,
    categoryId,
  }
}

export function updateCategoryName(categoryId, categoryName) {
  return {
    type: UPDATE_CATEGORY_NAME,
    categoryId,
    categoryName,
  }
}