/**
 *
 * Variants Pop Up container that display either ALaCarteVariantsPopUp or ComboVariantsPopUp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useMenuItemsWorkingArea } from '../Context/MenuItemsWorkingArea/useMenuItemsWorkingArea';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import CardMedia from '@material-ui/core/CardMedia';

import TextField from '@material-ui/core/TextField';
import { useTranslate } from 'react-admin';

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: '450px',
    // maxHeight: '500px',
    // height: '600px',
  },
}));


export function DescriptionPopUp({ 
    menuItemId,
    isDescriptionPopUpOpen,
    closeDescriptionPopUp,
  }) {
  const { menuItems, updateMenuItem } = useMenuItemsWorkingArea();
  const classes = useStyles();
  let selectedMenuItem = menuItems.filter(el => el.id === menuItemId)[0];
  const inputRef = React.useRef(null);
  const translate = useTranslate();
  return (
    <Dialog
      open={isDescriptionPopUpOpen}
      PaperProps={{classes: {root: classes.dialog}}}
    >
      <DialogTitle id="alert-dialog-title">
        {selectedMenuItem.name}
      </DialogTitle>

      <DialogContent>
        {selectedMenuItem.image && 
          <>
            <span 
              onClick={() => {updateMenuItem(menuItemId, 'image', '');}}
              style=
                {{background: '#ff0000', 
                  color: '#fff', 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  padding: '5px 10px', 
                  position: 'absolute', 
                  right: '30px', 
                  top: '10px',
                  cursor: 'pointer'
                }}
              >
                {translate(`resources.menus.descriptionPopUp.deleteImage`)}
            </span>
            <CardMedia component="img" image={selectedMenuItem.image} title={selectedMenuItem.name} />
          </>
        }
        {!selectedMenuItem.image && <FastfoodIcon />}
        <br />
        <TextField style={{width: '100%'}} multiline inputRef={inputRef} id={selectedMenuItem.id} label="Description" defaultValue={selectedMenuItem.description} />
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button 
          align="start"
          onClick={()=>{
            closeDescriptionPopUp();
          }}
          color="primary"
        >
          {translate(`resources.menus.descriptionPopUp.cancel`)}
        </Button>
        <Button
          onClick={() => {
            updateMenuItem(menuItemId, 'description', inputRef.current.value);
            closeDescriptionPopUp();
          }}
          variant="contained"
          color="primary"
          autoFocus
        >
          {translate(`resources.menus.descriptionPopUp.ok`)}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DescriptionPopUp.propTypes = {
  menuItemId: PropTypes.string,
  isDescriptionPopUpOpen: PropTypes.bool.isRequired,
  closeDescriptionPopUp: PropTypes.func,
};

export default DescriptionPopUp;
