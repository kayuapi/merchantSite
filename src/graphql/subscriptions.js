/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($shopId: String!) {
    onCreateOrder(shopId: $shopId) {
      shopId
      fulfillmentMethod
      orderId
      status
      paymentMethod
      postscript
      customAttributeField1
      tableNumber
      firstName
      lastName
      phoneNumber
      pickupDate
      pickupTime
      vehiclePlateNumber
      deliveryDate
      deliveryTime
      deliveryAddress
      storeFrontSideTotalPrice
      orderedItems {
        name
        variant
        quantity
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($shopId: String!) {
    onUpdateOrder(shopId: $shopId) {
      shopId
      fulfillmentMethod
      orderId
      status
      paymentMethod
      postscript
      customAttributeField1
      tableNumber
      firstName
      lastName
      phoneNumber
      pickupDate
      pickupTime
      vehiclePlateNumber
      deliveryDate
      deliveryTime
      deliveryAddress
      storeFrontSideTotalPrice
      orderedItems {
        name
        variant
        quantity
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($shopId: String!) {
    onDeleteOrder(shopId: $shopId) {
      shopId
      fulfillmentMethod
      orderId
      status
      paymentMethod
      postscript
      customAttributeField1
      tableNumber
      firstName
      lastName
      phoneNumber
      pickupDate
      pickupTime
      vehiclePlateNumber
      deliveryDate
      deliveryTime
      deliveryAddress
      storeFrontSideTotalPrice
      orderedItems {
        name
        variant
        quantity
      }
      createdAt
      updatedAt
    }
  }
`;
