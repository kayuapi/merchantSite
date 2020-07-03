// added wrapper style and change label to inputbase
// src: https://codesandbox.io/s/addanddelete-tabs-mui-howk8?file=/src/AddAndDeleteTab.js

import React, { useState, useEffect, memo } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { 
  loadCategories,
  switchCategory,
  addCategory,
  deleteCategory,
} from "./actions.js";
import { createStructuredSelector } from 'reselect';
import { 
  makeSelectCategories, 
  makeSelectCategoriesLoading, 
  makeSelectCategoriesError,
  makeSelectCanAddCategory,
  makeSelectCategoriesSaving,
  makeSelectCurrentCategoryId,
} from './selectors';
import { AppBar, Tab, Grid, Button, InputBase } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import { Controller } from "react-hook-form";
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';
import { IconButton } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { openAlertToContinue } from '../AlertToContinue/actions';
import { makeSelectElegantMenuCanSaveTabAndPanel } from '../Control/selectors';
import { deleteMenuItems } from "../MenuItemsPanel/actions.js";

// import { DevTool } from "react-hook-form-devtools";
// I was stuck at deleting Tab, however, I found this thread from Rahul-RB on git
// https://gist.github.com/Rahul-RB/273dbb24faf411fa6cc37488e1af2415
// Since I am building an app with react hook only,
// I tried converting it to React Hooks and its works like this

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: "60px",
    width: "100%",
    backgroundColor: "#fff"
  },
  appBar: {
    color: "inherit",
    backgroundColor: "a09b87",
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
  currentCategoryId,
  loadCategories,
  dispatchSwitchCategory,
  openAlertToContinue,
  addCategory,
  dispatchDeleteCategory,
  children,
}) => {
  const classes = useStyles();
  const tabsRef = React.useRef();
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
  })
  
  const handleTabChange = (event, categoryId) => {
    if (canSaveTabAndPanel){
      const actionToDispatch = switchCategory(categoryId);
      openAlertToContinue(actionToDispatch);
    } else {
      dispatchSwitchCategory(categoryId)
    }
  };

  const addNewCategory = () => {
    if (canSaveTabAndPanel) {
      openAlertToContinue(addCategory());
    } else {
      addCategory();
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
          const actionToDispatch = deleteCategory(props.categoryId);
          console.log('action to dispatch when close', actionToDispatch);
          openAlertToContinue(actionToDispatch);
        }} 
      />
    )
  });

  return (
    <>
      { categoriesLoading && <CircularProgress /> }
      { categories && (
        <TabContext value={currentCategoryId}>
          <AppBar position="sticky" className={classes.appBar}>    
            <Grid className={classes.gridContainer} container alignItems="center" justify="center">
              <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                <IconButton 
                  className={classes.addPageButton} 
                  onClick={addNewCategory} 
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
                          label={<Controller 
                                  as={InputBase}
                                  name={`menuPage.categories[${index}]`}
                                  classes={{root: classes.tabInput}}
                                  defaultValue={category.name}
                                  placeholder="New category"
                                />}
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
          { children }
          {/* {children(pageNames.data)} */}
        </TabContext>
      )}
    </>
  )};

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
};

const mapStateToProps = createStructuredSelector({
  canSaveTabAndPanel: makeSelectElegantMenuCanSaveTabAndPanel(),
  categories: makeSelectCategories(),
  categoriesLoading: makeSelectCategoriesLoading(),
  categoriesError: makeSelectCategoriesError(),
  canAddCategory: makeSelectCanAddCategory(),
  categoriesSaving: makeSelectCategoriesSaving(),
  currentCategoryId: makeSelectCurrentCategoryId(),
});

function mapDispatchToProps(dispatch) {
  return {
    loadCategories: () => dispatch(loadCategories()),
    dispatchSwitchCategory: category => dispatch(switchCategory(category)),
    addCategory: () => dispatch(addCategory()),
    dispatchDeleteCategory: categoryId => dispatch(deleteCategory(categoryId)),
    dispatchDeleteMenuItems: menuItems => dispatch(deleteMenuItems(menuItems)),
    openAlertToContinue: (actionCreator, actionCreatorArgument) => dispatch(openAlertToContinue(actionCreator, actionCreatorArgument)),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(CategoryTabs);
