import { MenuItemsWorkingAreaState, MenuItemAction } from "./types";

export const menuItemsWorkingAreaReducer = (
    state: MenuItemsWorkingAreaState,
    action: MenuItemAction
): MenuItemsWorkingAreaState => {
    switch (action.type) {
      case "loadMenuItems": {
        const { menuItems } = action;
        return {
          ...state,
          menuItems,
        };
      }

      case "updateMenuItem": {
        const { id, attributeKey, attributeValue } = action;
        const newStateMenuItems = state.menuItems.map(el => {
          if (el.id === id) {
            if (el.type === 'COMBO') {
              if (attributeKey === 'variants') {
                return {
                  ...el,
                  comboVariants: attributeValue
                }
              }
            }
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
          menuItems: newStateMenuItems,
        };
      }

      case "createMenuItem": {
        return {
          ...state,
        };
      }

      case "deleteMenuItem": {
        const { id } = action;
        const newStateMenuItems = state.menuItems.filter(el => el.id !== id);
        return {
          ...state,
          menuItems: newStateMenuItems,
        };
      }
      
      default:
        return state;
    }
};