import React, { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslate } from 'react-admin';
import { 
  makeSelectTabAndPanelSaving,
  makeSelectTabAndPanelError,
  makeSelectCategorySortModeOn,
  makeSelectTabSaving,
  makeSelectTabSavingError,
  makeSelectSavedSuccessfully,
} from './selectors';
import isEqual from 'lodash/isEqual';
import {
  makeSelectCurrentCategory,
  makeSelectCategories,
  makeSelectCategoriesLoading,
  makeSelectDeletedSuccessfully,
  makeSelectUnpublishedSuccessfully
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
import { resetDeletedSuccessfully, resetUnpublishedSuccessfully } from '../CategoryTabs/actions';
import { openAlertToContinue } from '../AlertToContinue/actions';
import { updateUserId } from '../MenuItemsPanel/actions';
import { useCurrentCategoryWorkingArea } from '../Context/CurrentCategoryWorkingArea/useCurrentCategoryWorkingArea';
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
  isCategoryUnpublishedSuccessfully,
  isCategoriesLoading,
  isMenuItemsLoading,
  resetDeletedSuccessfully,
  resetUnpublishedSuccessfully,
  savedSuccessfully,

  saveTabAndPanel,
  toggleCategorySortModeController,

  openAlertToContinue,
  updateUserId,
  modifyTabAndPanelDirtiness,
}) => {    
  const translate = useTranslate();
  const classes = useStyles();
  // const { formState: { dirtyFields}, reset } = useFormContext();
  // console.log('dirtyFields', dirtyFields);
  const { isCurrentCategoryDirty, currentCategory: nextCurrentCategory, loadCurrentCategory } = useCurrentCategoryWorkingArea(currentCategory);
  const { menuItems: nextMenuItems } = useMenuItemsWorkingArea();

  // logic to check dirtiness
  let isCategoryDirty = false;
  let isMenuItemsDirty = false;
  // console.log('isCurrentCategoryDirty', isCurrentCategoryDirty);
  isCategoryDirty = isCurrentCategoryDirty;


  useEffect(() => {
    if (isCategorySortModeOn && nextCurrentCategory) {
      loadCurrentCategory(false);
    }
  }, [isCategorySortModeOn, loadCurrentCategory, nextCurrentCategory]);

  // let isCategoryDirty2 = React.useRef();
  // useEffect(() => {
  //   isCategoryDirty2.current = !(isEqual(currentCategory, nextCurrentCategory));
  //   console.log('currentCategory', currentCategory);
  //   console.log('nextCurrentCategory', nextCurrentCategory);
  // }, [currentCategory, nextCurrentCategory]);

  // false menuItems indicate an empty menuItems (menuItems has initial state as bolean false, while nextMenuItems has that as [])
  if (currentCategory) {
    if (menuItems) {
      isMenuItemsDirty = !(isEqual(menuItems, nextMenuItems));
    } else {
      isMenuItemsDirty = !(isEqual([], nextMenuItems));
    }
  } else {
    isMenuItemsDirty = false;
  }

  
  const isDirty = isCategoryDirty || isMenuItemsDirty;

  // the effect makes the dirtiness of the tab and panel available to other componets through redux
  useEffect(()=> {
    modifyTabAndPanelDirtiness(isDirty);
  }, [isDirty, modifyTabAndPanelDirtiness]);

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
        disabled={ isCategorySortModeOn || !isDirty || tabAndPanelSaving || isCategoriesLoading || isMenuItemsLoading }
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={() => {
          saveTabAndPanel(categories, nextCurrentCategory, nextMenuItems);
        }}
      >
        {!isDirty && <span>{translate('pos.action.saved')}</span>}
        {isDirty && tabAndPanelSaving && <span>{translate('pos.action.saving')}</span>}
        {isDirty && !tabAndPanelSaving && <span>{translate('pos.action.savePage')}</span>}
      </Button>
      <ToggleButton
        value="check"
        disabled={ isDirty || tabAndPanelSaving || isCategoriesLoading || isMenuItemsLoading }
        selected={isCategorySortModeOn}
        onChange={() => {
          if (isDirty) {
            openAlertToContinue(toggleCategorySortModeController);
          } else {
            toggleCategorySortModeController();
          }
        }}
      >
        {isCategorySortModeOn && <span>{translate('pos.menu.categoryModeOn')}</span>}
        {isCategorySortModeOn && isCategoryTabSaving && <span>{translate('pos.menu.categoryModeSaving')}</span>}
        {!isCategorySortModeOn && <span>{translate('pos.menu.categoryModeOff')}</span>}
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
  isCategoryUnpublishedSuccessfully: PropTypes.bool,
  saveTabAndPanel: PropTypes.func.isRequired,
  saveTab: PropTypes.func.isRequired,
  toggleCategorySortModeController: PropTypes.func.isRequired,

  openAlertToContinue: PropTypes.func,
  updateUserId: PropTypes.func,
  modifyTabAndPanelDirtiness: PropTypes.func,
  resetDeletedSuccessfully: PropTypes.func,
  resetUnpublishedSuccessfully: PropTypes.func,
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
  isCategoryUnpublishedSuccessfully: makeSelectUnpublishedSuccessfully(),
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
    resetUnpublishedSuccessfully: () => dispatch(resetUnpublishedSuccessfully()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(Control);
