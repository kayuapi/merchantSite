/**
 *
 * Product
 *
 */

import React, { memo, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import { v4 as uuidv4 } from 'uuid';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import CardActionArea from '@material-ui/core/CardActionArea';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import InputBase from '@material-ui/core/InputBase';
import { useFieldArray, Controller, useFormContext } from "react-hook-form";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import { addVariantEntry, removeVariantEntry, closeVariantsPopUp } from './actions';
import { updateMenuItemVariants, updateDirtiness } from '../MenuItemsPanel/actions';
import { makeSelectVariantEntries, makeSelectIsVariantPopUpOpen, makeSelectOpenedMenuItemId } from './selectors';

// import { useInjectReducer } from 'utils/injectReducer';
// import reducer from './reducer';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 300,
  },
  tablecell: {
    // fontSize: '8pt',
    minWidth: '2rem',
    padding: '0 10px 0 0',
  },
  priceCell: {
    // fontSize: '8pt',
    minWidth: '3rem',
    padding: '0 10px 0 0',
  },
  tablecell2: {
    // fontSize: '8pt',
    width: '50px',
  },

}));

export function VariantPopUp({ 
    menuItemId,
    isVariantPopUpOpen,
    variantEntries,
    addVariantEntry,
    removeVariantEntry,
    updateMenuItemVariants,
    closeVariantsPopUp,
    updateDirtiness,
  }) {
  // useInjectReducer({ key: 'product', reducer });
  const classes = useStyles();
  const { getValues, register } = useFormContext();
  return (
    <>
      <Dialog
        open={isVariantPopUpOpen}
      >
        <DialogTitle id="alert-dialog-title">
          Variant Selection
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
                  <TableCell style={{width: '0%'}}>
                  </TableCell>
                  <TableCell>
                    Product Variant Name
                  </TableCell>
                  <TableCell align="left">
                    Unit Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {variantEntries.map((variantEntry, nestedIndex) => {
                  return (
                    <TableRow key={variantEntry.id}>
                      <TableCell style={{width: '0%'}}>
                        {/* <input 
                          hidden 
                          name={`variantsAlt[${nestedIndex}].id`} 
                          readOnly 
                          value={variantEntry.id} 
                          ref={register} 
                        /> */}
                        <Controller
                          as={<input hidden readOnly />}
                          name={`variantsAlt[${nestedIndex}].id`}
                          defaultValue={variantEntry.id}
                          placeholder=""
                        />
                      </TableCell>
                      <TableCell className={classes.tablecell}>
                          <Controller
                              as={<InputBase multiline />}
                              name={`variantsAlt[${nestedIndex}].name`}
                              defaultValue={variantEntry.name}
                              placeholder="e.g: Variant 1"
                          />
                      </TableCell>
                      <TableCell align="center" className={classes.priceCell}>
                          <Controller
                              as={<InputBase multiline />}
                              name={`variantsAlt[${nestedIndex}].price`}
                              defaultValue={variantEntry.price}
                              placeholder="e.g: RM 5 "
                          />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={()=> {removeVariantEntry(variantEntry.id)}}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )}
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions className={classes.dialogActions}>
        <Button 
          align="start"
          onClick={()=>{
            addVariantEntry({
                id: uuidv4(),
                name: '',
                price: '',
              });
            }
          } 
          color="primary">
            Add variant
          </Button>
          <Button
            onClick={() => {
              const variantEntries1 = getValues({nest: true})['variantsAlt'];
              updateMenuItemVariants(menuItemId, variantEntries1);
              updateDirtiness(menuItemId, {variants: variantEntries1});
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
    </>
  );
}

VariantPopUp.propTypes = {
  menuItemId: PropTypes.string,
  isVariantPopUpOpen: PropTypes.bool.isRequired,
  variantEntries: PropTypes.array.isRequired,
  addVariantEntry: PropTypes.func,
  removeVariantEntry: PropTypes.func,
  closeVariantsPopUp: PropTypes.func,
  updateMenuItemVariants: PropTypes.func,
  updateDirtiness: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  menuItemId: makeSelectOpenedMenuItemId(),
  isVariantPopUpOpen: makeSelectIsVariantPopUpOpen(),
  variantEntries: makeSelectVariantEntries(),
});

function mapDispatchToProps(dispatch) {
  return {
    addVariantEntry: variantEntry => dispatch(addVariantEntry(variantEntry)),
    removeVariantEntry: variantEntryId => dispatch(removeVariantEntry(variantEntryId)),
    closeVariantsPopUp: () => dispatch(closeVariantsPopUp()),
    updateMenuItemVariants: (menuItemId, variants) => dispatch(updateMenuItemVariants(menuItemId, variants)),
    updateDirtiness: (menuItemId, fields) => dispatch(updateDirtiness(menuItemId, fields)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(VariantPopUp);
