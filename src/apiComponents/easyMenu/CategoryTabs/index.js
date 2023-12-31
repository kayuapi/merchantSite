// added wrapper style and change label to inputbase
// src: https://codesandbox.io/s/addanddelete-tabs-mui-howk8?file=/src/AddAndDeleteTab.js

import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { nanoid } from 'nanoid';
import { 
  loadCategories,
  switchCategory,
  addCategory,
  deleteCategory,
} from "./actions.js";
import { makeSelectIsAlertToContinueOn } from '../AlertToContinue/selectors';
import { openAlertToContinue } from '../AlertToContinue/actions';
import { makeSelectTabAndPanelSaving } from '../Control/selectors';
import { makeSelectMenuItems, makeSelectMenuItemsLoading, makeSelectMenuItemsError } from '../MenuItemsPanel/selectors';
import { makeSelectIsTabAndPanelDirty } from '../Control/selectors';
import { validateNoNewlyAddedCategory } from '../utils/businessLogicValidation';
// import { validateNoEmptyCategoryName } from '../utils/businessLogicValidation';
import { createStructuredSelector } from 'reselect';
import { 
  makeSelectCategories, 
  makeSelectCategoriesLoading, 
  makeSelectCategoriesError,
  makeSelectCurrentCategory,
} from './selectors';
import { v4 as uuidv4 } from 'uuid';
import { AppBar, Tab, Grid, InputBase, IconButton, CircularProgress } from "@material-ui/core";
import { useNotify } from 'react-admin';

import { useCurrentCategoryWorkingArea } from '../Context/CurrentCategoryWorkingArea';

import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

import { makeStyles } from "@material-ui/styles";
import TabList from '@material-ui/lab/TabList';
import TabContext from '@material-ui/lab/TabContext';
import { resetSavedSuccessfully } from "../Control/actions.js";

// I was stuck at deleting Tab, however, I found this thread from Rahul-RB on git
// https://gist.github.com/Rahul-RB/273dbb24faf411fa6cc37488e1af2415
// Since I am building an app with react hook only,
// I tried converting it to React Hooks and its works like this

