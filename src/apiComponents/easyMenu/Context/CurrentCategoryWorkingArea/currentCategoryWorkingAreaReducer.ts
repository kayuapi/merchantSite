import { CurrentCategoryWorkingAreaState, CurrentCategoryAction } from "./types";
import { Id } from "../../../orderMemo/types";

export const currentCategoryWorkingAreaReducer = (
    state: CurrentCategoryWorkingAreaState,
    action: CurrentCategoryAction
): CurrentCategoryWorkingAreaState => {
    switch (action.type) {
      case "loadCurrentCategory": {
        const { currentCategory } = action;
        return {
          ...state,
          currentCategory,
        };
      }

      case "loadCurrentCategoryFromCloud": {
        const { currentCategoryFromCloud } = action;
        return {
          ...state,
          currentCategoryFromCloud,
        };
      }
      
      case "updateCurrentCategory": {
        const { attributeKey, attributeValue } = action;
        const newStateCurrentCategory = {
          ...state.currentCategory as object,
          [attributeKey]: attributeValue,
        } as {
          id: Id;
          pageId: string;
          name: string;
          status?: "ENABLED" | "DISABLED" | null;
        };
        if (attributeKey === 'status' && attributeValue === 'ENABLED') {
          delete newStateCurrentCategory['status'];
        }
        return {
          ...state,
          currentCategory: newStateCurrentCategory,
        };
      }

      case "resetCurrentCategory": {
        return {
          ...state,
          currentCategory: false,
        }
      }
      
      default:
        return state;
    }
};