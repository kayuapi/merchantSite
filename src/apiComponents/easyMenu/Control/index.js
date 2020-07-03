import React, { useState, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles } from '@material-ui/core/styles';
import { 
  makeSelectElegantMenuCanSaveTabAndPanel,
  makeSelectTabAndPanelSaving,
  makeSelectTabAndPanelError,
  makeSelectCategorySortModeOn,
  makeSelectTabSaving,
  makeSelectTabSavingError,
} from './selectors';
import { 
  saveTabAndPanel, 
  saveTab, 
  toggleCategorySortModeController,
} from './actions';
import { openAlertToContinue } from '../AlertToContinue/actions';

const useStyles = makeStyles(theme => ({
  buttonContainer: {
    'position': 'sticky',
    top: 0,
    left: 'auto',
    right: 0,
    background: 'ghostwhite',
    zIndex: 2
  },
}
));

const Control = ({
  canSaveTabAndPanel,
  tabAndPanelSaving,
  tabAndPanelError,
  isCategorySortModeOn,
  isCategoryTabSaving,
  isCategoryTabSavingFailure,

  saveTabAndPanel,
  saveTab,
  toggleCategorySortModeController,

  openAlertToContinue,
}) => {    
  const classes = useStyles();
  console.log('control rendering');
  return (
    <div className={classes.buttonContainer}>
      <Button
        disabled={ !canSaveTabAndPanel }
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
      >
        {tabAndPanelSaving && <span>Saving...</span>}
        {!tabAndPanelSaving && <span>Save page</span>}
      </Button>
      <ToggleButton
        value="check"
        selected={isCategorySortModeOn}
        onChange={() => {
          if (canSaveTabAndPanel) {
            openAlertToContinue(toggleCategorySortModeController);
          } else {
            toggleCategorySortModeController();
          }
        }}
      >
        {isCategorySortModeOn && <span>Sort Category Mode: On</span>}
        {isCategorySortModeOn && isCategoryTabSaving && <span>Sort Category Mode: On - Submitting...</span>}
        {!isCategorySortModeOn && <span>Sort Category Mode: Off</span>}
      </ToggleButton>
    </div>
  )
};


Control.propTypes = {
  canSaveTabAndPanel: PropTypes.bool,
  tabAndPanelSaving: PropTypes.bool,
  tabAndPanelError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isCategorySortModeOn: PropTypes.bool,
  isCategoryTabSaving: PropTypes.bool,
  isCategoryTabSavingFailure: PropTypes.bool,

  saveTabAndPanel: PropTypes.func.isRequired,
  saveTab: PropTypes.func.isRequired,
  toggleCategorySortModeController: PropTypes.func.isRequired,

  openAlertToContinue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  canSaveTabAndPanel: makeSelectElegantMenuCanSaveTabAndPanel(),
  tabAndPanelSaving: makeSelectTabAndPanelSaving(),
  tabAndPanelError: makeSelectTabAndPanelError(),
  isCategorySortModeOn: makeSelectCategorySortModeOn(),
  isCategoryTabSaving: makeSelectTabSaving(),
  isCategoryTabSavingFailure: makeSelectTabSavingError(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveTabAndPanel: () => dispatch(saveTabAndPanel()),
    saveTab: () => dispatch(saveTab()),
    toggleCategorySortModeController: () => dispatch(toggleCategorySortModeController()),
    openAlertToContinue: (actionToContinue) => dispatch(openAlertToContinue(actionToContinue)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(Control);
