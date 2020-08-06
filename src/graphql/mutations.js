/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
