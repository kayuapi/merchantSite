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
import { UNPUBLISH_CATEGORY, DELETE_CATEGORY } from '../CategoryTabs/constants';
import DeleteTabDialogAction from './DeleteTabDialogAction';
import UnpublishTabDialogAction from './UnpublishTabDialogAction';
import { useTranslate } from 'react-admin';

const AlertToContinue = ({
  isAlertToContinueOn,
  actionToDispatch,
  closeAlertToContinue,
}) => {  
  const translate = useTranslate();
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
        {actionToDispatch.type === UNPUBLISH_CATEGORY && 
          <span>{translate('pos.menu.alertToContinue.unpublishTitle')}</span>}
          {/* <span>Are you sure you want to unpublish "{actionToDispatch.unpublishingCategory.name}"?</span>} */}
        {actionToDispatch.type === DELETE_CATEGORY && 
          <span>{translate('pos.menu.alertToContinue.deleteTitle')}</span>}  
          {/* <span>Are you sure you want to delete "{actionToDispatch.deletingCategory.name}"?</span>}   */}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
        {actionToDispatch.type === UNPUBLISH_CATEGORY && 
          <span>{translate('pos.menu.alertToContinue.unpublishContent')}</span>}  
        {actionToDispatch.type === DELETE_CATEGORY && 
          <span>{translate('pos.menu.alertToContinue.deleteContent')}</span>}
        </DialogContentText>
      </DialogContent>
      {actionToDispatch.type === DELETE_CATEGORY && 
        <DeleteTabDialogAction />}
      {actionToDispatch.type === UNPUBLISH_CATEGORY && 
        <UnpublishTabDialogAction />}              
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
