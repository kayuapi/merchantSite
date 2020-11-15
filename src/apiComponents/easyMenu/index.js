import React from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from "redux";

import AlertToContinue from './AlertToContinue';
import CategoryTabs from './CategoryTabs';
import DraggableTabs from './CategoryTabsSortModeOn';
import Control from './Control';
import MenuItemsPanel from './MenuItemsPanel';

import { MenuItemsWorkingAreaProvider } from './Context/MenuItemsWorkingArea/MenuItemsWorkingAreaProvider';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, FormProvider } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";

import { createStructuredSelector } from 'reselect';
import { makeSelectCategorySortModeOn } from './Control/selectors';

import { injectReducer, injectSaga } from 'redux-injectors';
import elegantMenuReducer from './reducers';
import elegantMenuSaga from './sagas';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    bottom: theme.spacing(10),
  },
  cardGrid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    height: '100%',
    padding: '0 0 0 0',
  },
}
));

const addToReducer = injectReducer({ key: "elegantMenu", reducer: elegantMenuReducer});
const addToSaga = injectSaga({key: "elegantMenu", saga: elegantMenuSaga});

const EasyMenuPageShow = ({
  isCategorySortModeOn,
}) => {    
  const classes = useStyles();
  const methods = useForm();
  const onSubmit = (data, e) => {
  }
  console.log(methods.formState.isDirty);
  return (
    <div className={classes.root}>
      <Container className={classes.cardGrid} maxWidth="md">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <MenuItemsWorkingAreaProvider>
              <Control />
              { isCategorySortModeOn && 
                <DraggableTabs />
              }
              { !isCategorySortModeOn && 
                <CategoryTabs>
                  {(currentCategoryId, menuItems) => (
                    <MenuItemsPanel currentCategoryId={currentCategoryId} menuItemsFromCloud={menuItems} />
                  )}
                </CategoryTabs>
              }
              <AlertToContinue />
            </MenuItemsWorkingAreaProvider>
          </form>
        </FormProvider>
      </Container>
      {/* <DevTool control={methods.control} /> */}
    </div>
  )
};

EasyMenuPageShow.propTypes = {
  isCategorySortModeOn: PropTypes.bool.isRequired,
}

const mapStateToProps = createStructuredSelector({
  isCategorySortModeOn: makeSelectCategorySortModeOn(),
})

const withConnect = connect(
  mapStateToProps,
)

export default compose(addToReducer, addToSaga, withConnect)(EasyMenuPageShow);
