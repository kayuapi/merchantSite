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
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { fetchUtils, useAuthenticated } from 'react-admin';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import Aside from './aside';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Top from './top';
import { TopFulfillmentMethod } from './top';
import {
  endOfYesterday,
  startOfWeek,
  subWeeks,
  addWeeks,
  startOfMonth,
  subMonths,
} from 'date-fns';

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
  filter: {
    display: 'flex',
  },
  accordion: {
    paddingBottom: theme.spacing(5),
  }
}
));
const sounds = {
  'notificationMandarinCasual': new Audio(`${process.env.PUBLIC_URL}/newOrderCasual.mp3`),
  'notificationMandarin': new Audio(`${process.env.PUBLIC_URL}/newOrderMandarin.mp3`),
  'notificationEnglish': new Audio(`${process.env.PUBLIC_URL}/newOrderEnglish.mp3`),
};

const deleteOrder = (orderId, fulfillmentMethod, state, setState) => {
  const removedDeletedOrderArray = state.orders.filter(order => {
    return (order.orderId !== orderId || order.fulfillmentMethod !== fulfillmentMethod);
  });
  console.log('orderId', orderId);
  console.log('removedDeletedORderArray', removedDeletedOrderArray);
  setState({
    ordersByDate: groupByDate(removedDeletedOrderArray, ['deliveryDate', 'pickupDate']),
    orders: removedDeletedOrderArray
  });
}

const OrderMemo = SortableElement(({order, deleteOrder}) => {
  if (order.status === 'UNFULFILLED') {
    if (order.fulfillmentMethod === 'DINE_IN') {
      return <DineInOrderMemo deleteOrder={deleteOrder} {...order} />
    } else if (order.fulfillmentMethod === 'DELIVERY') {
      return <DeliveryOrderMemo deleteOrder={deleteOrder} {...order} />
    } else if (order.fulfillmentMethod === 'SELF_PICKUP') {
      return <SelfPickupOrderMemo deleteOrder={deleteOrder} {...order} />
    } else {
      return
    }
  }
  return
});

const OrderBoard = SortableContainer(({orders, state, setState}) => {
  console.log('orders', orders);
  return (
    <Grid container spacing={2}>
      {orders.map((order, index) => (
        <OrderMemo 
          key={`item-${order.orderId}`} 
          index={index} 
          order={order} 
          deleteOrder={() => 
            deleteOrder(order.orderId, order.fulfillmentMethod, state, setState)
          } 
        />
      ))}
    </Grid>
  )  

});

