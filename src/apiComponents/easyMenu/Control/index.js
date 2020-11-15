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
  makeSelectTabAndPanelSaving,
  makeSelectTabAndPanelError,
  makeSelectCategorySortModeOn,
  makeSelectTabSaving,
  makeSelectTabSavingError,
  makeSelectSavedSuccessfully,
} from './selectors';
import {
  makeSelectDeletedSuccessfully,
} from '../CategoryTabs/selectors';
import _ from 'lodash';
import {
  makeSelectCurrentCategory,
  makeSelectCategories,
  makeSelectCategoriesLoading,
} from '../CategoryTabs/selectors';

import {
  makeSelectMenuItems,
  makeSelectMenuItemsLoading,
} from '../MenuItemsPanel/selectors';

import { 
  saveTabAndPanel, 
  saveTab, 
  toggleCategorySortModeController,
  modifyTabAndPanelDirtiness,
} from './actions';
import { resetDeletedSuccessfully } from '../CategoryTabs/actions';
import { openAlertToContinue } from '../AlertToContinue/actions';
import { updateUserId } from '../MenuItemsPanel/actions';
import { useNotify } from 'react-admin';
import { useMenuItemsWorkingArea } from '../Context/MenuItemsWorkingArea/useMenuItemsWorkingArea';
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
  tabAndPanelSaving,
  tabAndPanelError,
  isCategorySortModeOn,
  isCategoryTabSaving,
  isCategoryTabSavingFailure,
  isCategoryDeletedSuccessfully,
  isCategoriesLoading,
  isMenuItemsLoading,
  resetDeletedSuccessfully,
  savedSuccessfully,

  saveTabAndPanel,
  toggleCategorySortModeController,

  openAlertToContinue,
  updateUserId,
  modifyTabAndPanelDirtiness,
}) => {    
  const classes = useStyles();
  const notify = useNotify();
  const { formState: { dirtyFields}, reset } = useFormContext();
  // console.log('dirtyFields', dirtyFields);
  const { menuItems: nextMenuItems } = useMenuItemsWorkingArea();

  // logic to check dirtiness
  let isCategoryDirty = false;
  let isMenuItemsDirty = false;

  // false menuItems indicate an empty menuItems (menuItems has initial state as bolean false, while nextMenuItems has that as [])
  if (menuItems) {
    isMenuItemsDirty = !(_.isEqual(menuItems, nextMenuItems));
  } else {
    isMenuItemsDirty = !(_.isEqual([], nextMenuItems));
  }
  
  if (!(Object.keys(dirtyFields).length === 0 && dirtyFields.constructor === Object)) {
    if (dirtyFields.menuPage && dirtyFields.menuPage.categories) {
      if (dirtyFields.menuPage.categories.length !== 0) {
        isCategoryDirty = true;
      }
    }
  }
  const isDirty = isCategoryDirty || isMenuItemsDirty;

  // the effect makes the dirtiness of the tab and panel available to other componets through redux
  useEffect(()=> {
    modifyTabAndPanelDirtiness(isDirty);
  }, [isDirty, modifyTabAndPanelDirtiness]);

  // the effect reset the dirtiness of category upon saving successfully
  useEffect(() => {
    if (savedSuccessfully) {
      reset({}, {isDirty: false, dirtyFields: false});
    }
  }, [reset, savedSuccessfully]);

  // the effect reset the dirtiness of category upon deleting any of the other one category successfully
  useEffect(() => {
    if (isCategoryDeletedSuccessfully) {
      reset({}, {isDirty: false, dirtyFields: false});
      resetDeletedSuccessfully();
    }
  }, [reset, isCategoryDeletedSuccessfully, resetDeletedSuccessfully]);

  useEffect(() => {
    async function getUserId() {
      const userInfo = await Auth.currentUserInfo();
      return userInfo.id;
    };
    getUserId().then(userId => {
      updateUserId(userId);
    });
  }, [updateUserId]);

  return (
    <div className={classes.buttonContainer}>
      <Button
        disabled={ !isDirty || tabAndPanelSaving || isCategoriesLoading || isMenuItemsLoading }
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={() => {
          if (validateNoDuplicateCategoryName(categories)) {
            // saveTabAndPanel(categories, currentCategory, menuItems);
            saveTabAndPanel(categories, currentCategory, nextMenuItems);
          } else {
            notify("pos.notification.issue_saving_new_category_duplicate_category_name", 'warning');
          }
        }}
      >
        {!isDirty && <span>Saved</span>}
        {isDirty && tabAndPanelSaving && <span>Saving...</span>}
        {isDirty && !tabAndPanelSaving && <span>Save page</span>}
      </Button>
      <ToggleButton
        value="check"
        disabled={ isDirty || tabAndPanelSaving }
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
      </ToggleButton>
    </div>
  )
};


Control.propTypes = {
  currentCategory: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  menuItems: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  isCategoriesLoading: PropTypes.bool,
  isMenuItemsLoading: PropTypes.bool,
  savedSuccessfully: PropTypes.bool,

  tabAndPanelSaving: PropTypes.bool,
  tabAndPanelError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isCategorySortModeOn: PropTypes.bool,
  isCategoryTabSaving: PropTypes.bool,
  isCategoryTabSavingFailure: PropTypes.bool,
  isCategoryDeletedSuccessfully: PropTypes.bool,
  saveTabAndPanel: PropTypes.func.isRequired,
  saveTab: PropTypes.func.isRequired,
  toggleCategorySortModeController: PropTypes.func.isRequired,

  openAlertToContinue: PropTypes.func,
  updateUserId: PropTypes.func,
  modifyTabAndPanelDirtiness: PropTypes.func,
  resetDeletedSuccessfully: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  currentCategory: makeSelectCurrentCategory(),
  categories: makeSelectCategories(),
  menuItems: makeSelectMenuItems(),
  isCategoriesLoading: makeSelectCategoriesLoading(),
  isMenuItemsLoading: makeSelectMenuItemsLoading(),
  savedSuccessfully: makeSelectSavedSuccessfully(),
  tabAndPanelSaving: makeSelectTabAndPanelSaving(),
  tabAndPanelError: makeSelectTabAndPanelError(),
  isCategorySortModeOn: makeSelectCategorySortModeOn(),
  isCategoryTabSaving: makeSelectTabSaving(),
  isCategoryTabSavingFailure: makeSelectTabSavingError(),
  isCategoryDeletedSuccessfully: makeSelectDeletedSuccessfully(),
});

function mapDispatchToProps(dispatch) {
  return {
    saveTabAndPanel: (categories, currentCategory, menuItems) => dispatch(saveTabAndPanel(categories, currentCategory, menuItems)),
    saveTab: () => dispatch(saveTab()),
    toggleCategorySortModeController: () => dispatch(toggleCategorySortModeController()),
    openAlertToContinue: (actionToContinue) => dispatch(openAlertToContinue(actionToContinue)),
    updateUserId: (userId) => dispatch(updateUserId(userId)),
    modifyTabAndPanelDirtiness: (status) => dispatch(modifyTabAndPanelDirtiness(status)),
    resetDeletedSuccessfully: () => dispatch(resetDeletedSuccessfully()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(Control);
