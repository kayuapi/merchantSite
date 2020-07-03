import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closeAlertToContinue } from './actions';
import { makeSelectIsAlertToContinueOn, makeSelectActionToDispatch, makeSelectCategoryName } from './selectors';
import { makeSelectCurrentCategoryFromId } from '../CategoryTabs/selectors';
import { SWITCH_CATEGORY, DELETE_CATEGORY } from '../CategoryTabs/constants';
import { store } from '../../../App';

const useStyles = makeStyles(theme => ({
  button: {
    'margin': theme.spacing(1),
    
  },
  buttonContainer: {
    'position': 'sticky',
    top: 0,
    left: 'auto',
    right: 0,
    background: 'ghostwhite',
    zIndex: 2
  },
  root: {
    flexGrow: 1,
    width: '100%',
    bottom: theme.spacing(10),
  },
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    // flex: '1 1 auto',
  },
  cardGrid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    height: '100%',
    padding: '0 0 0 0',
  },
  input: {
    width: 'auto',
    color: 'white',
  },
  iconButton: {
    color: 'white',
  }
}
));

const getCategoryNameFromId = (categoryId) => {
  return makeSelectCurrentCategoryFromId(categoryId)(store.getState());
}
const AlertToContinue = ({
  categoryName,
  isAlertToContinueOn,
  actionToDispatch,
  dispatch,
  closeAlertToContinue,
  categoryToDeleteFromId,
}) => {
  const classes = useStyles();
  console.log('AlertToContinue rendering');
  return (
    <Dialog
      open={isAlertToContinueOn}
      onClose={closeAlertToContinue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {actionToDispatch.type === SWITCH_CATEGORY && 
          <span>Are you sure to proceed?</span>}
        {actionToDispatch.type === DELETE_CATEGORY && 
          <span>Are you sure you want to delete "{getCategoryNameFromId(actionToDispatch.categoryId)}"?</span>}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {actionToDispatch.type === SWITCH_CATEGORY && 
          <span>Changes that you made may not be saved, please press 'SAVE PAGE' first.</span>}
        {actionToDispatch.type === DELETE_CATEGORY && 
          <span>The tab and all menu items in the tabs will be deleted, please press 'Continue' to confirm.</span>}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeAlertToContinue} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={()=> {
            dispatch(actionToDispatch); 
            closeAlertToContinue();
          }} 
          color="primary" 
          autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>    
  )
};

AlertToContinue.propTypes = {
  isAlertToContinueOn: PropTypes.bool,
  actionToDispatch: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  closeAlertToContinue: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  isAlertToContinueOn: makeSelectIsAlertToContinueOn(),
  actionToDispatch: makeSelectActionToDispatch(),
})

function mapDispatchToProps(dispatch) {
  return {
    closeAlertToContinue: () => dispatch(closeAlertToContinue()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(AlertToContinue);
