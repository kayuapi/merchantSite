import React from 'react';
import { Route } from 'react-router-dom';
import Banner from './apiComponents/banner';
import easyMenu from './apiComponents/easyMenu';
import orderMemoWithEP from './apiComponents/orderMemoWithEP';
// import playground from './apiComponents/playground';
export default [
    <Route exact path="/banner" component={Banner} />,
    <Route exact path="/easyMenu" component={easyMenu} />,
    <Route exact path="/orderMemo" component={orderMemoWithEP} />,
    // <Route exact path="/playground" component={playground} />,
];
