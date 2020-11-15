import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
// import categoryTabsSaga from './apiComponents/easyMenu/CategoryTabs/saga';
// import menuItemsPanelSaga from './apiComponents/easyMenu/MenuItemsPanel/saga';
// import controlSaga from './apiComponents/easyMenu/Control/saga';
import { createInjectorsEnhancer } from "redux-injectors";
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
    // const reducer = combineReducers({
    //     admin: adminReducer,
    //     router: connectRouter(history),
    //     // firebase: firebaseReducer,
    //     // firestore: firestoreReducer,
    //     // elegantMenu: elegantMenuReducer,
    //     // { /* add your own reducers here */ },
    // });

    // const resettableAppReducer = (state, action) =>
    //     reducer(action.type !== USER_LOGOUT ? state : undefined, action);

    const createReducer = (injectedReducers = {}) => {
      const rootReducer = combineReducers({
        ...injectedReducers,
        // other non-injected reducers can go here...
        admin: adminReducer,
        router: connectRouter(history),
        // elegantMenu: controlReducer,
      });
      const resettableAppReducer = (state, action) =>
        rootReducer(action.type !== USER_LOGOUT ? state : undefined, action);

      return resettableAppReducer
    };

    const saga = function* rootSaga() {
        yield all(
            [
                adminSaga(dataProvider, authProvider),
                // add your own sagas here
                // categoryTabsSaga,
                // menuItemsPanelSaga,
                // controlSaga,
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
        // resettableAppReducer,
        createReducer(),
        // { /* set your initial state here */ }, initialstate = {}
        {},
        composeEnhancers(
          applyMiddleware(
            sagaMiddleware,
            routerMiddleware(history),
            // add your own middlewares here
          ),
            // add your own enhancers here
          createInjectorsEnhancer({
            createReducer,
            runSaga: sagaMiddleware.run,
          }),
        ),        
    );
    sagaMiddleware.run(saga);
    return store;
};