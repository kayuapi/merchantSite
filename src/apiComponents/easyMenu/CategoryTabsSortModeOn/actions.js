import { 
  INIT_TABS,
  REARRANGE_TABS,
} from './constants';

export function initTabs(tabs) {
  return {
    type: INIT_TABS,
    tabs,
  }
}
export function rearrangeTabs(tabs) {
  return {
    type: REARRANGE_TABS,
    tabs,
  }
}
