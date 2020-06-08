import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import {
    useTranslate,
    useDataProvider,
    Loading,
    Error
} from 'react-admin';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useFirestore } from 'react-redux-firebase';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { fetchUtils, useAuthenticated } from 'react-admin';
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


const OrderPageShow = props => {
    useAuthenticated();
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
    console.log(receivedOrders);

    useEffect(()=>{
      sounds['pink'].play();
    }, [receivedOrders])

    return (
      <div className={classes.root}>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={2}>

            {receivedOrders && Object.values(receivedOrders).map((el,id) => {
              return (<OrderMemo key={id} businessId={businessId} firestore={firestore} onDelete={deleteOrder} details={el}/>);
            })}
          </Grid>
        </Container>
      </div>
    )
};

export default [
  <Route exact path="/orderMemo" component={OrderPageShow} />,
];

