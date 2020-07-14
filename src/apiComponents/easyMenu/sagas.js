import { all, fork } from 'redux-saga/effects';
import categoryTabsSaga from './CategoryTabs/saga';
import menuItemsPanelSaga from './MenuItemsPanel/saga';
import controlSaga from './Control/saga';

export default function* easyMenuSaga() {
  yield all([
    categoryTabsSaga,
    menuItemsPanelSaga,
    controlSaga,
  ].map(fork));
}
