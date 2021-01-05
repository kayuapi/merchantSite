/**
 *
 * Variants Pop Up container that display either ALaCarteVariantsPopUp or ComboVariantsPopUp
 *
 */

import React from 'react';

import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';

import { VariantItemsALaCarteWorkingAreaProvider } from '../Context/VariantItemsALaCarteWorkingArea/VariantItemsALaCarteWorkingAreaProvider';
import { VariantItemSectionsWorkingAreaProvider } from '../Context/VariantItemsWorkingArea/VariantItemSectionsWorkingAreaProvider';
import { useMenuItemsWorkingArea } from '../Context/MenuItemsWorkingArea/useMenuItemsWorkingArea';

import ComboVariantsPopUp from '../ComboVariantsPopUp';
import ALaCarteVariantsPopUp from '../ALaCarteVariantsPopUp';

export function VariantPopUp({ 
    menuItemId,
    isVariantPopUpOpen,
    closeVariantsPopUp,
  }) {
    const { menuItems, updateMenuItem } = useMenuItemsWorkingArea();
  let selectedMenuItem = menuItems.filter(el => el.id === menuItemId)[0];
  return (
    <>
      {selectedMenuItem && selectedMenuItem.type !== 'COMBO' && 
        <VariantItemsALaCarteWorkingAreaProvider>
          <ALaCarteVariantsPopUp 
            menuItemId={menuItemId} 
            selectedMenuItem={selectedMenuItem} 
            updateMenuItem={updateMenuItem} 
            isVariantPopUpOpen={isVariantPopUpOpen} 
            closeVariantsPopUp={closeVariantsPopUp} 
          />
        </VariantItemsALaCarteWorkingAreaProvider>
      }    
      {selectedMenuItem && selectedMenuItem.type === 'COMBO' && 
        <VariantItemSectionsWorkingAreaProvider>
          <ComboVariantsPopUp
            menuItemId={menuItemId} 
            selectedMenuItem={selectedMenuItem} 
            updateMenuItem={updateMenuItem} 
            isVariantPopUpOpen={isVariantPopUpOpen} 
            closeVariantsPopUp={closeVariantsPopUp}
          />
        </VariantItemSectionsWorkingAreaProvider>
      }
    </>
  );
}

VariantPopUp.propTypes = {
  menuItemId: PropTypes.string,
  isVariantPopUpOpen: PropTypes.bool.isRequired,
  closeVariantsPopUp: PropTypes.func,
};

export default VariantPopUp;
