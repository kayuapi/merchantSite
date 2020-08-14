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
import { useFormContext } from "react-hook-form";

import { deleteMenuItems } from "../MenuItemsPanel/actions.js";
import { createStructuredSelector } from 'reselect';
import { 
  makeSelectCategories, 
  makeSelectCategoriesLoading, 
  makeSelectCategoriesError,
  makeSelectCanAddCategory,
  makeSelectCategoriesSaving,
  makeSelectCurrentCategory,
} from './selectors';
import { makeSelectElegantMenuCanSaveTabAndPanel } from '../Control/selectors';
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
    top: '55px', // hard coded need to be changed
    "& .myTab": {
      backgroundColor: "yellow",
      color: "green"
    }
  },
  gridContainer: {
    // maxWidth: '700px'
  },
  tabRoot: {
    minWidth: 100,
    width: 120,
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
  canAddCategory,
  categoriesSaving,
  canSaveTabAndPanel,
  currentCategory,
  loadCategories,
  dispatchSwitchCategory,
  openAlertToContinue,
  addCategory,
  dispatchDeleteCategory,
  children,
  updateCategoryName,
  resetSavedSuccessfully,
  isAlertToContinueOn,
}) => {
  const classes = useStyles();
  const tabsRef = React.useRef();
  const notify = useNotify();
  // const categoriesLength = categories ? categories.length: 0;
  // const tabInputRefs = React.useRef([...new Array(categoriesLength)].map(() => React.createRef()));
  const { formState: { dirtyFields } } = useFormContext();
  const isDirty = !(Object.keys(dirtyFields).length === 0 && dirtyFields.constructor === Object);
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
    event.stopPropagation();
    event.preventDefault();
    const category = categories.filter(category => category.id === categoryId)[0];
    if (category.id === currentCategory.id) {
    } else if (category.id !== currentCategory.id && !isDirty) {
      dispatchSwitchCategory(category);
    } else {

      const actionToDispatch = switchCategory(category);
      openAlertToContinue(actionToDispatch);      
    }
  };

  const addNewCategoryTo = (categories) => {
    const newCategory = {
      id: uuidv4(),
      _name: "",
      name: "",
    };

    if (validateNoDuplicateCategoryName([...categories, newCategory])) {
      addCategory(newCategory);
      if (isDirty) {
        openAlertToContinue(switchCategory(newCategory));
      } else {
        dispatchSwitchCategory(newCategory);
      }  
    } else {
      notify("pos.notification.issue_addding_new_category_duplicate_category_name", 'warning');
    }
  }
  const [scrollBtn, setScrollBtn] = useState("off");
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const MyInputBaseNew = ({index, category}) => {
    return (
      <Controller 
        name={`menuPage.categories[${index}]`} 
        defaultValue={category.name ? category.name : ''} 
        render={({onChange, onBlur, value}) => (
          <InputBase 
            onBlur={(e) => {
              updateCategoryName(category.id, e.target.value); 
              onBlur();
            }}
            onChange={onChange}
            value={value}
            multiline
            placeholder="New category"
            classes={{root: classes.tabInput}}
          />
        )}
      />
    ) 
  };


  // const MyInputBase = React.forwardRef((props, ref) => {
  //   console.log('myinputbase ref', composerRef);
  //   return (
  //     <InputBase
  //       // inputRef={ref}
  //       inputRef={currentCategory.id === props.category.id ? composerRef : null}
  //       defaultValue={props.category.name ? props.category.name: ''}
  //       onBlur={(e) => {
  //         e.persist();
  //         setIsComposing(false);
  //         // updateCategoryName(props.category.id, e.target.value);
  //       }}
  //       onChange={(e) => {
          
  //         e.persist();
  //         console.log('e', e);
  //         updateCategoryName(props.category.id, e.target.value);
  //         setIsComposing(true);
  //         // e.preventDefault();
  //       }}
  //       multiline
  //       inputProps={{ tabIndex: "-1" }}
  //       placeholder="New category"
  //       classes={{root: classes.tabInput}}
  //     />
  //   )
  // })
  const MyCloseIcon = React.forwardRef((props, ref) => {
    return (
      <Close id={props.categoryId} onClick={(e) => {
          e.stopPropagation();
          const deletingCategoryIndex = categories.findIndex(category => category.id === props.categoryId);
          // const deletingCategory = categories.filter(category=>category.id === props.categoryId)[0];
          const actionToDispatch = deleteCategory(categories, categories[deletingCategoryIndex], currentCategory);
          openAlertToContinue(actionToDispatch);
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
          { categories && currentCategory && children }
        </TabContext>
      )}
    </>
  )
};

CategoryTabs.propTypes = {
  canAddCategory: PropTypes.bool,
  canSaveTabAndPanel: PropTypes.bool,
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  categoriesLoading: PropTypes.bool,
  categoriesError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  categoriesSaving: PropTypes.bool,
  currentCategory: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  
  loadCategories: PropTypes.func.isRequired,
  dispatchSwitchCategory: PropTypes.func.isRequired,
  dispatchDeleteCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  openAlertToContinue: PropTypes.func.isRequired,
  updateCategoryName: PropTypes.func.isRequired,
  resetSavedSuccessfully: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  canSaveTabAndPanel: makeSelectElegantMenuCanSaveTabAndPanel(),
  categories: makeSelectCategories(),
  categoriesLoading: makeSelectCategoriesLoading(),
  categoriesError: makeSelectCategoriesError(),
  canAddCategory: makeSelectCanAddCategory(),
  categoriesSaving: makeSelectCategoriesSaving(),
  currentCategory: makeSelectCurrentCategory(),

  isAlertToContinueOn: makeSelectIsAlertToContinueOn(),

});

function mapDispatchToProps(dispatch) {
  return {
    updateCategoryName: (categoryId, categoryName) => dispatch(updateCategoryName(categoryId, categoryName)),
    loadCategories: () => dispatch(loadCategories()),
    dispatchSwitchCategory: category => dispatch(switchCategory(category)),
    addCategory: (category) => dispatch(addCategory(category)),
    dispatchDeleteCategory: categoryId => dispatch(deleteCategory(categoryId)),
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
