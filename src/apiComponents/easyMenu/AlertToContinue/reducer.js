import produce from 'immer';
import {
  OPEN_ALERTTOCONTINUE,
  CLOSE_ALERTTOCONTINUE,
} from './constants';

export const initialState = {
  isAlertToContinueOn: false,
  actionToDispatch: false,
};

/* eslint-disable default-case, no-param-reassign */

const alertToContinueReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case OPEN_ALERTTOCONTINUE: {
        draft.isAlertToContinueOn = true;
        draft.actionToDispatch = action.actionToDispatch;
        break;
      }
      case CLOSE_ALERTTOCONTINUE: {
        draft.isAlertToContinueOn = false;
        break;
      }      
    }
  })

export default alertToContinueReducer;