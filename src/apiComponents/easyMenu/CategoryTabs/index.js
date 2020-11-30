// added wrapper style and change label to inputbase
// src: https://codesandbox.io/s/addanddelete-tabs-mui-howk8?file=/src/AddAndDeleteTab.js

import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { 
  loadCategories,
  switchCategory,
  addCategory,
  deleteCategory,
  updateCategoryName,
} from "./actions.js";
import { makeSelectIsAlertToContinueOn } from '../AlertToContinue/selectors';
import { openAlertToContinue } from '../AlertToContinue/actions';
import { makeSelectTabAndPanelSaving } from '../Control/selectors';
import { makeSelectMenuItems, makeSelectMenuItemsLoading, makeSelectMenuItemsError } from '../MenuItemsPanel/selectors';
import { makeSelectIsTabAndPanelDirty } from '../Control/selectors';
import { deleteMenuItems } from "../MenuItemsPanel/actions.js";
import { createStructuredSelector } from 'reselect';
import { 
  makeSelectCategories, 
  makeSelectCategoriesLoading, 
  makeSelectCategoriesError,
  makeSelectCategoriesSaving,
  makeSelectCurrentCategory,
} from './selectors';
import { v4 as uuidv4 } from 'uuid';
import { Controller } from 'react-hook-form';
import { AppBar, Tab, Grid, InputBase, IconButton, CircularProgress } from "@material-ui/core";
import { useNotify } from 'react-admin';

import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';
import { resetSavedSuccessfully } from "../Control/actions.js";
import { validateNoDuplicateCategoryName } from '../utils/businessLogicValidation';
// I was stuck at deleting Tab, however, I found this thread from Rahul-RB on git
// https://gist.github.com/Rahul-RB/273dbb24faf411fa6cc37488e1af2415
// Since I am building an app with react hook only,
// I tried converting it to React Hooks and its works like this

const useStyles = makeStyles(theme => ({
  appBar: {
    color: "inherit",
    backgroundColor: "a09b87",
    height: '64px',
    top: '40px', // hard coded need to be changed
    "& .myTab": {
      backgroundColor: "yellow",
      color: "green"
    }
  },
  scrollButtons: {
    color: 'white',
  },
  gridContainer: {
    // maxWidth: '700px'
  },
  tabRoot: {
    minWidth: 50,
    // width: 120,
  },
  myTab2: {
    flexDirection: "row-reverse",
    color: "white"
  },
  tabInput: {
    color: "white"
  },
  addPageButton: {
    color: "white",
    padding: 0,
  },
  tabsContainer: {
    //if not set then flickering because it takes upper container width (grid) which is responsive
    maxWidth: "100vw"
  },
}));


