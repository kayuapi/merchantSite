
import { 
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  ADD_CATEGORY,
  ADD_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_ERROR,
  UNPUBLISH_CATEGORY,
  UNPUBLISH_CATEGORY_SUCCESS,
  UNPUBLISH_CATEGORY_ERROR,
  SAVE_CATEGORY,
  SAVE_CATEGORY_SUCCESS,
  SAVE_CATEGORY_ERROR,
  SWITCH_CATEGORY,
  UPDATE_CURRENT_CATEGORY,  
  UPDATE_CATEGORIES,
  RESET_CURRENT_CATEGORY,
  RESET_DELETED_SUCCESSFULLY,
  RESET_UNPUBLISHED_SUCCESSFULLY,
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

export function deleteCategory(categories, deletingCategory, currentCategory) {
  return {
    type: DELETE_CATEGORY,
    categories,
    deletingCategory,
    currentCategory,
  }
}
export function categoryDeleted(categoriesBeforeDeleting, deletedCategory, currentCategoryBeforeDeleting) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    categoriesBeforeDeleting,
    deletedCategory,
    currentCategoryBeforeDeleting,
  }
}
export function categoryDeletingError(error) {
  return {
    type: DELETE_CATEGORY_ERROR,
    error,
  }
}
export function unpublishCategory(categories, unpublishingCategory, currentCategory) {
  return {
    type: UNPUBLISH_CATEGORY,
    categories,
    unpublishingCategory,
    currentCategory,
  }
}
export function categoryUnpublished(categoriesBeforeUnpublishing, unpublishedCategory, currentCategoryBeforeUnpublishing) {
  return {
    type: UNPUBLISH_CATEGORY_SUCCESS,
    categoriesBeforeUnpublishing,
    unpublishedCategory,
    currentCategoryBeforeUnpublishing,
  }
}
export function categoryUnpublishingError(error) {
  return {
    type: UNPUBLISH_CATEGORY_ERROR,
    error,
  }
}
// Reset category
export function resetCurrentCategory() {
  return {
    type: RESET_CURRENT_CATEGORY,
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

export function updateCategories(categories) {
  return {
    type: UPDATE_CATEGORIES,
    categories,
  }
}

export function updateCurrentCategory(currentCategory) {
  return {
    type: UPDATE_CURRENT_CATEGORY,
    currentCategory,
  }
}

// for refresh react-hook-form ui upon successful delete
export function resetDeletedSuccessfully() {
  return {
    type: RESET_DELETED_SUCCESSFULLY,
  }
}

// for refresh react-hook-form ui upon successful unpublish
export function resetUnpublishedSuccessfully() {
  return {
    type: RESET_UNPUBLISHED_SUCCESSFULLY,
  }
}

// export function updateCategoryName(categoryId, categoryName) {
//   return {
//     type: UPDATE_CATEGORY_NAME,
//     categoryId,
//     categoryName,
//   }
// }
