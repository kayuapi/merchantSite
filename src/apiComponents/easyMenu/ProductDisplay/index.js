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
import { openVariantsPopUp } from '../VariantsPopUp/actions';
import { selectMenuItemsVariants } from '../MenuItemsPanel/selectors';
import InputBase from '@material-ui/core/InputBase';
// import { useInjectReducer } from 'utils/injectReducer';
import { Controller, useFormContext, useFieldArray } from "react-hook-form";
import { store } from '../../../App';

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

const handlePlusMinusChange = (menuItemId) => {
  console.log('MENUITEMID IS', menuItemId);
  // obtain variants from menuItem with the amentioned menuItemId
  const variants = selectMenuItemsVariants(store.getState(), menuItemId);
  console.log('variants are', variants);
  store.dispatch(openVariantsPopUp(menuItemId, variants));
};

export function ProductDisplay({
  id,
  item: { name, price, image, variants, uiLocation },
  index,
  setValue
  // control,
  // register,
}) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>
        {image ? (
          <CardMedia
            component="img"
            alt={name}
            id={id}
            height="100"
            width="100"
            className={classes.cardMedia}
            image={image}
            title={name}
          />): (
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
            // writeValue={writeValue}
          />)}
        <CardContent className={classes.content}>
          <Controller
            as={<InputBase />}
            name={`menuPage.items[${index}].name`}
            defaultValue={name}
            placeholder="Enter a product name"
            classes={{input: classes.productTitleInput}}
            inputProps={{ 'aria-label': 'put product title' }}
          />
          <Controller
            as={<InputBase />}
            name={`menuPage.items[${index}].price`}
            defaultValue={price}
            placeholder="Enter a product price"
            classes={{input: classes.priceInput}}
            inputProps={{ 'aria-label': 'put a price' }}
          />
        </CardContent>

        <CardActions className={classes.controls}>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                disabled
                variant="outlined"
                placeholder="0"
                fullWidth
                type="number"
                InputProps={{classes: { input: classes.resize }}}
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <IconButton
                className={classes.gridItem2}
                onClick={() => {handlePlusMinusChange(id)}}
                edge="start"
              >
                <AddIcon />
              </IconButton>
            </Grid>
            <Grid item xs={6} className={classes.gridItem}>
              <IconButton
                disabled
                className={classes.gridItem2}
                edge="end"
              >
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
}

ProductDisplay.propTypes = {
  item: PropTypes.object,
  id: PropTypes.any,
};

export default compose(
  memo,
)(ProductDisplay);
