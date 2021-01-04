/**
 *
 * Product
 *
 */

import React, { useState } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import AddIcon from '@material-ui/icons/Add';
import MoveIcon from '@material-ui/icons/OpenWith';
import { openVariantsPopUp } from '../VariantsPopUp/actions';
import InputBase from '@material-ui/core/InputBase';
import { Controller } from "react-hook-form";
import { useMenuItemsWorkingArea } from '../Context/MenuItemsWorkingArea/useMenuItemsWorkingArea';
// import StorageInput from '../../playground/RHFStorageInput';
import StorageInput from '../../playground/SwitchableImagePicker';
import DescriptionPopUp from '../DescriptionPopUp';
import VariantPopUp from '../VariantsPopUp';
import { useTranslate } from 'react-admin';

const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 345,
    marginLeft: '0.5rem',
    marginRight: '1rem',
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
    // width: '80%',
    // 'align-self': 'center',
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
    display: 'block',
    flexDirection: 'column',
    padding: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    marginBottom: theme.spacing(0),
  },
  controls: {
    display: 'block',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    justifyContent: 'center',
    marginBottom: theme.spacing(0),    
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

export const ProductDisplay = ({
  item: { id, name, price, image, status },
  openVariantsPopUp,
  categoryStatus,
})  => {
  const translate = useTranslate();
  const classes = useStyles();
  const { updateMenuItem } = useMenuItemsWorkingArea();
  const [isDescriptionPopUpOpen, setIsDescriptionPopUpOpen] = useState(false);
  const [isVariantPopUpOpen, setIsVariantPopUpOpen] = useState(false);
  return (
    <>
      <Card className={classes.root}>

        <CardMedia
          component={StorageInput}
          alt={name}
          menuItemId={id}
          // height="100"
          // width="100"
          // className={classes.cardMedia}
          downloadedImage={image}
          openDescriptionPopUp={() => {setIsDescriptionPopUpOpen(true)}}
          image={image}
          title={name}
        />
        <div>
          {(categoryStatus === 'DISABLED' || status === 'UNAVAILABLE') && 
            <span style=
              {{background: '#ff0000', 
                color: '#fff', 
                fontSize: '14px', 
                fontWeight: 600, 
                padding: '5px 10px', 
                position: 'absolute', 
                right: '30px', 
                top: '10px' 
              }}>
                {translate('pos.menu.unavailable')}
            </span>
          }
          <CardContent className={classes.content}>
            <Controller
              name={`productDisplay-name-${id}`}
              defaultValue={name}
              render={({onChange, onBlur, value}) => (
                <InputBase
                  onBlur={(e)=>{updateMenuItem(id, 'name', e.target.value); onBlur();}}
                  onChange={onChange}
                  value={value}
                  placeholder="Product name (e.g: Apple)"
                  classes={{input: classes.productTitleInput}}
                  style={{width: '100%'}}
                  multiline
                  inputProps={{'aria-label': 'put product title' }} 
                />
              )}
            />
            <Controller
              name={`productDisplay-price-${id}`}
              defaultValue={price}
              render={({onChange, onBlur, value}) => (
                <InputBase
                  onBlur={(e)=>{updateMenuItem(id, 'price', e.target.value); onBlur();}}
                  onChange={onChange}
                  value={value}
                  placeholder="Product price (e.g: RM 10)"
                  classes={{input: classes.priceInput}}
                  style={{width: '100%'}}
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
                  onClick={() => {setIsVariantPopUpOpen(true)}}
                  edge="start"
                >
                  <AddIcon />
                </IconButton>
              </Grid>
              <Grid item xs={6} className={classes.gridItem}>
                {/* the dragme handler is used in react grid layout to enable dragging */}
                <div className="dragme">
                  <IconButton
                    disabled
                    className={classes.gridItem2}
                    edge="end"
                  >
                    <MoveIcon />
                    <div style={{fontSize: 'small', paddingLeft: '5px'}}>{translate('pos.menu.dragMe')}</div>
                  </IconButton>
                </div>
              </Grid>
            </Grid>
          </CardActions>
        </div>
      </Card>
      <DescriptionPopUp menuItemId={id} isDescriptionPopUpOpen={isDescriptionPopUpOpen} closeDescriptionPopUp={() => setIsDescriptionPopUpOpen(false)} />
      <VariantPopUp menuItemId={id} isVariantPopUpOpen={isVariantPopUpOpen} closeVariantsPopUp={() => setIsVariantPopUpOpen(false)} />
    </>
  );
}

ProductDisplay.propTypes = {
  item: PropTypes.object,
  openVariantsPopUp: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    openVariantsPopUp: (menuItemId) => dispatch(openVariantsPopUp(menuItemId)),
  }
}
const withConnect = connect(
  null,
  mapDispatchToProps,
)

export default compose(
  withConnect,
  // memo,
)(React.memo(ProductDisplay));