const CategoryTabs = ({
  categories,
  categoriesLoading,
  categoriesError,
  categoriesSaving,
  currentCategory,
  loadCategories,
  dispatchSwitchCategory,
  openAlertToContinue,
  addCategory,
  children,
  updateCategoryName,
  resetSavedSuccessfully,
  isAlertToContinueOn,
  menuItems,
  menuItemsLoading,
  isDirty,
  tabAndPanelSaving,
}) => {
  const classes = useStyles();
  const tabsRef = React.useRef();
  const notify = useNotify();
  // const categoriesLength = categories ? categories.length: 0;
  // const tabInputRefs = React.useRef([...new Array(categoriesLength)].map(() => React.createRef()));
  const updateScrollButton = () => {
    const container = tabsRef.current;
    if (!container) {
      return;
    }
    const containerWidth = container.clientWidth;
    const tabs = Array.from(container.getElementsByTagName("button"));
    const tabWidth = tabs.reduce((a, b) => a + b.clientWidth, 0);
    const newScrollButtons = tabWidth > containerWidth ? "on" : "off";
    if (scrollBtn !== newScrollButtons) {
      setScrollBtn(newScrollButtons);
    }
  }

  useEffect(() => {
    updateScrollButton();
  });

  useEffect(()=> {
    window.addEventListener("resize", updateScrollButton);
    return () => {
      window.removeEventListener("resize", updateScrollButton);
    }
  });

  const handleTabChange = (event, categoryId) => {
    // the line below is for resetting the open alert saved ui
    resetSavedSuccessfully();
    const category = categories.filter(category => category.id === categoryId)[0];
    if (!tabAndPanelSaving) {
      // event.stopPropagation();
      // event.preventDefault();
      if (category.id === currentCategory.id) {
      } else if (category.id !== currentCategory.id && !isDirty) {
        dispatchSwitchCategory(category);
      } else {
        notify("pos.notification.saved_first", 'warning');
        // const actionToDispatch = switchCategory(category);
        // openAlertToContinue(actionToDispatch);      
      }  
    } else {
      if (category.id !== currentCategory.id) {
        notify('pos.notification.cannot_switch_tab_when_saving', 'warning');
      }
    }
  };

  const addNewCategoryTo = (categories) => {
    if (!isDirty) {
      const newCategory = {
        id: uuidv4(),
        _name: "",
        name: "",
      };
      if (categories) {
        if (validateNoDuplicateCategoryName([...categories, newCategory])) {
          addCategory(newCategory);
          if (isDirty) {
            openAlertToContinue(switchCategory(newCategory));
          } else {
            dispatchSwitchCategory(newCategory);
          }  
        } else {
          notify("pos.notification.fill_in_category_name", 'warning');
        }  
      } else {
        addCategory(newCategory);
        dispatchSwitchCategory(newCategory);
      }
    } else {
      notify("pos.notification.saved_before_adding_new_category", 'warning');
    }
  }

  const [scrollBtn, setScrollBtn] = useState("off");
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);


  const MyCloseIcon = React.forwardRef((props, ref) => {
    return (
      <Close id={props.categoryId} onClick={(e) => {
          e.stopPropagation();
          if (!isDirty || props.categoryId === currentCategory.id) {
            const deletingCategoryIndex = categories.findIndex(category => category.id === props.categoryId);
            // const deletingCategory = categories.filter(category=>category.id === props.categoryId)[0];
            const actionToDispatch = deleteCategory(categories, categories[deletingCategoryIndex], currentCategory);
            openAlertToContinue(actionToDispatch);  
          } else {
            notify("pos.notification.saved_before_deleting_another_category", 'warning');
          }
        }} 
      />
    )
  });

  return (
    <>
      { categoriesLoading && <CircularProgress /> }
      {/* for initial ui state */}
      { !categoriesLoading && !categories && (
        <AppBar position="sticky" className={classes.appBar}>    
          <Grid className={classes.gridContainer} container alignItems="center" justify="center">
            <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
              <IconButton 
                className={classes.addPageButton} 
                onClick={() => addNewCategoryTo(categories)} 
                aria-label="add page"
              >
                <Add />
              </IconButton>
            </Grid>
            <Grid item xl={11} lg={11} md={11} sm={11} xs={11} />
          </Grid>
        </AppBar>
      )}
      { !categoriesLoading && categories && currentCategory && (
        <TabContext value={currentCategory.id}>      
          <AppBar position="sticky" className={classes.appBar}>    
            <Grid className={classes.gridContainer} container alignItems="center" justify="center">
              <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <IconButton 
                  className={classes.addPageButton} 
                  onClick={() => addNewCategoryTo(categories)} 
                  aria-label="add page"
                >
                  <Add />
                </IconButton>
              </Grid>
              <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                <div ref={tabsRef} className={classes.tabsContainer}>
                  <TabList
                    onChange={handleTabChange}
                    variant="scrollable"
                    aria-label="simple tabs example"
                    scrollButtons={scrollBtn}
                    classes={{scrollButtons: classes.scrollButtons}}
                  >
                    {categories.map((category, index) => {
                      return(
                        <Tab
                          key={category.id}
                          value={category.id}
                          label={
                            <Controller 
                              name={`menuPage.categories[${index}]`} 
                              defaultValue={category.name ? category.name : ''} 
                              render={({onChange, onBlur, value}) => (
                                <InputBase 
                                  onBlur={(e) => {
                                    if (!isAlertToContinueOn) {
                                      updateCategoryName(category.id, e.target.value); 
                                    }
                                    onBlur();
                                  }}
                                  onChange={onChange}
                                  value={value}
                                  multiline
                                  rowsMax={2}
                                  placeholder="New category"
                                  classes={{root: classes.tabInput}}
                                />
                              )}
                            />
                         }
                          icon={<MyCloseIcon categoryId={category.id} />}
                          classes={{ root: classes.tabRoot, wrapper: classes.myTab2 }}
                        />
                      )}
                    )}
                  </TabList>
                </div>              
              </Grid>
            </Grid>
          </AppBar>
          { categories && currentCategory && menuItemsLoading && <CircularProgress /> }
          { categories && currentCategory && !menuItemsLoading && children(currentCategory.id, menuItems) }

        </TabContext>
      )}
    </>
  )
};

CategoryTabs.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  categoriesLoading: PropTypes.bool,
  categoriesError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  categoriesSaving: PropTypes.bool,
  currentCategory: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  
  loadCategories: PropTypes.func.isRequired,
  dispatchSwitchCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  openAlertToContinue: PropTypes.func.isRequired,
  updateCategoryName: PropTypes.func.isRequired,
  resetSavedSuccessfully: PropTypes.func.isRequired,
  isDirty: PropTypes.bool,
  tabAndPanelSaving: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  categoriesLoading: makeSelectCategoriesLoading(),
  categoriesError: makeSelectCategoriesError(),
  categoriesSaving: makeSelectCategoriesSaving(),
  currentCategory: makeSelectCurrentCategory(),
  tabAndPanelSaving: makeSelectTabAndPanelSaving(),

  menuItems: makeSelectMenuItems(),
  menuItemsLoading: makeSelectMenuItemsLoading(),
  menuItemsError: makeSelectMenuItemsError(),

  isAlertToContinueOn: makeSelectIsAlertToContinueOn(),
  isDirty: makeSelectIsTabAndPanelDirty(),

});

function mapDispatchToProps(dispatch) {
  return {
    updateCategoryName: (categoryId, categoryName) => dispatch(updateCategoryName(categoryId, categoryName)),
    loadCategories: () => dispatch(loadCategories()),
    dispatchSwitchCategory: category => dispatch(switchCategory(category)),
    addCategory: (category) => dispatch(addCategory(category)),
    dispatchDeleteMenuItems: menuItems => dispatch(deleteMenuItems(menuItems)),
    openAlertToContinue: (actionCreator, actionCreatorArgument) => dispatch(openAlertToContinue(actionCreator, actionCreatorArgument)),
    resetSavedSuccessfully: () => dispatch(resetSavedSuccessfully()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(CategoryTabs);
