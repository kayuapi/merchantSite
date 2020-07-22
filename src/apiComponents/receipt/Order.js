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
        </Container>
      )}
    </Draggable>

  )
}
export default Order;