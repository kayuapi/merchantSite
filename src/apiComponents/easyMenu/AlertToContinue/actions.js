
import { 
  OPEN_ALERTTOCONTINUE,
  CLOSE_ALERTTOCONTINUE,
  WAITING_NETWORK_RESPONSE,
} from './constants';

export function openAlertToContinue(actionToDispatch) {
  return {
    type: OPEN_ALERTTOCONTINUE,
    actionToDispatch,
  }
}
export function closeAlertToContinue() {
  return {
    type: CLOSE_ALERTTOCONTINUE,
  }
}
export function waitingNetworkResponse() {
  return {
    type: WAITING_NETWORK_RESPONSE,
  }
}
