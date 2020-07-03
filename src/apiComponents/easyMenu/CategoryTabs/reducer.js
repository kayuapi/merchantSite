import produce from 'immer';
import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  ADD_CATEGORY,
  ADD_CATEGORY_ERROR,
  DELETE_CATEGORY,
  SAVE_CATEGORY,
  SAVE_CATEGORY_SUCCESS,
  SAVE_CATEGORY_ERROR,
  SWITCH_CATEGORY,
} from './constants';

export const initialState = {
  categories: false,
  categoriesLoading: false,
  categoriesError: false,
  canAddCategory: true,
  categoriesSaving: false,
  currentCategoryId: false,
};

/* eslint-disable default-case, no-param-reassign */

const categoriesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_CATEGORIES: {
        draft.categories = false;
        draft.categoriesLoading = true;
        draft.categoriesError = false;
        break;
      }
      case LOAD_CATEGORIES_SUCCESS: {
        draft.categories = action.categories;
        draft.categoriesLoading = false;
        if (action.categories) {
          draft.currentCategoryId = action.categories[0].id;
        }
        break;
      }
      case LOAD_CATEGORIES_ERROR: {
        draft.categoriesLoading = false;
        draft.categoriesError = action.error;
        break;
      }
      
      case ADD_CATEGORY: {
        if (!draft.categories) {
          draft.categories = [''];
        } else {
          draft.categories.push('');
        }
        draft.canAddCategory = false;
        draft.categoriesError = false;
        break;
      }
      case ADD_CATEGORY_ERROR: {
        draft.categoriesError = action.error;
        break;
      }

      case DELETE_CATEGORY: {
        draft.categories = draft.categories.filter(category => category.id !== action.categoryId);
        break;
      }
      
      case SAVE_CATEGORY: {
        draft.categoriesSaving = true;
        draft.categoriesError = false;
        break;
      }
      case SAVE_CATEGORY_SUCCESS: {
        draft.categories = action.categories;
        draft.categoriesSaving = false;
        draft.canAddCategory = true;
        break;
      }
      case SAVE_CATEGORY_ERROR: {
        draft.categoriesSaving = false;
        draft.categoriesError = action.error;
        break;
      }
      
      case SWITCH_CATEGORY: {
        draft.currentCategoryId = action.categoryId;
        break;
      }
    }
  })

export default categoriesReducer;