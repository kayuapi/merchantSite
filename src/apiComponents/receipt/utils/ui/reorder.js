// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;

export const reorderTablesFacetedOrders = ({
  tablesFacetedOrders,
  source,
  destination,
}) => {
  const current = [...tablesFacetedOrders[source.droppableId]];
  const next = [...tablesFacetedOrders[destination.droppableId]];
  const target = current[source.index];

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(
      current,
      source.index,
      destination.index,
    );
    const result = {
      ...tablesFacetedOrders,
      [source.droppableId]: reordered,
    };
    return {
      tablesFacetedOrders: result,
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  const result = {
    ...tablesFacetedOrders,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    tablesFacetedOrders: result,
  };
};

export function moveBetween({
  list1,
  list2,
  source,
  destination,
}) {
  const newFirst = Array.from(list1.values);
  const newSecond = Array.from(list2.values);

  const moveFrom = source.droppableId === list1.id ? newFirst : newSecond;
  const moveTo = moveFrom === newFirst ? newSecond : newFirst;

  const [moved] = moveFrom.splice(source.index, 1);
  moveTo.splice(destination.index, 0, moved);

  return {
    list1: {
      ...list1,
      values: newFirst,
    },
    list2: {
      ...list2,
      values: newSecond,
    },
  };
}