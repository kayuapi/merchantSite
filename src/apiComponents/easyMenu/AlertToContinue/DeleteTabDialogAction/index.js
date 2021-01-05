import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { closeAlertToContinue } from '../actions';
import { makeSelectActionToDispatch } from '../selectors';
import { makeSelectCategoryDeleting } from '../../CategoryTabs/selectors';
import { useTranslate } from 'react-admin';

const DeleteTabDialogAction = ({
  actionToDispatch,
  isTabDeleting,
  closeAlertToContinue,
  dispatch,
}) => {
  const translate = useTranslate();
  return (
    <DialogActions>
      <Button onClick={closeAlertToContinue} color="primary">
        {translate('ra.action.cancel')}
      </Button>
      <Button
        disabled={isTabDeleting}
        onClick={()=> {
          dispatch(actionToDispatch);
        }} 
        color="primary" 
        autoFocus>
        {isTabDeleting && <span>{translate('pos.menu.alertToContinue.deleteInProgressAction')}</span>}
        {!isTabDeleting && <span>{translate('pos.menu.alertToContinue.deleteContinueAction')}</span>}
      </Button>
    </DialogActions>
  )
};

DeleteTabDialogAction.propTypes = {
  actionToDispatch: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isTabDeleting: PropTypes.bool.isRequired,
  closeAlertToContinue: PropTypes.func,
  dispatch: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  actionToDispatch: makeSelectActionToDispatch(),
  isTabDeleting: makeSelectCategoryDeleting(),
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

export default withConnect(DeleteTabDialogAction);
