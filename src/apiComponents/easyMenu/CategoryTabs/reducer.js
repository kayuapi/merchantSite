import produce from 'immer';
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
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  RESET_CURRENT_CATEGORY,
  RESET_DELETED_SUCCESSFULLY,
  RESET_UNPUBLISHED_SUCCESSFULLY,
} from './constants';

export const initialState = {
  // false is an alias for empty array to save the trouble of jsx due to that [] is true and [].length is false
  categories: false,
  currentCategory: false,

  categoriesLoading: false,
  categoriesError: false,
  categoriesSaving: false,
  categoryUnpublishing: false,
  categoryUnpublished: false,
  categoryUnpublishedError: false,
  categoryPublishing: false,
  categoryPublished: false,
  categoryPublishedError: false,
  categoryDeleting: false,
  deletedSuccessfully: false,
};

/* eslint-disable default-case, no-param-reassign */

const categoriesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_CATEGORIES: {
        draft.categories = false;
        draft.categoriesLoading = true;
        draft.categoriesError = false;
        draft.currentCategory = false;
        break;
      }
      case LOAD_CATEGORIES_SUCCESS: {
        draft.categoriesLoading = false;
        if (action.categories) {
          // create new categories array which has _name to store cloud value for dirtiness check and other UI usage
          const categories = action.categories.map(({...category}) => ({
            ...category,
            _newlyAdded: false,
          }))
          draft.categories = categories;
        }
        break;
      }
      case LOAD_CATEGORIES_ERROR: {
        draft.categoriesLoading = false;
        draft.categoriesError = action.error;
        break;
      }
      case RESET_CURRENT_CATEGORY: {
        draft.currentCategory = false;
        break;
      }
      
      case ADD_CATEGORY: {
        // if categories has 0 length, it is 'false' (bool), so here make it to (list)
        if (!draft.categories) {
          draft.categories = [];
        }
        draft.categories.push(action.category);
        draft.categoriesError = false;
        break;
      }
      case ADD_CATEGORY_ERROR: {
        draft.categoriesError = action.error;
        break;
      }

      case DELETE_CATEGORY: {
        draft.categoryDeleting = true;
        draft.categoriesError = false;
        break;
      }
      case DELETE_CATEGORY_SUCCESS: {
        const filteredCategories = draft.categories.filter(category => category.id !== action.deletedCategory.id);
        if (filteredCategories.length === 0) {
          draft.categories = false;
          draft.currentCategory = false;
        } else {
          draft.categories = filteredCategories;
        }
        draft.categoryDeleting = false;
        draft.deletedSuccessfully = true;
        break;
      }
      case DELETE_CATEGORY_ERROR: {
        draft.categoryDeleting = false;
        draft.categoriesError = action.error;
        break;
      }
      case UNPUBLISH_CATEGORY: {
        draft.categoryUnpublishing = true;
        draft.categoryUnpublishedError = false;
        break;
      }
      case UNPUBLISH_CATEGORY_SUCCESS: {
        const filteredCategories = draft.categories.filter(category => category.id !== action.unpublishedCategory.id);
        if (filteredCategories.length === 0) {
          draft.categories = false;
          draft.currentCategory = false;
        } else {
          draft.categories = filteredCategories;
        }
        draft.categoryUnpublishing = false;
        draft.categoryUnpublished = true;
        break;
      }
      case UNPUBLISH_CATEGORY_ERROR: {
        draft.categoryUnpublishing = false;
        draft.categoryUnpublishedError = action.error;
        break;
      }
      
      case SAVE_CATEGORY: {
        draft.categoriesSaving = true;
        draft.categoriesError = false;
        break;
      }
      case SAVE_CATEGORY_SUCCESS: {
        const newCategories = action.categories.map(({...category}) => ({
          ...category,
          _newlyAdded: false,
        }))
        draft.categories = newCategories;
        draft.categoriesSaving = false;
        break;
      }
      case SAVE_CATEGORY_ERROR: {
        draft.categoriesSaving = false;
        draft.categoriesError = action.error;
        break;
      }
      
      case SWITCH_CATEGORY: {
        draft.currentCategory = action.category;
        break;
      }

      case RESET_DELETED_SUCCESSFULLY: {
        draft.deletedSuccessfully = false;
        break;
      }

      case RESET_UNPUBLISHED_SUCCESSFULLY: {
        draft.categoryUnpublished = false;
        break;
      }
      
      case UPDATE_CATEGORIES: {
        draft.categories = action.categories;
        break;
      }

      case UPDATE_CURRENT_CATEGORY: {
        draft.currentCategory = action.currentCategory;
        break;
      }
    }
  })

export default categoriesReducer;