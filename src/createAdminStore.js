import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import elegantMenuReducer from './apiComponents/easyMenu/reducers';
import categoryTabsReducer from './apiComponents/easyMenu/CategoryTabs/reducer';
import categoryTabsSaga from './apiComponents/easyMenu/CategoryTabs/saga';
import menuItemsPanelReducer from './apiComponents/easyMenu/MenuItemsPanel/reducer';
import menuItemsPanelSaga from './apiComponents/easyMenu/MenuItemsPanel/saga';
import controlReducer from './apiComponents/easyMenu/Control/reducer';
import controlSaga from './apiComponents/easyMenu/Control/saga';
import categoryTabsSortModeReducer from './apiComponents/easyMenu/CategoryTabsSortModeOn/reducer';
import variantsPopUpReducer from './apiComponents/easyMenu/VariantsPopUp/reducer';
import alertToContinueReducer from './apiComponents/easyMenu/AlertToContinue/reducer';
import {
    adminReducer,
    adminSaga,
    USER_LOGOUT,
} from 'react-admin';
// import { firebaseReducer } from 'react-redux-firebase';
// import { firestoreReducer } from 'redux-firestore';

export default ({
    authProvider,
    dataProvider,
    history,
}) => {
    const reducer = combineReducers({
        admin: adminReducer,
        router: connectRouter(history),
        // firebase: firebaseReducer,
        // firestore: firestoreReducer,
        elegantMenu: elegantMenuReducer,
        // elegantMenuCategory: categoryTabsReducer,
        // elegantMenuItemsPanel: menuItemsPanelReducer,
        // elegantMenuControl: controlReducer,
        // elegantMenuCategoryTabsSMO: categoryTabsSortModeReducer,
        // elegantMenuVariantsPopUp: variantsPopUpReducer,
        // alertToContinue: alertToContinueReducer,
        // { /* add your own reducers here */ },
    });
    const resettableAppReducer = (state, action) =>
        reducer(action.type !== USER_LOGOUT ? state : undefined, action);

    const saga = function* rootSaga() {
        yield all(
            [
                adminSaga(dataProvider, authProvider),
                // add your own sagas here
                categoryTabsSaga,
                menuItemsPanelSaga,
                controlSaga,
            ].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers =
        (process.env.NODE_ENV === 'development' &&
            typeof window !== 'undefined' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                trace: true,
                traceLimit: 25,
            })) ||
        compose;
  
    const store = createStore(
        resettableAppReducer,
        // { /* set your initial state here */ }, initialstate = {}
        {},
        composeEnhancers(
            applyMiddleware(
                sagaMiddleware,
                routerMiddleware(history),
                // add your own middlewares here
            ),
            // add your own enhancers here
        ),        
    );
    sagaMiddleware.run(saga);
    return store;
};