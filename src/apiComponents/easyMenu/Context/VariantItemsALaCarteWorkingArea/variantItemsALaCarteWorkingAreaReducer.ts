import { VariantItemsALaCarteWorkingAreaState, VariantItem, VariantItemsALaCarteWorkingAreaAction } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const variantItemsALaCarteWorkingAreaReducer = (
    state: VariantItemsALaCarteWorkingAreaState,
    action: VariantItemsALaCarteWorkingAreaAction
): VariantItemsALaCarteWorkingAreaState => {
    switch (action.type) {
      case "loadVariantItems": {
        const { variantItems } = action;
        return {
          ...state,
          variantItems,
        };
      }

      case "updateVariantItem": {
        const { variantItemId, attributeKey, attributeValue } = action;
        const newStateVariantItems = state.variantItems.map(el => {
          if (el.id === variantItemId) {
            return {
              ...el, 
              [attributeKey]: attributeValue
            } as VariantItem;
          } 
          else {
            return el;
          }
        });
        return {
          ...state,
          variantItems: newStateVariantItems,
        };
      }

      case "createVariantItem": {
        return {
          ...state,
          variantItems: 
            [
              ...state.variantItems, 
              {
                id: uuidv4(),
                name: '',
                price: '',
              }
            ],
        };
      }

      case "deleteVariantItem": {
        const { variantItemId } = action;
        const newStateVariantItems = state.variantItems.filter(el => el.id !== variantItemId);
        return {
          ...state,
          variantItems: newStateVariantItems,
        };
      }
      
      default:
        return state;
    }
};