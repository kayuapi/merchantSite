/**
 *
 * Product
 *
 */

import React, { useState, useEffect } from 'react';

// import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';

import VariantItemSectionCard from './VariantItemSectionCard';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useVariantItemSectionsWorkingArea } from '../Context/VariantItemsWorkingArea/useVariantItemSectionsWorkingArea';
import { useTranslate } from 'react-admin';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: '450px',
    // maxHeight: '500px',
    // height: '600px',
  },
}));

export function ComboVariantPopUp({ 
    menuItemId,
    selectedMenuItem,
    updateMenuItem,
    isVariantPopUpOpen,
    closeVariantsPopUp,
  }) {
  const translate = useTranslate();
  const classes = useStyles();

  // const { menuItems, updateMenuItem } = useMenuItemsWorkingArea();
  const { variantItemSections, loadVariantItemSections, createVariantItemSection } = useVariantItemSectionsWorkingArea();
  // const selectedMenuItem = menuItems.filter(el => el.id === menuItemId)[0];
  const [isExistingComboVariantsLoaded, setIsExistingComboVariantsLoaded] = useState(false);
  useEffect(() => {
    if (!isExistingComboVariantsLoaded && selectedMenuItem.comboVariants) {
      loadVariantItemSections(selectedMenuItem.comboVariants);
      setIsExistingComboVariantsLoaded(true);
    }  
  }, [isExistingComboVariantsLoaded, loadVariantItemSections, selectedMenuItem.comboVariants]);

  return (
      <Dialog
        open={isVariantPopUpOpen}
        PaperProps={{classes: {root: classes.dialog}}}
      >
        <DialogTitle id="alert-dialog-title">
          {translate('pos.menu.comboVariantSelection')}
        </DialogTitle>

        <DialogContent>
          <div style={{ overflow: "hidden", height: "100%", width: "100%" }}>
            {variantItemSections.map((variantItemSection, ind) => 
              <VariantItemSectionCard key={variantItemSection.id} variantItemSection={variantItemSection} />
            )}
          </div>
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button 
            align="start"
            onClick={()=>{
              createVariantItemSection()
            }}
            color="primary"
          >
            {translate('pos.menu.addSection')}
          </Button>
          <Button
            onClick={() => {
              updateMenuItem(menuItemId, 'variants', variantItemSections);
              closeVariantsPopUp();
            }}
            variant="contained"
            color="primary"
            autoFocus
          >
            {translate('pos.action.ok')}
          </Button>
        </DialogActions>
      </Dialog>

  );
}

export default ComboVariantPopUp;
