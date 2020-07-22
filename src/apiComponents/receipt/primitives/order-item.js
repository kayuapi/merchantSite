// @flow
import React from 'react';
import styled from '@emotion/styled';
import { borderRadius, grid } from '../themes/constants';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';

const getBackgroundColor = (
  isDragging,
  isGroupedOver,
  authorColors,
) => {
  if (isDragging) {
    return authorColors.soft;
  }

  if (isGroupedOver) {
    return blueGrey[100];
  }

  return blueGrey[50];
};

const getBorderColor = (isDragging, authorColors) =>
  isDragging ? authorColors.hard : 'transparent';

const imageSize = 40;

const CloneBadge = styled.div`
  background: ${grey[100]};
  bottom: ${grid / 2}px;
  border: 2px solid ${grey[200]};
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);

  height: ${imageSize}px;
  width: ${imageSize}px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.a`
  border-radius: ${borderRadius}px;
  //border: 2px solid transparent;
  border-color: ${(props) => getBorderColor(props.isDragging, props.colors)};
  background-color: ${(props) =>
    getBackgroundColor(props.isDragging, props.isGroupedOver, props.colors)};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px ${blueGrey[200]}` : 'none'};
  box-sizing: border-box;
  //padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: ${blueGrey[500]};

  &:hover,
  &:active {
    color: ${blueGrey[800]};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

const OrderItemNameCell = styled.div`
  width: 70%;
  background-color: lightblue;
  flex-grow: 1;
  flex-shrink: 1;
  font-weight: normal;
`;

const OrderItemQtyCell = styled.div`
  width: 20%;
  background-color: lightblue;
  flex-shrink: 0;
  flex-grow: 0;
  font-weight: normal;
`;

const OrderItemPriceCell = styled.div`
  width: 10%;
  background-color: lightblue;
  flex-shrink: 0;
  flex-grow: 0;
  font-weight: normal;
`;
const OrderItemRow = styled.div`
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

function getStyle(provided, style) {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function OrderItem({
    orderette,
    isDragging,
    provided,
    isClone,
    isGroupedOver,
    style,
    index,
  }) {

  return (
    <Container
      // href={quote.author.url}
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      // colors={quote.author.colors}
      colors={grey[100]}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={orderette.id}
      data-index={index}
      aria-label={`${orderette.name} quantity ${orderette.qty} price ${orderette.price}`}
    >
      {isClone ? <CloneBadge>Clone</CloneBadge> : null}
      <OrderItemRow>
        <OrderItemNameCell>{orderette.name}</OrderItemNameCell>
        <OrderItemQtyCell>{orderette.qty}</OrderItemQtyCell>
        <OrderItemPriceCell>{orderette.price}</OrderItemPriceCell>
      </OrderItemRow>
    </Container>
  );
}

export default React.memo(OrderItem);