import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { closeAlertToContinue } from '../actions';
import { makeSelectActionToDispatch } from '../selectors';
import {
  makeSelectCurrentCategory,
  makeSelectCategories,
} from '../../CategoryTabs/selectors';
import {
  makeSelectMenuItems,
} from '../../MenuItemsPanel/selectors';

import { makeSelectTabAndPanelSaving } from '../../Control/selectors';
import { saveTabAndPanel } from '../../Control/actions';

const SwitchTabDialogAction = ({
  currentCategory,
  categories,
  menuItems,
  actionToDispatch,
  isTabAndPanelSaving,
  closeAlertToContinue,
  saveTabAndPanel,
  dispatch,
}) => {
  return (
    <DialogActions>
      <Button onClick={closeAlertToContinue} color="primary">
        Cancel
      </Button>
      <Button
        disabled={isTabAndPanelSaving}
        onClick={()=> {
          dispatch(actionToDispatch);
        }} 
        color="primary" 
        autoFocus>
          continue without Saving
      </Button>
      <Button
        disabled={isTabAndPanelSaving}
        onClick={()=> {
          saveTabAndPanel(categories, currentCategory, menuItems);
          dispatch(actionToDispatch);
        }} 
        color="primary" 
        autoFocus>
          {isTabAndPanelSaving && <span>Saving...</span>}
          {!isTabAndPanelSaving && <span>continue with Saving</span>}
      </Button>
    </DialogActions>
  )
};

SwitchTabDialogAction.propTypes = {
  currentCategory: PropTypes.object,
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  menuItems: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),

  actionToDispatch: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isTabAndPanelSaving: PropTypes.bool.isRequired,
  closeAlertToContinue: PropTypes.func,
  saveTabAndPanel: PropTypes.func,
  dispatch: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  currentCategory: makeSelectCurrentCategory(),
  categories: makeSelectCategories(),
  menuItems: makeSelectMenuItems(),

  actionToDispatch: makeSelectActionToDispatch(),
  isTabAndPanelSaving: makeSelectTabAndPanelSaving(),
})

function mapDispatchToProps(dispatch) {
  return {
    saveTabAndPanel: (categories, currentCategory, menuItems) => dispatch(saveTabAndPanel(categories, currentCategory, menuItems)),
    closeAlertToContinue: () => dispatch(closeAlertToContinue()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(SwitchTabDialogAction);
