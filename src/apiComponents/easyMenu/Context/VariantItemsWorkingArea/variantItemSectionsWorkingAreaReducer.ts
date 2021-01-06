import { VariantItemSectionsWorkingAreaState, VariantItemSectionsWorkingAreaAction } from "./types";
import { nanoid } from 'nanoid';

export const variantItemSectionsWorkingAreaReducer = (
    state: VariantItemSectionsWorkingAreaState,
    action: VariantItemSectionsWorkingAreaAction
): VariantItemSectionsWorkingAreaState => {
    switch (action.type) {
      case "loadVariantItemSections": {
        const { variantItemSections } = action;
        return {
          ...state,
          variantItemSections,
        };
      }

      case "updateVariantItemSection": {
        const { id, attributeKey, attributeValue } = action;
        const newStateVariantItemSections = state.variantItemSections.map(el => {
          if (el.id === id) {
            return {
              ...el, 
              [attributeKey]: attributeValue
            }
          } 
          else {
            return el;
          }
        });
        return {
          ...state,
          variantItemSections: newStateVariantItemSections,
        };
      }

      case "updateVariantItemSectionDetails": {
        const { variantItemSectionId, detailsId, subAction, attributeKey, attributeValue } = action;
        if (subAction === 'update') {
          const selectedVariantItemSection = state.variantItemSections.filter(el => el.id === variantItemSectionId)[0];
          const newStateVariantItemSectionsDetails = selectedVariantItemSection.details.map(el => {
            if (el.id === detailsId) {
              return {
                ...el,
                [attributeKey]: attributeValue
              }
            }
            else {
              return el;
            }
          });
          const newStateVariantItemSections = state.variantItemSections.map(el => {
            if (el.id === variantItemSectionId) {
              return {
                ...el,
                'details': newStateVariantItemSectionsDetails,
              }
            }
            else {
              return el;
            }
          });
          return {
            ...state,
            variantItemSections: newStateVariantItemSections,
          };  
        } else if (subAction === 'delete') {
          const selectedVariantItemSection = state.variantItemSections.filter(el => el.id === variantItemSectionId)[0];
          const newStateVariantItemSectionsDetails = selectedVariantItemSection.details.filter(el => el.id !== detailsId);
          const newStateVariantItemSections = state.variantItemSections.map(el => {
            if (el.id === variantItemSectionId) {
              return {
                ...el,
                'details': newStateVariantItemSectionsDetails,
              }
            }
            else {
              return el;
            }
          });
          return {
            ...state,
            variantItemSections: newStateVariantItemSections,
          };  
        } else {
          return {
            ...state,
          }
        }
      }

      case "createVariantItemSection": {
        return {
          ...state,
          variantItemSections: 
            [
              ...state.variantItemSections, 
              {
                id: nanoid(10),
                title: 'Choice of Mains',
                required: true,
                minSelectionNumber: 0,
                maxSelectionNumber: 999,
                details: [
                  {
                    id: nanoid(10),
                    name: 'Fried chicken',
                    price: 'RM0',
                  },
                ],
              }
            ],
        };
      }

      case "deleteVariantItemSection": {
        const { id } = action;
        const newStateVariantItemSections = state.variantItemSections.filter(el => el.id !== id);
        return {
          ...state,
          variantItemSections: newStateVariantItemSections,
        };
      }
      
      default:
        return state;
    }
};