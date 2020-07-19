/**
 *
 * Product
 *
 */

import React, { memo, useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
import MoveIcon from '@material-ui/icons/OpenWith';
import { openVariantsPopUp } from '../VariantsPopUp/actions';
import { updateMenuItemName, updateMenuItemPrice } from '../MenuItemsPanel/actions';
import { selectMenuItemsVariants } from '../MenuItemsPanel/selectors';
import InputBase from '@material-ui/core/InputBase';
// import { useInjectReducer } from 'utils/injectReducer';
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { store } from '../../../App';

import StorageInput from '../../playground/RHFStorageInput';

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
    width: '80%',
    'align-self': 'center',
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
  // obtain variants from menuItem with the amentioned menuItemId
  const variants = selectMenuItemsVariants(store.getState(), menuItemId);
  store.dispatch(openVariantsPopUp(menuItemId, variants));
};

export function ProductDisplay({
  item: { id, name, price, image, variants=[{id: 'abc', name:'abcname', price:'rm5'}], uiLocation: {x, y} },
  index,
  dispatch,
}) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.root}>

        <CardMedia
          component={StorageInput}
          alt={name}
          menuItemId={id}
          height="100"
          width="100"
          index={index}
          className={classes.cardMedia}
          downloadedImage={image}
          image={image}
          title={name}
        />
        <CardContent className={classes.content}>
          {/* <InputBase
            onBlur={(e)=>{dispatch(updateMenuItemName(id, e.target.value));}}
            defaultValue={name}
            placeholder="Product name (e.g: Apple)"
            classes={{input: classes.productTitleInput}}
            inputProps={{'aria-label': 'put product title' }} 
          />
          <InputBase
            onChange={(e)=>{
              console.log('e', e);
            }}
            defaultValue={price}
            placeholder="Product price (e.g: RM 10)"
            classes={{input: classes.priceInput}}
            inputProps={{'aria-label': 'put a price' }} 
          /> */}
          <Controller
            name={`menuPage.menuItems[${index}].name`}
            defaultValue={name}
            render={({onChange, onBlur, value}) => (
              <InputBase
                onBlur={(e)=>{dispatch(updateMenuItemName(id, e.target.value)); onBlur();}}
                onChange={onChange}
                value={value}
                placeholder="Product name (e.g: Apple)"
                classes={{input: classes.productTitleInput}}
                inputProps={{'aria-label': 'put product title' }} 
              />
            )}
          />
          <Controller
            name={`menuPage.menuItems[${index}].price`}
            defaultValue={price}
            render={({onChange, onBlur, value}) => (
              <InputBase
                onBlur={(e)=>{dispatch(updateMenuItemPrice(id, e.target.value)); onBlur();}}
                onChange={onChange}
                value={value}
                placeholder="Product price (e.g: RM 10)"
                classes={{input: classes.priceInput}}
                inputProps={{ 'aria-label': 'put a price' }}  
              />
            )}
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
                <MoveIcon />
                <div style={{fontSize: 'small', paddingLeft: '5px'}}> DRAG ME</div>
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
  dispatch: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
const withConnect = connect(
  null,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  memo,
)(ProductDisplay);