// propertyList can only take in 2 properties of the objects, 
// each object can only have either 1 of the property
// if both property are falsy, use date now
const groupByDate = (objectArray, propertyList) => {
  let key;
  return objectArray.reduce((acc, obj) => {
    if (obj !== null) {
      const pickupTimeOrDeliveryTimeOrNow = obj[propertyList[0]] ?? obj[propertyList[1]] ?? Number(obj['orderId']) ?? new Date().getTime();
      key = new Date(pickupTimeOrDeliveryTimeOrNow).toDateString();
      if (!acc[key]) {
         acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;  
    }
    return acc;
 }, {});  
}

const OrderPageShow = props => {
  useAuthenticated();
    const classes = useStyles();
    const [state, setState] = useState({orders: [], ordersByDate: {}});
    // set default filter to this week and all fulfillmentMethods
    const [filterValues, setFilters] =  useState({
      date_range: [
        `${startOfWeek(new Date()).getTime()}`,
        `${addWeeks(startOfWeek(new Date()), 1).getTime()}`
      ],
      fulfillmentMethod: 'ALL',
    });
    const onSortEnd = ({oldIndex, newIndex}) => {
      setState(({orders})=> ({
        orders: arrayMove(orders, oldIndex, newIndex),
      }));
    }

    useEffect(() => {
      let subscription;
      const run = (shopId, fulfillmentMethod, startingOrderId, endingOrderId) => {
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
            const receivedOrder = response['value']['data']['onCreateOrder'];
            if (fulfillmentMethod !== 'ALL') {
              if (receivedOrder.fulfillmentMethod === fulfillmentMethod) {
                if (receivedOrder.orderId > startingOrderId && receivedOrder.orderId < endingOrderId) {
                  sounds['notificationMandarinCasual'].play();
                  setState(prevState => {
                    const updatedReceivedOrder = [...prevState.orders, receivedOrder];
                    const updatedReceivedOrderByDate = groupByDate(updatedReceivedOrder, ['deliveryDate', 'pickupDate']);
                    return ({
                      ...prevState,
                      orders: updatedReceivedOrder,
                      ordersByDate: updatedReceivedOrderByDate,
                    });
                  });
                }    
              } else {
                return;
              }
            }
            if (fulfillmentMethod === 'ALL') {
              if (receivedOrder.orderId > startingOrderId && receivedOrder.orderId < endingOrderId) {
                sounds['notificationMandarinCasual'].play();
                setState(prevState => ({
                  ...prevState,
                  orders: [
                    ...prevState.orders, 
                    response['value']['data']['onCreateOrder'],
                  ],
                }));
              }  
            }
          },
          error: response => console.log('error response', response),
        });
      };
      async function listReceivedOrders(shopId, fulfillmentMethod, startingOrderId, endingOrderId) {
        const receivedOrders = await API.graphql(graphqlOperation(`
        query ListOrders(
          $shopId: String
          $fulfillmentMethodOrderId: ModelOrderPrimaryCompositeKeyConditionInput
        ) {
          listOrders(
            shopId: $shopId
            fulfillmentMethodOrderId: $fulfillmentMethodOrderId
          ){
            items {
              createdAt
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
        return receivedOrders;
      }

      Auth.currentUserInfo().then(result => {
        const shopId = result['username'];
        const startingDate = filterValues['date_range'][0];
        const endingDate = filterValues['date_range'][1];
        const fulfillmentMethod = filterValues['fulfillmentMethod'];
        console.log('fulfillmentMethod', fulfillmentMethod);
        console.log('startingDate', startingDate);
        console.log('endingDate', endingDate);
        // const todayStarting = `${new Date().setHours(0,0,0,0)}`;
        // const todayEnding = `${new Date().setHours(23,59,59,999)}`;
        let callFunc;
        if (fulfillmentMethod === 'ALL') {
          callFunc = () => Promise.all([
            listReceivedOrders(shopId, 'DINE_IN', startingDate, endingDate), 
            listReceivedOrders(shopId, 'DELIVERY', startingDate, endingDate),
            listReceivedOrders(shopId, 'SELF_PICKUP', startingDate, endingDate)
          ]);
        } else {
          callFunc = () => Promise.all([listReceivedOrders(shopId, fulfillmentMethod, startingDate, endingDate)]);
        }
        callFunc().then((results) => {
          let combinedOrderList = [];
          // for one result only
          if (results.length === 1) {
            combinedOrderList = results[0]['data']['listOrders']['items'];
            combinedOrderList = combinedOrderList.filter(order => order.status !== 'FULFILLED');
          }
          if (results.length === 3) {
            combinedOrderList = [
              ...results[0]['data']['listOrders']['items'],
              ...results[1]['data']['listOrders']['items'],
              ...results[2]['data']['listOrders']['items'],
            ];
            combinedOrderList = combinedOrderList.filter(order => order.status !== 'FULFILLED');
          }
          // const todaysUnfulfilledOrders = fakeData;
          console.log('combined order list', combinedOrderList);
          const combinedOrderListGroupedByDate = groupByDate(combinedOrderList, ['deliveryDate', 'pickupDate']);
          console.log('combined order list by date', combinedOrderListGroupedByDate);
          setState(prevState => ({
            ...prevState,
            orders: [
              // ...prevState.orders, 
              ...combinedOrderList
            ],
            ordersByDate: combinedOrderListGroupedByDate,
          }));

        }).catch(err => console.log(err));
        

        run(shopId, fulfillmentMethod, startingDate, endingDate);

      });

      return () => subscription.unsubscribe();
    }, [filterValues]);


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
        <div className={classes.filter}>
          <Top filterValues={filterValues} setFilters={setFilters} />
          <TopFulfillmentMethod filterValues={filterValues} setFilters={setFilters} /> 
        </div>
        {/* <OrderBoard 
          useDragHandle 
          orders={state.orders} 
          axis={'xy'} 
          helperClass={classes.sorting} 
          onSortEnd={onSortEnd}
          state={state}
          setState={setState}
        /> */}
        <Container maxWidth="lg">
            {Object.keys(state.ordersByDate).length === 0 && 
              state.ordersByDate.constructor === Object && 
              <span>No orders received.</span>}          
            {Object.keys(state.ordersByDate).length !== 0 &&
              state.ordersByDate.constructor === Object && 
                Object.keys(state.ordersByDate).map((el, id) => {
                  // prevent table number from appearing in next week, note diff of customer put ordering date and customer expect receiving date
                  // customer can put ordering for next month
                  return (
                    <Accordion className={classes.accordion} key={id}>
                      <AccordionSummary
                        key={id}
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography className={classes.heading}>
                          {el}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <OrderBoard 
                          useDragHandle 
                          orders={state.ordersByDate[el]} 
                          axis={'xy'} 
                          helperClass={classes.sorting} 
                          onSortEnd={onSortEnd}
                          state={state}
                          setState={setState}
                        />
                      </AccordionDetails>
                    </Accordion>  
                  )
                }
              )
            }
            
        </Container>

      </div>
    )
};

export default OrderPageShow;

