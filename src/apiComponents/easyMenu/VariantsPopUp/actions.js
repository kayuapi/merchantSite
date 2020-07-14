
import {

  ADD_VARIANT_ENTRY,
  REMOVE_VARIANT_ENTRY,
  STORE_VARIANT_ENTRIES_TO_PRODUCTS,
  OPEN_VARIANTS_POPUP,
  CLOSE_VARIANTS_POPUP,
} from './constants';

export function addVariantEntry(variantEntry) {
  return {
    type: ADD_VARIANT_ENTRY,
    variantEntry,
  }
}
export function removeVariantEntry(variantEntryId) {
  return {
    type: REMOVE_VARIANT_ENTRY,
    variantEntryId,
  }
}
export function storeVariantEntriesToProducts(variantEntries) {
  return {
    type: STORE_VARIANT_ENTRIES_TO_PRODUCTS,
    variantEntries,
  }
}

export function openVariantsPopUp(menuItemId, variantEntries) {
  return {
    type: OPEN_VARIANTS_POPUP,
    menuItemId,
    variantEntries,
  }
}
export function closeVariantsPopUp() {
  return {
    type: CLOSE_VARIANTS_POPUP,
  }
}
