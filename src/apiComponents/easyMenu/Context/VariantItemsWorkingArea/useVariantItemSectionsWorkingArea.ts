import { useContext } from "react";

import { VariantItemSectionsWorkingAreaContext } from "./VariantItemSectionsWorkingAreaProvider";
import { useVariantItemSectionsWorkingAreaInterface } from "./types";

/**
 * The main API for useVariantItemSectionsWorkingArea
 *
 * @return {array} variantItemSections contains all variant item sections in the working area
 * @return {function} loadVariantItemSections loads the menu item received
 * @return {function} updateVariantItemSection takes in menu item's id and its attribute key and value to update accordingly
 * @return {function} createVariantItemSection creates a new variant item section and enlist it
 * @return {function} deleteVariantItemSection takes in variant item section's id to delete it
 */

export const useVariantItemSectionsWorkingArea: useVariantItemSectionsWorkingAreaInterface = () => {
    const {
      state,
      dispatch,
    } = useContext(VariantItemSectionsWorkingAreaContext);

    const loadVariantItemSections = (variantItemSections: any) => {
      dispatch({type: 'loadVariantItemSections', variantItemSections});
    };
    const updateVariantItemSection = (id: any, attributeKey: any, attributeValue: any) => {
      dispatch({type: 'updateVariantItemSection', id, attributeKey, attributeValue});
    };
    const updateVariantItemSectionDetails = (variantItemSectionId: any, detailsId: any, subAction: any, attributeKey: any, attributeValue: any) => {
      dispatch({type: 'updateVariantItemSectionDetails', variantItemSectionId, detailsId, subAction, attributeKey, attributeValue});
    };
    const createVariantItemSection = () => {
      dispatch({type: 'createVariantItemSection'});
    };
    const deleteVariantItemSection = (id: any) => {
      dispatch({type: 'deleteVariantItemSection', id});
    };

    return {
      variantItemSections: state.variantItemSections,
      loadVariantItemSections,
      updateVariantItemSection,
      updateVariantItemSectionDetails,
      createVariantItemSection,
      deleteVariantItemSection
    };
};