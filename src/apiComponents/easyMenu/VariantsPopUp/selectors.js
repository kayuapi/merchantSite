import { createSelector } from 'reselect';
import { initialState } from './reducer';
// import { selectMenuItems } from '../MenuItemsPanel/selectors';

const selectElegantMenuVariantsPopUpDomain = state => 
  state.elegantMenu.variantsPopUp || initialState;

const makeSelectOpenedMenuItemId = () =>
  createSelector(
    selectElegantMenuVariantsPopUpDomain,
    substate => substate.openedMenuItemId,
  );

const makeSelectVariantEntries = () => 
  createSelector(
    selectElegantMenuVariantsPopUpDomain,
    substate => substate.variantPopUpList,
  );

// const makeSelectVariantEntries = () =>
//   createSelector(
//     selectMenuItems,
//     selectElegantMenuVariantsPopUpDomain,
//     (substate, variantsDomain) => {
//       if (variantsDomain.isVariantPopUpOpen) {
//         const variants = substate.filter(({id}) => id === variantsDomain.openedMenuItemId).variants;
//         if (variants) {
//           return variants;
//         }
//       }
//       return [];
//     }

//     // variantsDomain.isVariantPopUpOpen ? 
//     //   (substate.filter(({id}) => id === variantsDomain.openedMenuItemId).variants ? 
//     //     substate.filter(({id}) => id === variantsDomain.openedMenuItemId).variants : []) : [],
    
    
    
//         // (substate, variantsDomain) => substate ? (substate[variantsDomain.openedMenuItemId].variants ? [
//     //   ...substate[variantsDomain.openedMenuItemId].variants
//     // ]: []) : [],
//   );

const makeSelectIsVariantPopUpOpen = () =>
  createSelector(
    selectElegantMenuVariantsPopUpDomain,
    substate => substate.isVariantPopUpOpen,
  );

export {
  makeSelectOpenedMenuItemId,
  makeSelectVariantEntries,
  makeSelectIsVariantPopUpOpen,
};
