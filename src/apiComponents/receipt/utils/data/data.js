const generateOrderItems = (count) => {
  const orderItems = Array.from({length: count}, (v, k) => k).map(k=> {
    const custom = {
      id: `id-${k}`,
      name: `item-${k}`,
      price: Math.floor(Math.random() * 10).toFixed(2),
      qty: Math.floor(Math.random() * 10),
    };
    return custom;
  });
  return orderItems;
}


export const sampleData = {
  'table1': generateOrderItems(Math.floor(Math.random() * 10)),
  'table2': generateOrderItems(Math.floor(Math.random() * 10)),
}

