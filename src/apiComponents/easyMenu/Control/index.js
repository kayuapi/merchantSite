import React, { useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { validateNoDuplicateCategoryName } from '../utils/businessLogicValidation';
import { makeStyles } from '@material-ui/core/styles';
import { 
  makeSelectElegantMenuCanSaveTabAndPanel,
  makeSelectTabAndPanelSaving,
  makeSelectTabAndPanelError,
  makeSelectCategorySortModeOn,
  makeSelectTabSaving,
  makeSelectTabSavingError,
  makeSelectSavedSuccessfully,
  makeSelectIsCategoryStateAndMenuItemsPanelDirty,
} from './selectors';

import {
  resetSavedSuccessfully,
} from './actions';
import {
  makeSelectCurrentCategory,
  makeSelectCategories,
} from '../CategoryTabs/selectors';

import {
  makeSelectMenuItems,
  makeSelectIsMenuItemsDirty,
} from '../MenuItemsPanel/selectors';

import { 
  saveTabAndPanel, 
  saveTab, 
  toggleCategorySortModeController,
} from './actions';
import { openAlertToContinue } from '../AlertToContinue/actions';
import { updatePrefixUploadedUrlWithUserId, resetDirtiness } from '../MenuItemsPanel/actions';
import { useNotify } from 'react-admin';

import { Auth } from 'aws-amplify';

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
  currentCategory,
  categories,
  menuItems,
  canSaveTabAndPanel,
  tabAndPanelSaving,
  tabAndPanelError,
  isCategorySortModeOn,
  isCategoryTabSaving,
  isCategoryTabSavingFailure,

  menuItemsIsDirty,
  resetDirtiness,

  savedSuccessfully,
  resetSavedSuccessfully,

  saveTabAndPanel,
  toggleCategorySortModeController,

  openAlertToContinue,
  updatePrefixUploadedUrlWithUserId,
}) => {    
  const classes = useStyles();
  const { formState: { dirtyFields}, reset } = useFormContext();
  console.log('dirtyFields', dirtyFields);
  const isDirty = !(Object.keys(dirtyFields).length === 0 && dirtyFields.constructor === Object) || menuItemsIsDirty;
  const notify = useNotify();


  useEffect(() => {
    if (savedSuccessfully) {
      reset({}, {isDirty: false, dirtyFields: false});
    }
  }, [reset, savedSuccessfully]);

  useEffect(() => {
    if (savedSuccessfully) {
      resetDirtiness();
    }
  }, [resetDirtiness, savedSuccessfully]);

  useEffect(() => {
    async function getUserId() {
      const userInfo = await Auth.currentUserInfo();
      return userInfo.id;
    };
    getUserId().then(userId => {
      updatePrefixUploadedUrlWithUserId(userId);
    });
  }, [updatePrefixUploadedUrlWithUserId]);

  return (
    <div className={classes.buttonContainer}>
      <Button
        disabled={ !isDirty || tabAndPanelSaving }
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={() => {
          if (validateNoDuplicateCategoryName(categories)) {
            saveTabAndPanel(categories, currentCategory, menuItems);
          } else {
            notify("pos.notification.issue_saving_new_category_duplicate_category_name", 'warning');
          }
        }}
      >
        {!isDirty && <span>Saved</span>}
        {isDirty && tabAndPanelSaving && <span>Saving...</span>}
        {isDirty && !tabAndPanelSaving && <span>Save page</span>}
      </Button>
      {/* <ToggleButton
        value="check"
        disabled={ tabAndPanelSaving }
        selected={isCategorySortModeOn}
        onChange={() => {
          if (isDirty) {
            openAlertToContinue(toggleCategorySortModeController);
          } else {
            toggleCategorySortModeController();
          }
        }}
      >
        {isCategorySortModeOn && <span>Sort Category Mode: On</span>}
        {isCategorySortModeOn && isCategoryTabSaving && <span>Sort Category Mode: On - Submitting...</span>}
        {!isCategorySortModeOn && <span>Sort Category Mode: Off</span>}
      </ToggleButton> */}
    </div>
  )
};


Control.propTypes = {
  currentCategory: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  menuItems: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  savedSuccessfully: PropTypes.bool,
  resetSavedSuccessfully: PropTypes.func,

  menuItemsIsDirty: PropTypes.bool,

  canSaveTabAndPanel: PropTypes.bool,
  tabAndPanelSaving: PropTypes.bool,
  tabAndPanelError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isCategorySortModeOn: PropTypes.bool,
  isCategoryTabSaving: PropTypes.bool,
  isCategoryTabSavingFailure: PropTypes.bool,


  resetDirtiness: PropTypes.func,

  saveTabAndPanel: PropTypes.func.isRequired,
  saveTab: PropTypes.func.isRequired,
  toggleCategorySortModeController: PropTypes.func.isRequired,

  openAlertToContinue: PropTypes.func,
  updatePrefixUploadedUrlWithUserId: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentCategory: makeSelectCurrentCategory(),
  categories: makeSelectCategories(),
  menuItems: makeSelectMenuItems(),
  menuItemsIsDirty: makeSelectIsMenuItemsDirty(),
  // categoryIsDirty: makeSelectIsCategoryDirty(),
  savedSuccessfully: makeSelectSavedSuccessfully(),

  canSaveTabAndPanel: makeSelectElegantMenuCanSaveTabAndPanel(),
  tabAndPanelSaving: makeSelectTabAndPanelSaving(),
  tabAndPanelError: makeSelectTabAndPanelError(),
  isCategorySortModeOn: makeSelectCategorySortModeOn(),
  isCategoryTabSaving: makeSelectTabSaving(),
  isCategoryTabSavingFailure: makeSelectTabSavingError(),

});

function mapDispatchToProps(dispatch) {
  return {
    saveTabAndPanel: (categories, currentCategory, menuItems) => dispatch(saveTabAndPanel(categories, currentCategory, menuItems)),
    saveTab: () => dispatch(saveTab()),
    toggleCategorySortModeController: () => dispatch(toggleCategorySortModeController()),
    openAlertToContinue: (actionToContinue) => dispatch(openAlertToContinue(actionToContinue)),
    updatePrefixUploadedUrlWithUserId: (userId) => dispatch(updatePrefixUploadedUrlWithUserId(userId)),

    resetSavedSuccessfully: () => dispatch(resetSavedSuccessfully()),
    resetDirtiness: () => dispatch(resetDirtiness()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(Control);
