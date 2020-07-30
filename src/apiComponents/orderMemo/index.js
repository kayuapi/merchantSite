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
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { fetchUtils, useAuthenticated } from 'react-admin';
import { API, graphqlOperation, Auth } from 'aws-amplify';

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
  useAuthenticated();
    const classes = useStyles();
    const [state, setState] = useState({orders: []});
    const onSortEnd = ({oldIndex, newIndex}) => {
      setState(({orders})=> ({
        orders: arrayMove(orders, oldIndex, newIndex),
      }));
    }

    useEffect(() => {
      let subscription;
      const run = (shopId) => {
        subscription = API.graphql(
          graphqlOperation(`
          subscription OnCreateOrder(
            $shopId: String!
          ) {
            onCreateOrder(
              shopId: $shopId
            ) {
              shopId
              fulfillmentMethod
              orderId
              status
              paymentMethod
              postscript
              tableNumber
              firstName
              lastName
              phoneNumber
              pickupDate
              pickupTime
              vehiclePlateNumber
              deliveryDate
              deliveryTime
              deliveryAddress
              orderedItems {
                name
                variant
                quantity
              }
              createdAt
              updatedAt
            }
          }
          `, { shopId })
        ).subscribe({
          next: response => {
            setState(prevState => ({
              ...prevState,
              orders: [
                ...prevState.orders, 
                response['value']['data']['onCreateOrder'],
              ],
            }));
          },
          error: response => console.log('error response', response),
        });
      };
      async function listTodaysOrders(shopId, fulfillmentMethod, startingOrderId, endingOrderId) {
        const todaysDineInUnfulfilledOrders = await API.graphql(graphqlOperation(`
        query ListOrders(
          $shopId: String
          $fulfillmentMethodOrderId: ModelOrderPrimaryCompositeKeyConditionInput
        ) {
          listOrders(
            shopId: $shopId
            fulfillmentMethodOrderId: $fulfillmentMethodOrderId
          ){
            items {
              shopId
              fulfillmentMethod
              orderId
              status
              paymentMethod
              postscript
              tableNumber
              firstName
              lastName
              phoneNumber
              pickupDate
              pickupTime
              vehiclePlateNumber
              deliveryDate
              deliveryTime
              deliveryAddress
              orderedItems {
                name
                variant
                quantity
              }      
            }      
          }
        }`, {
          shopId: `${shopId}`,
          fulfillmentMethodOrderId: {
            between: [{fulfillmentMethod, orderId: startingOrderId}, {fulfillmentMethod, orderId: endingOrderId}]
          }
        }));
        return todaysDineInUnfulfilledOrders;
      }

      Auth.currentUserInfo().then(result => {
        const shopId = result['username'];
        const todayStarting = `${new Date().setHours(0,0,0,0)}`;
        const todayEnding = `${new Date().setHours(23,59,59,999)}`;
        Promise.all([
          listTodaysOrders(shopId, 'DINE_IN', todayStarting, todayEnding), 
          listTodaysOrders(shopId, 'DELIVERY', todayStarting, todayEnding),
          listTodaysOrders(shopId, 'SELF_PICKUP', todayStarting, todayEnding)
        ]).then((results) => {
          const combinedOrderList = [
            ...results[0]['data']['listOrders']['items'],
            ...results[1]['data']['listOrders']['items'],
            ...results[2]['data']['listOrders']['items'],
          ];
          if (combinedOrderList.length > 0) {
            // const todaysUnfulfilledOrders = fakeData;
            setState(prevState => ({
              ...prevState,
              orders: [
                ...prevState.orders, 
                ...combinedOrderList
              ],
            }));
          }
        }).catch(err => console.log(err));
        

        run(shopId);

      });

      return () => subscription.unsubscribe();
    }, []);


  // useEffect(() => {
  //   console.log('ready');
  //   let subscription;

  //   const run = () => {
  //     subscription = API.graphql(
  //       graphqlOperation(onCreateOrder, {shopId: 'demo2'})
  //     ).subscribe({
  //       next: response => console.log('response', response),
  //       error: response => console.log('error response', response),
  //     });
  //   };

  //   run();

  //   return () => subscription.unsubscribe();
  // }, []);





    return (
      <div className={classes.root}>
        <TodaysOrderBoard useDragHandle orders={state.orders} axis={'xy'} helperClass={classes.sorting} onSortEnd={onSortEnd} />
      </div>
    )
};

export default OrderPageShow;

