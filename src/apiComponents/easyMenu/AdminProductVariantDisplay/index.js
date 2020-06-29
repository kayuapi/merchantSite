/**
 *
 * Product
 *
 */

import React, { memo, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
// import { connect, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import FastfoodIcon from '@material-ui/icons/Fastfood';

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

// import { useInjectReducer } from 'utils/injectReducer';

// import reducer from './reducer';
// import { addProductToCart, removeProductFromCart } from './actions';
// import messages from './messages';
// import 'jquery-ui/ui/effects/effect-slide';

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


export function AdminProductVariantDisplay({ 
    // control, 
    index, 
    isOpen, 
    setVariantOpen,
    append,
    fields,
    remove,
    setValue
  }) {
  // useInjectReducer({ key: 'product', reducer });
  const classes = useStyles();
  const { getValues, watch } = useFormContext();
  const { fields: fieldsAlt, append: appendAlt, remove: removeAlt } = useFieldArray({
    name: `menuPage.items[${index}].variantsAlt`
  });

  console.log('ttttFields', fields);
  const watchVariants = watch();
  console.log('WATCHING', watchVariants);
  const handleClose = () => {
    const updatedVariant = fields.reduce((acc, obj, ind) => {
      acc[`menuPage.items[${index}].variants[${ind}].name`] = 'tta';
      acc[`menuPage.items[${index}].variants[${ind}].price`] = getValues(`menuPage.items[${index}].variantsAlt[${ind}].price`);
      return acc;
    }, {});
    console.log('UPDATED_VAIANT', [updatedVariant]);
    setValue([updatedVariant]);
    setVariantOpen(false);
  }

  return (
    <>
      <Dialog
        open={isOpen}
      >
        <DialogTitle id="alert-dialog-title">
          {/* <FormattedMessage {...messages.dialogTitle} /> */}
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
                    {/* <FormattedMessage {...messages.dialogItemTitle} /> */}
                  </TableCell>
                  <TableCell align="left">
                    Unit Price
                    {/* <FormattedMessage {...messages.dialogItemQuantity} /> */}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {fields.map((itemNest, nestedIndex) => {
                    return (
                        <TableRow key={itemNest.id}>
                          <TableCell className={classes.tablecell}>
                              <Controller
                                  as={<InputBase multiline />}
                                  name={`menuPage.items[${index}].variantsAlt[${nestedIndex}].name`}
                                  defaultValue={itemNest.name}
                                  // control={control}
                                  placeholder="Enter a product variant name"
                              />
                          </TableCell>
                          <TableCell align="center" className={classes.priceCell}>
                              <Controller
                                  as={<InputBase multiline />}
                                  name={`menuPage.items[${index}].variantsAlt[${nestedIndex}].price`}
                                  defaultValue={itemNest.price}
                                  placeholder="Enter a price"
                                  // control={control}
                              />
                          </TableCell>
                          <TableCell align="center">
                              <IconButton
                              size="small"
                              onClick={()=> remove(nestedIndex)}
                              >
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                          </TableCell>
                        </TableRow>
                    )
                })}




              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>






        <DialogActions className={classes.dialogActions}>
        <Button 
          align="start"
          onClick={()=>{
            append({
              name: Date.now(),
              price: "",
            });}
          } 
          color="primary">
            Add variant
            {/* <FormattedMessage {...messages.dialogCancel} /> */}
          </Button>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            autoFocus
          >
            OK
            {/* <FormattedMessage {...messages.dialogOrder} /> */}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

AdminProductVariantDisplay.propTypes = {
  item: PropTypes.object,
  id: PropTypes.any,
};

function mapDispatchToProps(dispatch) {
  return {
  };
}

// const withConnect = connect(
//   null,
//   mapDispatchToProps,
// );

export default compose(
  // withConnect,
  memo,
)(AdminProductVariantDisplay);
