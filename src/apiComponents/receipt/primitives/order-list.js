import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import OrderItem from './order-item';
import { grid } from '../themes/constants'
import Title from './title';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';


export const getBackgroundColor = (
  isDraggingOver,
  isDraggingFrom,
) => {
  if (isDraggingOver) {
    return red[50];
  }
  if (isDraggingFrom) {
    return teal[50];
  }
  return grey[100];
};

const Wrapper = styled.div`
  background-color: ${(props) =>
    getBackgroundColor(props.isDraggingOver, props.isDraggingFrom)};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  padding: ${grid}px;
  border: ${grid}px;
  padding-bottom: 0;
  transition: background-color 0.2s ease, opacity 0.1s ease;
  user-select: none;
  width: 250px;
`;

const scrollContainerHeight = 250;

const DropZone = styled.div`
  /* stop the list collapsing when empty */
  min-height: ${scrollContainerHeight}px;

  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  padding-bottom: ${grid}px;
`;

const ScrollContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: ${scrollContainerHeight}px;
`;

/* stylelint-disable block-no-empty */
const Container = styled.div``;
/* stylelint-enable */


const InnerOrderList = React.memo(function InnerOrderList({
    orderettes
  }) {
  console.log('innerorderlist', orderettes);
  return orderettes.map((orderette, index) => (
    <Draggable key={orderette.id} draggableId={orderette.id} index={index}>
      {(
        dragProvided,
        dragSnapshot,
      ) => (
        <OrderItem
          key={orderette.id}
          orderette={orderette}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
        />
      )}
    </Draggable>
  ));
});

function InnerList({
  dropProvided,
  orderettes,
  title: propsTitle
  }) {
  const title = propsTitle ? <Title>{propsTitle}</Title> : null;

  return (
    <Container>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerOrderList orderettes={orderettes} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export default function OrderList({
    listId = 'LIST',
    listType,
    orderettes,
    title,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    style,
    // may not be provided - and might be null
    ignoreContainerClipping,
    useClone,  
  }) {

  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <OrderItem
                orderette={orderettes[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : null
      }
    >
      {(
        dropProvided,
        dropSnapshot,
      ) => (
        <Wrapper
          style={style}
          isDraggingOver={dropSnapshot.isDraggingOver}
          isDropDisabled={isDropDisabled}
          isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
          {...dropProvided.droppableProps}
        >
          {internalScroll ? (
            <ScrollContainer style={scrollContainerStyle}>
              <InnerList
                orderettes={orderettes}
                title={title}
                dropProvided={dropProvided}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              orderettes={orderettes}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}