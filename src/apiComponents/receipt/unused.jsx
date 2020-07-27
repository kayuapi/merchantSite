import React, { useState, useEffect, useReducer } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from 'styled-components';

import { onCreateOrder } from '../../graphql/subscriptions';
import { API, graphqlOperation } from 'aws-amplify';
import {} from 'styled-components/cssprop';

const tables = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom = {
    id: `id-${k}`,
    content: `Table ${k}`
  };
  return custom;
});

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom   = {
    id: `id-${k}`,
    content: `Orderette ${k}`
  };

  return custom;
});
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;
const OrderetteRow = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`;
const OrderetteNameCell = styled.div`
  width: 70%;
  margin-bottom: ${grid}px;
  background-color: lightblue;
`;
const OrderetteQtyCell = styled.div`
  width: 20%;
  margin-bottom: ${grid}px;
  background-color: lightblue;

`;
const OrderettePriceCell = styled.div`
  width: 10%;
  margin-bottom: ${grid}px;
  background-color: lightblue;
`;

const Orderette = ({ orderette, index }) => (
  <Draggable isDragDisabled={false} draggableId={orderette.id} index={index}>
    {provided => (
      <OrderetteRow
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <OrderetteNameCell>{orderette.content}</OrderetteNameCell>
        <OrderetteQtyCell>1</OrderetteQtyCell>
        <OrderettePriceCell>15.00</OrderettePriceCell>
      </OrderetteRow>
    )}
  </Draggable>
)

const Order = React.memo(function Order({ orderettes }) {
  return orderettes.map((orderette, index) => (
    <Orderette orderette={orderette} index={index} key={orderette.id} />
  ));
});

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
  //   let subscription;

  //   const run = () => {
  //     subscription = API.graphql(
  //       graphqlOperation(onCreateOrder, {owner: 'demo'})
  //     ).subscribe({
  //       next: response => console.log('response', response),
  //       error: response => console.log('error response', response),
  //     });
  //   };

  //   run();

  //   return () => subscription.unsubscribe();
  // }, []);

  const [state, setState] = useState({ orderettes: initial });

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const orderettes = reorder(
      state.orderettes,
      result.source.index,
      result.destination.index
    );

    setState({ orderettes });
  }

  return (
    <div className={classes.root}>        
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="list">
          {provided => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {tables.map((key, index) => (
                <Order orderettes={state.orderettes} />
                
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

    </div>
  )
};

export default Receipt;
