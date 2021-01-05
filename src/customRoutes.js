import React from 'react';
import { Route } from 'react-router-dom';
import Banner from './apiComponents/banner';
import easyMenu from './apiComponents/easyMenu';
import orderMemo from './apiComponents/orderMemo';
import Configuration from './configuration/Configuration';
import Help from './help/Help';
// import orderMemoWithEP from './apiComponents/orderMemoWithEP';
// import playground from './apiComponents/playground';
export default [
    <Route exact path="/banner" component={Banner} />,
    <Route exact path="/easyMenu" component={easyMenu} />,
    <Route exact path="/orderMemo" component={orderMemo} />,
    <Route exact path="/configuration" component={Configuration} />,
    <Route exact path="/help" component={Help} />,
    // <Route exact path="/playground" component={playground} />,
];
