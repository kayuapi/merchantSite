import { useContext } from "react";

import { VariantItemsALaCarteWorkingAreaContext } from "./VariantItemsALaCarteWorkingAreaProvider";
import { useVariantItemsALaCarteWorkingAreaInterface } from "./types";

/**
 * The main API for useVariantItemsALaCarteWorkingArea
 *
 * @return {array} variantItems contains all variant items in the working area
 * @return {function} loadVariantItems loads the variant items received
 * @return {function} updateVariantItem takes in variant item's id and its attribute key and value to update accordingly
 * @return {function} createVariantItem creates a new variant item and enlist it
 * @return {function} deleteVariantItem takes in variant item 's id to delete it
 */

export const useVariantItemsALaCarteWorkingArea: useVariantItemsALaCarteWorkingAreaInterface = () => {
    const {
      state,
      dispatch,
    } = useContext(VariantItemsALaCarteWorkingAreaContext);

    const loadVariantItems = (variantItems: any) => {
      dispatch({type: 'loadVariantItems', variantItems});
    };
    const updateVariantItem = (variantItemId: any, attributeKey: any, attributeValue: any) => {
      dispatch({type: 'updateVariantItem', variantItemId, attributeKey, attributeValue});
    };
    const createVariantItem = () => {
      dispatch({type: 'createVariantItem'});
    };
    const deleteVariantItem = (variantItemId: any) => {
      dispatch({type: 'deleteVariantItem', variantItemId});
    };

    return {
      variantItems: state.variantItems,
      loadVariantItems,
      updateVariantItem,
      createVariantItem,
      deleteVariantItem
    };
};