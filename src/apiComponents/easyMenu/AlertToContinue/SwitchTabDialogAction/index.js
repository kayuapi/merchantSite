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

import { makeSelectTabAndPanelSaving } from '../../Control/selectors';
import { saveTabAndPanel } from '../../Control/actions';

const SwitchTabDialogAction = ({
  revertChangesToTab,
  currentCategory,
  categories,
  menuItems,
  actionToDispatch,
  isTabAndPanelSaving,
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
          continue without Saving
      </Button>
      <Button
        disabled={isTabAndPanelSaving}
        onClick={()=> {
          const currentCategoryNewCopy = {...currentCategory};
          // console.log('equal?', currentCategoryNewCopy == currentCategory);
          const categoriesNewCopy = {...categories};
          const menuItemsNewCopy = {...menuItems};
          // console.log('onclick currentCategory', currentCategoryNewCopy);
          saveTabAndPanel(categoriesNewCopy, currentCategoryNewCopy, menuItemsNewCopy);
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

  revertChangesToTab: PropTypes.func,
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
    revertChangesToTab: (categoryId, categoryName) => dispatch(updateCategoryName(categoryId, categoryName)),
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
