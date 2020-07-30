/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncOrders = /* GraphQL */ `
  query SyncOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      }
      nextToken
      startedAt
    }
  }
`;
export const getOrder = /* GraphQL */ `
  query GetOrder(
    $shopId: String!
    $fulfillmentMethod: FulfillmentMethod!
    $orderId: String!
  ) {
    getOrder(
      shopId: $shopId
      fulfillmentMethod: $fulfillmentMethod
      orderId: $orderId
    ) {
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
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $shopId: String
    $fulfillmentMethodOrderId: ModelOrderPrimaryCompositeKeyConditionInput
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listOrders(
      shopId: $shopId
      fulfillmentMethodOrderId: $fulfillmentMethodOrderId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      }
      nextToken
      startedAt
    }
  }
`;
