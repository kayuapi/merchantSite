import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import { closeAlertToContinue } from '../actions';
import { updateCategoryName } from '../../CategoryTabs/actions';
import { makeSelectActionToDispatch } from '../selectors';
import { useFormContext } from 'react-hook-form';
import {
  makeSelectCurrentCategory,
  makeSelectCategories,
} from '../../CategoryTabs/selectors';
import {
  makeSelectMenuItems,
} from '../../MenuItemsPanel/selectors';

import { makeSelectTabAndPanelSaving, makeSelectTabAndPanelSavedSuccessfully } from '../../Control/selectors';
import { saveTabAndPanel, saveTabAndPanelThenSwitchTab } from '../../Control/actions';

const SwitchTabDialogAction = ({
  revertChangesToTab,
  currentCategory,
  categories,
  menuItems,
  actionToDispatch,
  saveTabAndPanelThenSwitchTab,
  isTabAndPanelSaving,
  isTabAndPanelSaved,
  closeAlertToContinue,
  saveTabAndPanel,
  dispatch,
}) => {
  const { reset, getValues } = useFormContext();
  return (
    <DialogActions>
      <Button
        disabled={isTabAndPanelSaving}
        onClick={()=> {
          if (!currentCategory._name) {
            revertChangesToTab(currentCategory.id, false);
          } else {
            revertChangesToTab(currentCategory.id, currentCategory._name);
          }
          dispatch(actionToDispatch);
          // const categoryIndex = categories.findIndex(category => category.id ===currentCategory.id);
          // let categoriesInForm = getValues()['menuPage']['categories'];
          // categoriesInForm[categoryIndex] = currentCategory._name ? currentCategory._name : '';
          // reset({
          //   ...getValues(),
          //   menuPage: {
          //     ...getValues()['menuPage'],
          //     categories: categoriesInForm,
          //   }
          // });
        }} 
        color="primary" 
        autoFocus>
          {!isTabAndPanelSaved && !isTabAndPanelSaving && <span>continue without Saving</span>}
      </Button>
      <Button
        disabled={isTabAndPanelSaving || isTabAndPanelSaved}
        onClick={()=> {
          const currentCategoryNewCopy = {...currentCategory};
          // console.log('equal?', currentCategoryNewCopy == currentCategory);
          const categoriesNewCopy = [...categories];
          const menuItemsNewCopy = [...menuItems];
          // console.log('onclick currentCategory', currentCategoryNewCopy);
          console.log('actionToDispatch', actionToDispatch);
          saveTabAndPanelThenSwitchTab(categoriesNewCopy, currentCategoryNewCopy, menuItemsNewCopy, actionToDispatch.category);
          // saveTabAndPanel(categoriesNewCopy, currentCategoryNewCopy, menuItemsNewCopy);
          // dispatch(actionToDispatch);
        }} 
        color="primary" 
        autoFocus>
          {isTabAndPanelSaved && <span>Saved</span>}
          {!isTabAndPanelSaved && isTabAndPanelSaving && <span>Saving...</span>}
          {!isTabAndPanelSaved && !isTabAndPanelSaving && <span>continue with Saving</span>}
      </Button>
    </DialogActions>
  )
};

SwitchTabDialogAction.propTypes = {
  currentCategory: PropTypes.object,
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  menuItems: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),

  revertChangesToTab: PropTypes.func,
  actionToDispatch: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  isTabAndPanelSaving: PropTypes.bool.isRequired,
  isTabAndPanelSaved: PropTypes.bool.isRequired,
  closeAlertToContinue: PropTypes.func,
  saveTabAndPanel: PropTypes.func,
  saveTabAndPanelThenSwitchTab: PropTypes.func,
  dispatch: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  currentCategory: makeSelectCurrentCategory(),
  categories: makeSelectCategories(),
  menuItems: makeSelectMenuItems(),

  actionToDispatch: makeSelectActionToDispatch(),
  isTabAndPanelSaving: makeSelectTabAndPanelSaving(),
  isTabAndPanelSaved: makeSelectTabAndPanelSavedSuccessfully(),
})

function mapDispatchToProps(dispatch) {
  return {
    revertChangesToTab: (categoryId, categoryName) => dispatch(updateCategoryName(categoryId, categoryName)),
    saveTabAndPanel: (categories, currentCategory, menuItems) => dispatch(saveTabAndPanel(categories, currentCategory, menuItems)),
    saveTabAndPanelThenSwitchTab: (categories, currentCategory, menuItems, toCategory) => dispatch(saveTabAndPanelThenSwitchTab(categories, currentCategory, menuItems, toCategory)),
    closeAlertToContinue: () => dispatch(closeAlertToContinue()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default withConnect(SwitchTabDialogAction);
