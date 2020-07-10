import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { selectCategories } from '../CategoryTabs/selectors';
const selectElegantMenuAlertToContinueDomain = state => state.elegantMenu.alertToContinue || initialState;
const selectElegantMenuAlertToContinueIsAlertOn = state => state.elegantMenu.alertToContinue.isAlertToContinueOn || initialState['isAlertToContinueOn'];

const makeSelectIsAlertToContinueOn = () =>
  createSelector(
    selectElegantMenuAlertToContinueDomain,
    substate => substate.isAlertToContinueOn,
  );

const makeSelectActionToDispatch = () =>
  createSelector(
    selectElegantMenuAlertToContinueDomain,
    substate => substate.actionToDispatch,
  );

const makeSelectCategoryName = (id) =>
  createSelector(
    selectCategories,
    substate => substate.filter(category => category.id === id)[0].name,
  );


export { 
  selectElegantMenuAlertToContinueDomain,
  selectElegantMenuAlertToContinueIsAlertOn,
  makeSelectIsAlertToContinueOn, 
  makeSelectActionToDispatch,
  makeSelectCategoryName,
};
