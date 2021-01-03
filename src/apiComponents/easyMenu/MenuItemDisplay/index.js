import React from 'react';
import PropTypes from 'prop-types';
import ProductDisplay from '../ProductDisplay';
import { useMenuItemsWorkingArea } from '../Context/MenuItemsWorkingArea/useMenuItemsWorkingArea';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  menuItem: {
    justifyContent: 'flex-end',
  }
}));

export const MenuItemDisplay = ({el, categoryStatus}) => {
  const classes = useStyles();
  const { updateMenuItem, deleteMenuItem } = useMenuItemsWorkingArea();
  const removeStyle = {
    position: "absolute",
    right: "0px",
    top: 0,
    cursor: "pointer",
    fontSize: "small",
  };
  const optionStyle = {
    position: "absolute",
    right: "0px",
    top: 25,
    cursor: "pointer",
    fontSize: "large",
  };
  const availabilityStyle = {
    position: "absolute",
    right: "0px",
    top: 50,
    cursor: "pointer",
    fontSize: "small",
  }
  const [open, setOpen] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleSetAnchorEl = (event) => {
    setAnchorEl(prev => event.currentTarget);
    setOpen(true);
  };

  const handleMenuItemTypeChosen = (event, menuItemId, type) => {
    updateMenuItem(menuItemId, 'type', type);
    setAnchorEl(prev => null);
    setOpen(false);
  };

  const handleClose = (event) => {
    setOpen(false);
    setAnchorEl(prev => null);
  };
  return (
    <>
      <hr style={{margin: 0, width: '1000px', marginLeft: '-350px', display: 'none', borderStyle: 'ridge'}} />
      <ProductDisplay 
        key={el.id} 
        id={el.id} 
        item={el}
        categoryStatus={categoryStatus}
      />
      <span
        role="img"
        aria-label="remove"
        className="remove"
        style={removeStyle}
        onClick={() => {
          deleteMenuItem(el.id);
        }}
      >❌
      </span>
      <span
        className="options"
        style={optionStyle}
        onClick={e => handleSetAnchorEl(e)}
      >▼
      </span>
      {(!el.status || el.status === 'AVAILABLE') && (
        <span
          role="img"
          aria-label="statusAvailable"
          className="availability"
          style={availabilityStyle}
          onClick={e => updateMenuItem(el.id, "status", "UNAVAILABLE")}
        >
          🛒
        </span>      
      )}
      {el.status === 'UNAVAILABLE' && (
        <span
          role="img"
          aria-label="statusUnavailable"
          className="availability"
          style={availabilityStyle}
          onClick={e => updateMenuItem(el.id, "status", "AVAILABLE")}
        >
          🛒⃠
        </span>      
      )}
      <hr style={{margin: 0, width: '1000px', marginLeft: '-350px', display: 'none', borderStyle: 'ridge'}} />
      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
      >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom"
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                
                autoFocusItem={open}
                id="menu-list-grow"
                // onKeyDown={handleListKeyDown}
              >
                <MenuItem onClick={e => handleMenuItemTypeChosen(e, el.id, 'A_LA_CARTE')} classes={{root: classes.menuItem}}>
                  {el.type !== 'COMBO' &&<span>✔</span>}A la carte
                </MenuItem>
                <MenuItem onClick={e => handleMenuItemTypeChosen(e, el.id, 'COMBO')} classes={{root: classes.menuItem}}>
                  {el.type === 'COMBO' &&<span>✔</span>}Combo
                </MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
      </Popper>

    </>
  );
}

MenuItemDisplay.propTypes = {
  el: PropTypes.object,
  categoryStatus: PropTypes.string,
  handleSetAnchorEl: PropTypes.func,
};

export default MenuItemDisplay;