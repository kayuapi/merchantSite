import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { closeAlertToContinue } from '../actions';
import { makeSelectActionToDispatch } from '../selectors';
import { makeSelectCategoryUnpublishing } from '../../CategoryTabs/selectors';


const UnpublishTabDialogAction = ({
  actionToDispatch,
  isTabUnpublishing,
  closeAlertToContinue,
  dispatch,
}) => {
  return (
    <DialogActions>
      <Button onClick={closeAlertToContinue} color="primary">
        Cancel
      </Button>
      <Button
        disabled={isTabUnpublishing}
        onClick={()=> {
          dispatch(actionToDispatch);
        }} 
        color="primary" 
        autoFocus>
        {isTabUnpublishing && <span>Unpublishing ...</span>}
        {!isTabUnpublishing && <span>Continue to unpublish</span>}
      </Button>
    </DialogActions>
  )
};

UnpublishTabDialogAction.propTypes = {
  actionToDispatch: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isTabUnpublishing: PropTypes.bool.isRequired,
  closeAlertToContinue: PropTypes.func,
  dispatch: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  actionToDispatch: makeSelectActionToDispatch(),
  isTabUnpublishing: makeSelectCategoryUnpublishing(),
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

export default withConnect(UnpublishTabDialogAction);
