/**
 *
 * Product
 *
 */

import React, { useState, useEffect } from 'react';

// import { FormattedMessage } from 'react-intl';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Paper from '@material-ui/core/Paper';

import VariantItemRow from './VariantItemRow';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { useVariantItemsALaCarteWorkingArea } from '../Context/VariantItemsALaCarteWorkingArea/useVariantItemsALaCarteWorkingArea';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: '450px',
    // maxHeight: '500px',
    // height: '600px',
  },
  table: {
    maxWidth: 400,
  },
}));

export function ALaCarteVariantPopUp({ 
    menuItemId,
    selectedMenuItem,
    updateMenuItem,
    isVariantPopUpOpen,
    closeVariantsPopUp,
  }) {

  const classes = useStyles();

  // const { menuItems, updateMenuItem } = useMenuItemsWorkingArea();
  const { variantItems, loadVariantItems, createVariantItem } = useVariantItemsALaCarteWorkingArea();
  // const selectedMenuItem = menuItems.filter(el => el.id === menuItemId)[0];
  const [isExistingVariantsLoaded, setIsExistingVariantsLoaded] = useState(false);
  useEffect(() => {
    if (!isExistingVariantsLoaded && selectedMenuItem.variants) {
      loadVariantItems(selectedMenuItem.variants);
      setIsExistingVariantsLoaded(true);
    }  
  }, [isExistingVariantsLoaded, loadVariantItems, selectedMenuItem.variants]);

  return (
      <Dialog
        open={isVariantPopUpOpen}
        PaperProps={{classes: {root: classes.dialog}}}
      >
        <DialogTitle id="alert-dialog-title">
          A La Carte Variant Selection
        </DialogTitle>

        <DialogContent>
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              padding="none"
              aria-label="spanning table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    Product Variant Name
                  </TableCell>
                  <TableCell align="center">
                    Unit Price
                  </TableCell>
                  <TableCell align="center" colSpan={3}>
                    Quantity
                  </TableCell>
                  <TableCell align="center" />
                </TableRow>
              </TableHead>
              <TableBody>
                {variantItems.map(variantItem => (
                  <VariantItemRow key={variantItem.id} variantItem={variantItem} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
          <Button 
            align="start"
            onClick={()=>{
              createVariantItem();
            }}
            color="primary"
          >
            Add Variant
          </Button>
          <Button
            onClick={() => {
              updateMenuItem(menuItemId, 'variants', variantItems);
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

export default ALaCarteVariantPopUp;
