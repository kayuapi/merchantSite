import React, { useState } from 'react';
import styled from 'styled-components';
import blue from '@material-ui/core/colors/blue';
import Order from './Order';
import reorder, { reorderTablesFacetedOrders } from './utils/ui/reorder';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
  body {
    background: ${blue[200]};
  }
`

const ParentContainer = styled.div`
  height: ${({ height }) => height};
  overflow-x: hidden;
  overflow-y: auto;
`;

const Container = styled.div`
  background-color: ${blue[400]};
  //min-height: 100vh;
  /* like display:flex but will allow bleeding over the window width */
  min-width: 100vw;
  display: inline-flex;
`;

const Board = ({
    initial,
    containerHeight,
    useClone,
    isCombineEnabled,
    withScrollableColumns
  }) => {
  const [state, setState] = useState({ tablesFacetedOrders: initial, tables: Object.keys(initial) });
  console.log('initial', initial);
  const onDragEnd = (result) => {
    if (result.combine) {
      if (result.type === 'COLUMN') {
        const shallow = [...state.tables];
        shallow.splice(result.source.index, 1);
        this.setState({ ...state, tables: shallow });
        return;
      }

      const order = state.tablesFacetedOrders[result.source.droppableId];
      const withOrderRemoved = [...order];
      withOrderRemoved.splice(result.source.index, 1);
      const tablesFacetedOrders = {
        ...state.tablesFacetedOrders,
        [result.source.droppableId]: withOrderRemoved,
      };
      setState({
        ...state, 
        tablesFacetedOrders 
      });
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering table
    if (result.type === 'COLUMN') {
      const tables = reorder(
        state.tables,
        source.index,
        destination.index,
      );

      setState({
        ...state,
        tables,
      });

      return;
    }

    const data = reorderTablesFacetedOrders({
      tablesFacetedOrders: state.tablesFacetedOrders,
      source,
      destination,
    });

    setState({
      ...state,
      tablesFacetedOrders: data.tablesFacetedOrders,
    });
  };

  const board = (
    <Droppable
      droppableId="board"
      type="COLUMN"
      direction="horizontal"
      ignoreContainerClipping={Boolean(containerHeight)}
      isCombineEnabled={isCombineEnabled}
    >
      {provided => (
        <Container ref={provided.innerRef} {...provided.droppableProps}>
          {state.tables.map((key, index) => (
            <Order
              key={key}
              index={index}
              title={key}
              orderettes={state.tablesFacetedOrders[key]}
              isScrollable={withScrollableColumns}
              isCombineEnabled={isCombineEnabled}
              useClone={useClone}
            />
          ))}
          {provided.placeholder}
        </Container>
      )}
    </Droppable>
  );
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {containerHeight ? (
          <ParentContainer height={containerHeight}>{board}</ParentContainer>
        ) : (
          board
        )}
      </DragDropContext>
      <Global />
    </>
  )
}
export default Board;
