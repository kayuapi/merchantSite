/**
 *
 * Product
 *
 */

import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';

import VariantItemSectionCard from './VariantItemSectionCard';
import { makeStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useMenuItemsWorkingArea } from '../Context/MenuItemsWorkingArea/useMenuItemsWorkingArea';
import { useVariantItemSectionsWorkingArea } from '../Context/VariantItemsWorkingArea/useVariantItemSectionsWorkingArea';
import { closeVariantsPopUp } from './actions';
import { makeSelectIsVariantPopUpOpen, makeSelectOpenedMenuItemId } from './selectors';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: '450px',
    // maxHeight: '500px',
    // height: '600px',
  },
}));

export function VariantPopUp({ 
    menuItemId,
    isVariantPopUpOpen,
    closeVariantsPopUp,
  }) {

  const classes = useStyles();

  const { menuItems, updateMenuItem } = useMenuItemsWorkingArea();
  const { variantItemSections, loadVariantItemSections, createVariantItemSection } = useVariantItemSectionsWorkingArea();
  const selectedMenuItem = menuItems.filter(el => el.id === menuItemId)[0];
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
          Combo Variant Selection
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
            Add Section
          </Button>
          <Button
            onClick={() => {
              console.log('**SUBMITTING VARIANT ITEM SECTIONS', variantItemSections);
              updateMenuItem(menuItemId, 'variants', variantItemSections);
              closeVariantsPopUp();
            }}
            variant="contained"
            color="primary"
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

  );
}

VariantPopUp.propTypes = {
  menuItemId: PropTypes.string,
  isVariantPopUpOpen: PropTypes.bool.isRequired,
  closeVariantsPopUp: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  menuItemId: makeSelectOpenedMenuItemId(),
  isVariantPopUpOpen: makeSelectIsVariantPopUpOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    closeVariantsPopUp: () => dispatch(closeVariantsPopUp()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(VariantPopUp);
