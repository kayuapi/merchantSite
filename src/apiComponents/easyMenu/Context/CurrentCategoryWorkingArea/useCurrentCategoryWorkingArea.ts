import { useContext, useEffect } from "react";
import isEqual from 'lodash/isEqual';
import { CurrentCategoryWorkingAreaContext } from "./CurrentCategoryWorkingAreaProvider";
import { useCurrentCategoryWorkingAreaInterface } from "./types";

/**
 * The main API for useMenuItemsWorkingArea
 *
 * @return {object} currentCategory contains current category working area
 * @return {function} loadCurrentCategory loads the current category received
 * @return {function} updateCurrentCategory takes in current category's attribute key and value to update accordingly
 * @return {function} resetCurrentCategory reset the current category
 */

export const useCurrentCategoryWorkingArea: useCurrentCategoryWorkingAreaInterface = (currentCategoryFromCloud) => {
    const {
      state,
      dispatch,
    } = useContext(CurrentCategoryWorkingAreaContext);

    useEffect(() => {
      // if (currentCategoryFromCloud) {
        dispatch({type: 'loadCurrentCategoryFromCloud', currentCategoryFromCloud});
      // }
    }, [currentCategoryFromCloud, dispatch]);

    // useEffect(() => {
    //   console.log('currentCategoryFromCloud', state.currentCategoryFromCloud);
    //   console.log('state.currentCategory', state.currentCategory);
    // }, [state.currentCategory, state.currentCategoryFromCloud]);

    // useEffect(() => {
    //   console.log('currentCategory', currentCategory);
    //   console.log('state.currentCategory', state.currentCategory);
    //   // if (currentCategory) {
    //   setIsCurrentCategoryDirty(!(isEqual(currentCategory, state.currentCategory)));
    //   // }
    // }, [currentCategory, state.currentCategory]);

    const loadCurrentCategory = (currentCategory: any) => {
      dispatch({type: 'loadCurrentCategory', currentCategory});
    };
    const updateCurrentCategory = (attributeKey: any, attributeValue: any) => {
      dispatch({type: 'updateCurrentCategory', attributeKey, attributeValue});
    };
    const resetCurrentCategory = () => {
      dispatch({type: 'resetCurrentCategory'});
    };

    return {
      isCurrentCategoryDirty: !(isEqual(state.currentCategoryFromCloud, state.currentCategory)),
      currentCategory: state.currentCategory,
      loadCurrentCategory,
      updateCurrentCategory,
      resetCurrentCategory,
    };
};