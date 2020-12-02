import { useContext } from "react";

import { MenuItemsWorkingAreaContext } from "./MenuItemsWorkingAreaProvider";
import { useMenuItemsWorkingAreaInterface } from "./types";

/**
 * The main API for useMenuItemsWorkingArea
 *
 * @return {array} menuItems contains all menu items in the working area
 * @return {function} loadMenuItems loads the menu item received
 * @return {function} updateMenuItem takes in menu item's id and its attribute key and value to update accordingly
 * @return {function} updateMenuItemLayout takes in menu item's layout to update accordingly
 * @return {function} createMenuItem creates a new menu item and enlist it
 * @return {function} deleteMenuItems takes in menu item's id to delete it
 */

export const useMenuItemsWorkingArea: useMenuItemsWorkingAreaInterface = () => {
    const {
      state,
      dispatch,
    } = useContext(MenuItemsWorkingAreaContext);

    const loadMenuItems = (menuItems: any) => {
      dispatch({type: 'loadMenuItems', menuItems});
    };
    const updateMenuItem = (id: any, attributeKey: any, attributeValue: any) => {
      dispatch({type: 'updateMenuItem', id, attributeKey, attributeValue});
    };
    const updateMenuItemLayout = (layout: any) => {
      dispatch({type: 'updateMenuItemLayout', layout});
    };
    const createMenuItem = (location: any) => {
      dispatch({type: 'createMenuItem', uiLocation: location});
    };
    const deleteMenuItem = (id: any) => {
      dispatch({type: 'deleteMenuItem', id});
    };

    return {
      menuItems: state.menuItems,
      loadMenuItems,
      updateMenuItem,
      updateMenuItemLayout,
      createMenuItem,
      deleteMenuItem
    };
};