import produce from 'immer';
import {
  OPEN_ALERTTOCONTINUE,
  CLOSE_ALERTTOCONTINUE,
  WAITING_NETWORK_RESPONSE,
  NETWORK_RESPONSE_RECEIVED,
} from './constants';

export const initialState = {
  isAlertToContinueOn: false,
  actionToDispatch: false,
  waitingForNetworkResponse: false,
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
      case WAITING_NETWORK_RESPONSE: {
        draft.waitingForNetworkResponse = true;
        break;
      }
      case NETWORK_RESPONSE_RECEIVED: {
        draft.waitingForNetworkResponse = false;
        break;
      }      
    }
  })

export default alertToContinueReducer;