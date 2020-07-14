import React from 'react';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import { Admin, Resource } from 'react-admin';
// import MyLoginPage from './MyLoginPage';
import MyLogoutButton from './MyLogoutButton';
// import { UserList } from './users';
// import jsonServerProvider from 'ra-data-json-server';
import menuItems from './apiComponents/menu';
import categories from './apiComponents/categories';

import dataProvider from './dataProvider';
import englishMessages from './i18n/en';
import { Layout } from './layout';

import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import createAdminStore from './createAdminStore';
// import { createStore, combineReducers, compose } from 'redux';
// import authProvider from './authProvider';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// import 'firebase/functions' // <- needed if using httpsCallable
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
// import { Auth } from 'aws-amplify';
import customRoutes from './customRoutes';
import Dashboard from './Dashboard';
// import { ConfirmSignIn, ConfirmSignUp, ForgotPassword, RequireNewPassword, SignIn, SignUp, VerifyContact } from 'aws-amplify-react';


const firebaseConfig = {
    apiKey: 'AIzaSyCHN7a2wDAXpL5udxm0yFa7d_E1k84PO4c',
    authDomain: 'chmordering.firebaseapp.com',
    databaseURL: 'https://chmordering.firebaseio.com',
    projectId: 'chmordering',
    storageBucket: 'chmordering.appspot.com',
    messagingSenderId: '602692964430',
    appId: '1:602692964430:web:bb13a9ea6e4b556fa8331f',
    measurementId: 'G-6QW6L1YPR5',
};
  
const rrfConfig = { userProfile: 'users', useFirestoreForProfile: true }; // optional redux-firestore Config Options

firebase.initializeApp(firebaseConfig);
firebase.firestore();
// const messaging = firebase.messaging();
// messaging.usePublicVapidKey("BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu");



//const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');

// const authProvider = () => Promise.resolve();
const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'cn') {
        return import('./i18n/cn').then(messages => messages.default);
    }
    return englishMessages;
}, 'en');
const history = createHashHistory();

// Create store with reducers and initial state
// const initialState = {}
// const store = createStore(rootReducer, initialState)

export const store = createAdminStore({
    // authProvider,
    dataProvider,
    history,
});

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
};
  


const App = () => {

    return(
        <>

    <Provider store={store}>
        {/* <ReactReduxFirebaseProvider {...rrfProps}> */}
      <Admin 
        customRoutes={customRoutes}
        layout={Layout}
        dashboard={Dashboard}
        // loginPage={MyLoginPage}
        // logoutButton={MyLogoutButton}
        // authProvider={authProvider}
        dataProvider={dataProvider}
        i18nProvider={i18nProvider}
        history={history}
      >
          
          <Resource name="menuItems" {...menuItems} />
          {/* <Resource name="categories" {...categories} /> */}
      </Admin>
        {/* </ReactReduxFirebaseProvider> */}
    </Provider>
    <AmplifySignOut />
    </>
)};
export default withAuthenticator(App);
// export default withAuthenticator(App, false, [
//   <SignIn/>,
//   <ConfirmSignIn/>,
//   <VerifyContact/>,
//   <SignUp/>,
//   <ConfirmSignUp/>,
//   <ForgotPassword/>,
//   <RequireNewPassword />
// ]);