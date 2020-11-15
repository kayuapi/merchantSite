import { MenuItemsWorkingAreaState, MenuItemAction, MenuItem, MenuItemAttributeValueRGLLayoutType } from "./types";
import { v4 as uuidv4 } from 'uuid';

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
                } as MenuItem;
              }
            }

            if (attributeKey === 'uiLocation') {
              // attributeValue is RGL layout
              const filteredAttributeValue = (attributeValue as MenuItemAttributeValueRGLLayoutType).filter(menuItem => menuItem.id === id)[0];
              return {
                ...el,
                uiLocation: {...filteredAttributeValue}
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

      case "updateMenuItemLayout": {
        const { layout } = action;
        let newStateMenuItems: MenuItem[] = [];
        state.menuItems.forEach(menuItem => {

          // const menuItemIdAndLocation = layout.filter(layoutette => layoutette.i === menuItem.id)[0];
          const menuItemIdAndLocation = layout.filter(layoutette => layoutette.i === menuItem.id).map(el => ({
            h: el.h,
            i: el.i,
            minH: el.minH,
            moved: el.moved,
            static: el.static,
            w: el.w,
            x: el.x,
            y: el.y,
          }))[0];
          // menuItem.uiLocation = menuItemIdAndLocation;
          const newMenuItem = {...menuItem, uiLocation: menuItemIdAndLocation};
          newStateMenuItems.push(newMenuItem);
        })

        return {
          ...state,
          menuItems: newStateMenuItems,
        }
      }

      case "createMenuItem": {
        const { uiLocation } = action;
        return {
          ...state,
          menuItems: 
            [
              ...state.menuItems,
              {
                id: uuidv4(),
                name: '',
                price: '',
                image: '',
                type: "A_LA_CARTE",
                uiLocation,
                variants: [],
                comboVariants: [],
              }
            ],
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