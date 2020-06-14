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
import Card from '@material-ui/core/Card';
// import FastfoodIcon from '@material-ui/icons/Fastfood';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import InputBase from '@material-ui/core/InputBase';
// import { useInjectReducer } from 'utils/injectReducer';
import { Controller, useFormContext } from "react-hook-form";
import AdminProductVariantDisplay from '../AdminProductVariantDisplay';

import StorageInput from '../../playground/StorageInput';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    height: '100%',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  cardMedia: {
    // paddingTop: '56.25%', // 16:9
    // width: 'auto',
    // height: 'auto',
    'object-fit': 'contain',
  },
  textField: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  resize: {
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    flex: '1 0 auto',
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: 'center',
  },
  gridItem: {
    display: 'inline-grid',
  },
  gridItem2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 0 0 0',
  },
  icon: {
    marginTop: '76px',
  },
  productTitle: {
    fontStyle: theme.typography.body1.fontStyle,
    fontVariant: theme.typography.body1.fontVariant,
    fontWeight: theme.typography.body1.fontWeight,
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.body1.fontFamily,
  },
  priceInput: {
    fontStyle: theme.typography.body2.fontStyle,
    fontVariant: theme.typography.body2.fontVariant,
    fontWeight: 'bold',
    fontSize: theme.typography.body2.fontSize,
    fontFamily: theme.typography.body2.fontFamily,
    color: theme.palette.text.secondary,
  },
}));

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open, title, image } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <CardMedia component="img" image={image} title={title} />
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
};

export function AdminProductDisplay({
  id,
  item: { name, price, image, variants, uiLocation },
  index,
  // control,
  register,

}) {
  console.log('###index is ', index);
  console.log('###register is ', register);
  console.log('###uilocation is', uiLocation);
  const inCartProductQty = 0;

  // useInjectReducer({ key: 'product', reducer });
  const classes = useStyles();

  const [value, setValue] = useState(inCartProductQty);

  const [isVariantOpen, setVariantOpen] = React.useState(false);

  const handlePlusMinusChange = () => {
    setVariantOpen(true);
  };

  const { setValue: writeValue } = useFormContext();
  console.log('YELLING DATA GRID', uiLocation);
  return (
    <>
      {/* <Grid item xs={6} sm={6} md={4}> */}
        <Card className={classes.root}>
          {image ? (
            <>
            <input hidden name={`menuPage.items[${index}].uiLocation.x`} type="number" readOnly value={uiLocation.x} ref={register()} />
            <input hidden name={`menuPage.items[${index}].uiLocation.y`} type="number" readOnly value={uiLocation.y} ref={register()} />
            <input hidden name={`menuPage.items[${index}].uiLocation.w`} type="number" readOnly value={uiLocation.w} ref={register()} />
            <input hidden name={`menuPage.items[${index}].uiLocation.h`} type="number" readOnly value={uiLocation.h} ref={register()} />

            <input hidden name={`menuPage.items[${index}].image`} readOnly value={image} ref={register()} />
              <CardMedia
                component="img"
                alt={name}
                id={id}
                height="100"
                width="100"
                className={classes.cardMedia}
                image={image}
                title={name}
              />
              <CardContent className={classes.content}>
                <Controller
                  as={<InputBase />}
                  name={`menuPage.items[${index}].name`}
                  defaultValue={name}
                  // control={control}
                  placeholder="Enter a product name"
                  classes={{input: classes.productTitleInput}}
                  inputProps={{ 'aria-label': 'put product title' }}
                />
                <Controller
                  as={<InputBase />}
                  name={`menuPage.items[${index}].price`}
                  defaultValue={price}
                  // control={control}
                  placeholder="Enter a product price"
                  classes={{input: classes.priceInput}}
                  inputProps={{ 'aria-label': 'put a price' }}
                />
              </CardContent>
            </>
          ): (
            <>
              <input hidden name={`menuPage.items[${index}].uiLocation.x`} type="number" readOnly value={uiLocation.x} ref={register()} />
              <input hidden name={`menuPage.items[${index}].uiLocation.y`} type="number" readOnly value={uiLocation.y} ref={register()} />
              <input hidden name={`menuPage.items[${index}].uiLocation.w`} type="number" readOnly value={uiLocation.w} ref={register()} />
              <input hidden name={`menuPage.items[${index}].uiLocation.h`} type="number" readOnly value={uiLocation.h} ref={register()} />

              <input hidden name={`menuPage.items[${index}].image`} ref={register()} />
              <CardMedia
                component={StorageInput}
                alt={name}
                id={id}
                height="100"
                width="100"
                index={index}
                className={classes.cardMedia}
                image={image}
                title={name}
                writeValue={writeValue}
              />
              <CardContent className={classes.content}>
                <Controller
                  as={<InputBase />}
                  name={`menuPage.items[${index}].name`}
                  defaultValue={name}
                  // control={control}
                  placeholder="Enter a product name"
                  classes={{input: classes.productTitleInput}}
                  inputProps={{ 'aria-label': 'put product title' }}
                />
                <Controller
                  as={<InputBase />}
                  name={`menuPage.items[${index}].price`}
                  defaultValue={price}
                  // control={control}
                  placeholder="Enter a product price"
                  classes={{input: classes.priceInput}}
                  inputProps={{ 'aria-label': 'put a price' }}
                />
              </CardContent>
            </>
          )}
          <CardActions className={classes.controls}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  disabled
                  // label={<FormattedMessage {...messages.orderQuantity} />}
                  variant="outlined"
                  placeholder="0"
                  autoComplete="off"
                  fullWidth
                  type="number"
                  value={value}
                  // defaultValue={Number(quantity)}
                  inputProps={{
                    'data-label': name,
                    pattern: '[0-9]*',
                    inputMode: 'numeric',
                  }}
                  InputProps={{classes: { input: classes.resize }}}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
                <IconButton
                  className={classes.gridItem2}
                  aria-label="toggle password visibility"
                  onClick={handlePlusMinusChange}
                  // onMouseDown={handleMouseDownPassword}
                  edge="start"
                >
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
                <IconButton
                  disabled={inCartProductQty === 0}
                  className={classes.gridItem2}
                  aria-label="toggle password visibility"
                  onClick={handlePlusMinusChange}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  <RemoveIcon />
                </IconButton>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      {/* </Grid> */}

      <AdminProductVariantDisplay 
        // control={control} 
        index={index} register={register} isOpen={isVariantOpen} handleClose={()=>setVariantOpen(false)}></AdminProductVariantDisplay>

{/* 
      <SimpleDialog
        open={open}
        onClose={handleClose}
        title={title}
        image={image}
      /> */}
    </>
  );
}

AdminProductDisplay.propTypes = {
  item: PropTypes.object,
  // addProduct: PropTypes.func,
  // removeProduct: PropTypes.func,
  id: PropTypes.any,
};

function mapDispatchToProps(dispatch) {
  return {
    // addProduct: item => dispatch(addProductToCart(item)),
    // removeProduct: item => dispatch(removeProductFromCart(item)),
  };
}

// const withConnect = connect(
//   null,
//   mapDispatchToProps,
// );

export default compose(
  // withConnect,
  memo,
)(AdminProductDisplay);
