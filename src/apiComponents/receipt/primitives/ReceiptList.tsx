import * as React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import ReceiptItem from './ReceiptItem';
import { grid } from '../themes/constants'
import Title from './title';
import red from '@material-ui/core/colors/red';
import teal from '@material-ui/core/colors/teal';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import { ReceiptItemType, MenuItem } from '../types';
import { 
  DroppableProvided, 
  DroppableStateSnapshot, 
  DraggableProvided, 
  DraggableStateSnapshot 
} from 'react-beautiful-dnd';


interface Props {
  listId?: string;
  listType?: string;
  receiptItems: ReceiptItemType[];
  title?: string;
  internalScroll?: boolean;
  scrollContainerStyle?: Object;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  style?: Object;
  // may not be provided - and might be null
  ignoreContainerClipping?: boolean;
  useClone?: boolean;
}

interface InnerListProps {
  dropProvided: DroppableProvided;
  receiptItems: ReceiptItemType[];
  title?: string;
}

interface InnerReceiptListProps {
  receiptItems: ReceiptItemType[];
}

export const getBackgroundColor = (
  isDraggingOver: boolean,
  isDraggingFrom: boolean,
): string => {
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


const InnerReceiptList: FC<InnerReceiptListProps> = React.memo(({
    receiptItems
  }) => {
  return (
    <>
      {receiptItems.map((receiptItem: ReceiptItemType, index: number) => (
        <Draggable key={receiptItem.id} draggableId={receiptItem.id} index={index}>
          {(
            dragProvided: DraggableProvided,
            dragSnapshot: DraggableStateSnapshot,
          ) => (
            <ReceiptItem
              key={receiptItem.id}
              receiptItem={receiptItem}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
            />
          )}
        </Draggable>))
      }
    </>
  )});

const InnerList: FC<InnerListProps> = ({
  dropProvided,
  receiptItems,
  title: propsTitle
  }) => {
  const title = propsTitle ? <Title>{propsTitle}</Title> : null;

  return (
    <Container>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerReceiptList receiptItems={receiptItems} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

const ReceiptList: FC<Props> = ({
    listId = 'LIST',
    listType,
    receiptItems,
    title,
    internalScroll,
    scrollContainerStyle,
    isDropDisabled,
    isCombineEnabled,
    style,
    // may not be provided - and might be null
    ignoreContainerClipping,
    useClone,  
  }) => {

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
              <ReceiptItem
                receiptItem={receiptItems[descriptor.source.index]}
                provided={provided}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : undefined
      }
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
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
                receiptItems={receiptItems}
                title={title}
                dropProvided={dropProvided}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              receiptItems={receiptItems}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default ReceiptList;