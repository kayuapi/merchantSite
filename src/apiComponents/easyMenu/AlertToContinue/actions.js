
import { 
  OPEN_ALERTTOCONTINUE,
  CLOSE_ALERTTOCONTINUE,
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
