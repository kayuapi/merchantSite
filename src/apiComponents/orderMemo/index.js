import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import arrayMove from 'array-move';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import DineInOrderMemo from './primitives/DineInOrderMemo';
import DeliveryOrderMemo from './primitives/DeliveryOrderMemo';
import SelfPickupOrderMemo from './primitives/SelfPickupOrderMemo';
import {
    useTranslate,
    useDataProvider,
    Loading,
    Error
} from 'react-admin';
import fakeData from './tests/fakeData';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { fetchUtils, useAuthenticated } from 'react-admin';

const useStyles = makeStyles(theme => ({
  button: {
    'margin': theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    width: '100%',
    bottom: theme.spacing(10),
  },
  sorting: {
    zIndex: theme.zIndex.modal + 100,
  },
}
));
const sounds = {
  'green': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  'blue': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  'pink': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  'yellow': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};


const OrderMemo = SortableElement(({order}) => {
  if (order.fulfillmentMethod === 'DINE_IN') {
    return <DineInOrderMemo {...order} />
  } else if (order.fulfillmentMethod === 'DELIVERY') {
    return <DeliveryOrderMemo {...order} />
  } else if (order.fulfillmentMethod === 'SELF_PICKUP') {
    return <SelfPickupOrderMemo {...order} />
  } else {
    return
  }


});

const TodaysOrderBoard = SortableContainer(({orders}) => {
  console.log('orders', orders);
  return (
    <Grid container spacing={2}>
      {orders.map((order, index) => (
        <OrderMemo key={`item-${order.orderId}`} index={index} order={order} />
      ))}
    </Grid>
  )  

});

const OrderPageShow = props => {
    const classes = useStyles();
    const [state, setState] = useState({orders: []});
    const onSortEnd = ({oldIndex, newIndex}) => {
      setState(({orders})=> ({
        orders: arrayMove(orders, oldIndex, newIndex),
      }));
    }

    useEffect(() => {
      const todaysUnfulfilledOrders = fakeData;
      // const todaysUnfulfilledOrders = getTodaysUnfulfilledOrders();
      setState({orders: todaysUnfulfilledOrders});
    }, []);

    return (
      <div className={classes.root}>
        <TodaysOrderBoard useDragHandle orders={state.orders} axis={'xy'} helperClass={classes.sorting} onSortEnd={onSortEnd} />
      </div>
    )
};

export default OrderPageShow;

