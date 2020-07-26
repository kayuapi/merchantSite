import React, { useState, useEffect, useReducer } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { sampleData } from './utils/data/data';
import { onCreateOrder } from '../../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import Board from './Board';

const useStyles = makeStyles(theme => ({
    button: {
      'margin': theme.spacing(1),
    },
    root: {
      flexGrow: 1,
      width: '100%',
      bottom: theme.spacing(10),
    }
  }
));

const Receipt = ({props}) => {
  const classes = useStyles();
  // useEffect(() => {
  //   onPageRendered();
  // }, []);

  // const onPageRendered = async () => {
  //   subscribeOrder();
  // }

  // const subscribeOrder = async () => {
  //   await API.graphql(
  //     graphqlOperation(onCreateOrder)
  //   ).subscribe({
  //     next: subonCreateOrder => console.log(subonCreateOrder)
  //   });
  // }

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
      <Board initial={sampleData} />
    </div>
  )
};

export default Receipt;
