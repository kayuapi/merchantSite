/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String!) {
    onCreateOrder(owner: $owner) {
      shopId
      fulfillmentMethod
      orderId
      status
      paymentMethod
      postscript
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
      orderedItems {
        name
        variant
        quantity
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String!) {
    onUpdateOrder(owner: $owner) {
      shopId
      fulfillmentMethod
      orderId
      status
      paymentMethod
      postscript
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
      orderedItems {
        name
        variant
        quantity
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String!) {
    onDeleteOrder(owner: $owner) {
      shopId
      fulfillmentMethod
      orderId
      status
      paymentMethod
      postscript
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
      orderedItems {
        name
        variant
        quantity
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
