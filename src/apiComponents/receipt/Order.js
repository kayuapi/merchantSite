// @flow
import React, { Component } from 'react';
import styled from '@emotion/styled';
import { grid, borderRadius } from './themes/constants';
import { Draggable } from 'react-beautiful-dnd';
import OrderList from './primitives/order-list';
import Title from './primitives/title';
import green from '@material-ui/core/colors/green';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';

const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
`;

const ReceiptSummaryEntry = styled.div`
  /* flex child */
  flex-grow: 1;
  
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%
  
  width: 100%;
  border: 1px solid grey;
  //margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
  align-items: center;

  /* flex parent */
  display: flex;
  flex-direction: row;

`;

const ReceiptSummaryEntryName = styled.div`
  width: 50%;
  background-color: lightblue;
  flex-grow: 1;
  flex-shrink: 1;
  font-weight: normal;
`;

const ReceiptSummaryEntryPrice = styled.div`
  width: 50%;
  background-color: lightblue;
  flex-shrink: 0;
  flex-grow: 0;
  font-weight: normal;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
    isDragging ? green[100] : grey[100]};
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${green[200]};
  }
`;

const Order = ({
  title,
  orderettes,
  index,
  isScrollable,
  isCombineEnabled,
  useClone,
}) => {

  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title
              isDragging={snapshot.isDragging}
              {...provided.dragHandleProps}
              aria-label={`${title} quote list`}
            >
              {title}
            </Title>
          </Header>
          <OrderList
            listId={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? green[50] : null,
            }}
            orderettes={orderettes}
            internalScroll={isScrollable}
            isCombineEnabled={Boolean(isCombineEnabled)}
            useClone={Boolean(useClone)}
          />
          <ReceiptSummaryEntry>
            <ReceiptSummaryEntryName>Sub-Total</ReceiptSummaryEntryName>
            <ReceiptSummaryEntryPrice>RM 21.95</ReceiptSummaryEntryPrice>
          </ReceiptSummaryEntry>
          <ReceiptSummaryEntry>
            <ReceiptSummaryEntryName>6% Service Tax</ReceiptSummaryEntryName>
            <ReceiptSummaryEntryPrice>RM 1.32</ReceiptSummaryEntryPrice>
          </ReceiptSummaryEntry>
          <ReceiptSummaryEntry>
            <ReceiptSummaryEntryName>Rounding</ReceiptSummaryEntryName>
            <ReceiptSummaryEntryPrice>RM -0.02</ReceiptSummaryEntryPrice>
          </ReceiptSummaryEntry>

        </Container>
      )}

    </Draggable>

  )
}
export default Order;