const useStyles = makeStyles(theme => ({
  appBar: {
    color: "inherit",
    borderRadius: '0.5rem',
    backgroundColor: "a09b87",
    height: '74px',
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
    textTransform: 'none',
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

function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef();
  
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}


const CategoryTabs = ({
  categories,
  categoriesLoading,
  categoriesError,
  currentCategory,
  loadCategories,
  dispatchSwitchCategory,
  openAlertToContinue,
  addCategory,
  children,
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
    // event.stopPropagation();
    // event.preventDefault();
    if (categories) {
      if (categoryId !== currentCategory.id) {
        if (validateNoNewlyAddedCategory(categories)) {
          if (!isDirty) {
            if (!tabAndPanelSaving) {
              const toCategory = categories.filter(category => category.id === categoryId)[0];            
              dispatchSwitchCategory(toCategory);
            } else {
              notify('pos.notification.cannot_switch_tab_when_saving', 'warning');              
            }
          } else {
            notify("pos.notification.saved_first", 'warning');
          }
        } else {
          notify('pos.notification.cannot_switch_tab_current_tab_empty', 'warning');          
        }
      }
    }
  };

  const addNewCategoryTo = (categories) => {
    if (!isDirty) {
      if (validateNoNewlyAddedCategory(categories)) {
        const newCategory = {
          id: uuidv4(),
          _newlyAdded: true,
          name: "",
          pageId: nanoid(10),
        };
        addCategory(newCategory);
        dispatchSwitchCategory(newCategory);
      }
      else {
        notify("pos.notification.fill_in_name_and_save", 'warning');
      }
    } else {
      notify("pos.notification.saved_before_adding_new_category", 'warning');
    }
  }

  const [scrollBtn, setScrollBtn] = useState("off");
  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const { currentCategory: nextCurrentCategory, loadCurrentCategory, updateCurrentCategory } = useCurrentCategoryWorkingArea(currentCategory);
  const prevCurrentCategoryId = usePrevious(currentCategory?.id);
  useEffect(() => {
    if (currentCategory) {
      if (prevCurrentCategoryId !== currentCategory.id) {
        loadCurrentCategory(currentCategory);
      }
    } else {
      if (nextCurrentCategory) {
        loadCurrentCategory(false)
      }
    }
  }, [currentCategory, loadCurrentCategory, nextCurrentCategory, prevCurrentCategoryId]);


  const MyCloseIcon = React.forwardRef((props, ref) => {
    return (
      <Close style={props.style} id={props.categoryId} onClick={(e) => {
          e.stopPropagation();
          if (!tabAndPanelSaving) {
            if (!isDirty || props.categoryId === currentCategory.id) {
              const deletingCategoryIndex = categories.findIndex(category => category.id === props.categoryId);
              // const deletingCategory = categories.filter(category=>category.id === props.categoryId)[0];
              const actionToDispatch = deleteCategory(categories, categories[deletingCategoryIndex], currentCategory);
              openAlertToContinue(actionToDispatch);  
            } else {
              notify("pos.notification.saved_before_deleting_another_category", 'warning');
            }
          } else {
            notify("pos.notification.cannot_delete_while_saving", 'warning');
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
                disabled={tabAndPanelSaving}
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
                  disabled={tabAndPanelSaving}
                >
                  <Add />
                </IconButton>
              </Grid>
              <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                <div ref={tabsRef} className={classes.tabsContainer}>
                  <TabList
                    TabIndicatorProps={{ style: { background: "#ffffff" } }}
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
                            category.id === currentCategory.id ? 
                            // <Controller 
                            //   name={`menuPage.currentCategory`} 
                            //   defaultValue={category.name ? category.name : ''} 
                            //   render={({onChange, onBlur, value}) => (
                            //     <InputBase 
                            //       onBlur={(e) => {
                            //         if (!isAlertToContinueOn) {
                            //           updateCurrentCategory('name', e.target.value);
                            //         }
                            //         onBlur();
                            //       }}
                            //       onChange={onChange}
                            //       value={value}
                            //       multiline
                            //       rowsMax={2}
                            //       placeholder="New category"
                            //       classes={{root: classes.tabInput}}
                            //     />
                            //   )}
                            // />
                            <InputBase 
                              onChange={(e) => {
                                if (!isAlertToContinueOn) {
                                  updateCurrentCategory('name', e.target.value);
                                }
                              }}
                              // value={category.name ? category.name : ''}
                              defaultValue={category.name}
                              multiline
                              rowsMax={2}
                              placeholder="New category"
                              classes={{root: classes.tabInput}}
                            />:
                            <span>{category.name}</span>
                         }
                          icon={category.id === currentCategory.id ? 
                            <>
                              <MyCloseIcon style={{margin: 0}} categoryId={category.id} />
                              { (!nextCurrentCategory.status || nextCurrentCategory.status === 'ENABLED') && 
                                <ShoppingCartIcon onClick={() => {
                                  updateCurrentCategory('status', 'DISABLED');
                                }} />
                              }
                              { nextCurrentCategory.status === 'DISABLED' && 
                                <RemoveShoppingCartIcon onClick={() => {
                                  updateCurrentCategory('status', 'ENABLED');
                                }} /> 
                              }
                            </> : 
                            null
                          }
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
          { categories && currentCategory && !menuItemsLoading && children(currentCategory.id, menuItems, nextCurrentCategory.status) }
        </TabContext>
      )}
    </>
  )
};

CategoryTabs.propTypes = {
  categories: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  categoriesLoading: PropTypes.bool,
  categoriesError: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

  currentCategory: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  
  loadCategories: PropTypes.func.isRequired,
  dispatchSwitchCategory: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  openAlertToContinue: PropTypes.func.isRequired,
  resetSavedSuccessfully: PropTypes.func.isRequired,
  isDirty: PropTypes.bool,
  tabAndPanelSaving: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  categories: makeSelectCategories(),
  categoriesLoading: makeSelectCategoriesLoading(),
  categoriesError: makeSelectCategoriesError(),

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
    loadCategories: () => dispatch(loadCategories()),
    dispatchSwitchCategory: category => dispatch(switchCategory(category)),
    addCategory: (category) => dispatch(addCategory(category)),
    openAlertToContinue: (actionCreator, actionCreatorArgument) => dispatch(openAlertToContinue(actionCreator, actionCreatorArgument)),
    resetSavedSuccessfully: () => dispatch(resetSavedSuccessfully()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
)

export default compose(withConnect)(CategoryTabs);
