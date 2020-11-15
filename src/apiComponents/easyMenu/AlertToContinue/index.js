import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { closeAlertToContinue } from './actions';
import { makeSelectIsAlertToContinueOn, makeSelectActionToDispatch } from './selectors';
import { SWITCH_CATEGORY, DELETE_CATEGORY } from '../CategoryTabs/constants';
import DeleteTabDialogAction from './DeleteTabDialogAction';
import SwitchTabDialogAction from './SwitchTabDialogAction';

const AlertToContinue = ({
  isAlertToContinueOn,
  actionToDispatch,
  closeAlertToContinue,
}) => {  
  return (
    <Dialog
      open={isAlertToContinueOn}
      onClose={closeAlertToContinue}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="alert-dialog-title">
        {actionToDispatch.type === SWITCH_CATEGORY && 
          <span>Are you sure to proceed?</span>}
        {actionToDispatch.type === DELETE_CATEGORY && 
          <span>Are you sure you want to delete "{actionToDispatch.deletingCategory.name}"?</span>}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {actionToDispatch.type === SWITCH_CATEGORY && 
          <span>Changes that you made may not be saved, please press 'SAVE PAGE' first.</span>}
        {actionToDispatch.type === DELETE_CATEGORY && 
          <span>The tab and all menu items in the tabs will be deleted, please press 'Continue' to confirm.</span>}
        </DialogContentText>
      </DialogContent>
      {actionToDispatch.type === DELETE_CATEGORY && 
        <DeleteTabDialogAction />}
        
      {actionToDispatch.type === SWITCH_CATEGORY &&
        <SwitchTabDialogAction />
      }
      
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
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(AlertToContinue);
