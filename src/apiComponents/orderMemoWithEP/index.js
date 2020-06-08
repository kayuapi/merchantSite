import React, { useEffect } from 'react';
// import { Route } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
// import {
//     useTranslate,
//     useDataProvider,
//     Loading,
//     Error
// } from 'react-admin';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthenticated } from 'react-admin';
// import { fetchUtils } from 'react-admin';
import OrderMemo from './OrderMemo';

const useStyles = makeStyles(theme => ({
  button: {
    'margin': theme.spacing(1),
  },
  root: {
    flexGrow: 1,
    width: '100%',
    bottom: theme.spacing(10),
  },
  cardGrid: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
    height: '100%',
  },
}
));
const sounds = {
  'green': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  'blue': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  'pink': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  'yellow': new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
};

const deleteOrder = (firestore, businessId, orderId) => {
  firestore.delete({
    collection: 'businesses',
    doc: businessId,
    subcollections: [
      {
        collection: 'receivedOrders',
        doc: orderId,
      },
    ],
  });
}

// propertyList can only take in 2 properties of the objects, each object can only have either 1 of the property
const groupByDate = (objectArray, propertyList) => {
  return objectArray.reduce((acc, obj) => {
    if (obj !== null) {
      const key = obj[propertyList[0]] || obj[propertyList[1]];
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
    console.log('orderpage rendering ...');
    const classes = useStyles();
    const firestore = useFirestore();
    const businessId = 'demo';
    const listenedPath = {
      collection: 'businesses',
      doc: businessId,
      subcollections: [
        {
          collection: 'receivedOrders',
          // where ['jfisj', '==', sth],
        },
      ],
      storeAs: 'ReceivedOrdersCollection',
    };
    useFirestoreConnect([listenedPath]);
    const receivedOrders = useSelector(
      state => state.firestore.data.ReceivedOrdersCollection,
    );

    var groupedReceivedOrders;

    if (receivedOrders) {
      // console.log('receivedOrder is');
      // console.log(receivedOrders);
      const receivedOrdersArray = Object.values(receivedOrders);
      groupedReceivedOrders = groupByDate(receivedOrdersArray, ['delivery_date', 'pickup_date']);
    }

    useEffect(()=>{
      sounds['pink'].play();
      // console.log(receivedOrders);
      // if (receivedOrders) {
      //   const receivedOrdersArray = Object.values(receivedOrders);
      //   groupedReceivedOrders = groupByDate(receivedOrdersArray, ['delivery_date', 'pickup_date']);
      // }  
    }, [receivedOrders])

    return (
      <div className={classes.root}>
        <Container className={classes.cardGrid} maxWidth="lg">
            {!groupedReceivedOrders && <span>No orders received.</span>}          
            {groupedReceivedOrders && Object.keys(groupedReceivedOrders).map((el, id) => {
              return (
                <ExpansionPanel key={id}>
                  <ExpansionPanelSummary
                    key={id}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={classes.heading}>{el}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>

                    <Grid container spacing={2}>
                      {receivedOrders && groupedReceivedOrders[el].map((elm,id) => {
                        return (<OrderMemo key={id} businessId={businessId} firestore={firestore} onDelete={deleteOrder} details={elm}/>);
                      })}
                    </Grid>


                  </ExpansionPanelDetails>
                </ExpansionPanel>

              )
            })}
            
        </Container>
      </div>
    )
};

export default OrderPageShow;
