export const todaysUnfulfilledOrders = [
  {
    createdAt: 'Created At',
    shopId: 'shopId',
    orderId: 'orderId',
    fulfillmentMethod: 'DINE_IN',
    status: 'UNFULFILLED',
    paymentMethod: 'E_WALLET',
    postscript: 'demo postscript',
    orderedItems: [{
      id: '12345',
      name: 'food1',
      variant: 'variant1',
      quantity: 8,
    },{
      id: '123456',
      name: 'food2',
      variant: 'variant1',
      quantity: 2,
    },{
      id: '1234577',
      name: 'food1',
      variant: 'variant1',
      quantity: 8,
    },{
      id: '12316',
      name: 'food2',
      variant: 'variant1',
      quantity: 2,
    }],
    tableNumber: 'demo table 1'
  },
  {        
    createdAt: 'Created At date',
    shopId: 'demoShopId',
    orderId: 'demoOrderId5',
    fulfillmentMethod: 'DELIVERY',
    status: 'UNFULFILLED',
    paymentMethod: 'E_WALLET',
    postscript: 'demo postscript',
    orderedItems: [{
      id: '12345',
      name: 'food1',
      variant: 'variant1',
      quantity: 8,
    },{
      id: '123456',
      name: 'food2',
      variant: 'variant1',
      quantity: 2,
    }],
    firstName: 'Zhi Cong',
    lastName: 'Tay',
    phoneNumber: '0108001190',
    deliveryDate: '20/02/2020',
    deliveryTime: '8.30pm',
    deliveryAddress: '101 Jln Treh',        
  },
  {        
    createdAt: 'Created At date',
    shopId: 'demoShopId',
    orderId: 'demoOrderId6',
    fulfillmentMethod: 'SELF_PICKUP',
    status: 'UNFULFILLED',
    paymentMethod: 'E_WALLET',
    postscript: 'demo postscript',
    orderedItems: [{
      id: '12345',
      name: 'food1',
      variant: 'variant1',
      quantity: 8,
    },{
      id: '123456',
      name: 'food2',
      variant: 'variant1',
      quantity: 2,
    }],
    firstName: 'Zhi Cong',
    lastName: 'Tay',
    phoneNumber: '0108001190',
    pickupDate: '21/02/2020',
    pickupTime: '1.30pm',
    vehiclePlateNumber: 'WW1234',        
  },    
];
