export type Id = string;
export type ReceiptItemType = MenuItem;

interface Order {
  createdAt: string;
  shopId: string;
  orderId: string;
  customAttributeField1: string;
  fulfillmentMethod: FulfillmentMethod;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  postscript?: string;
  orderedItems: MenuItem[];
  deleteOrder: () => void;
}

export interface IOrderItem {
  id: Id;
  name: string;
  variant?: string;
  quantity: number;
}

export interface DineInOrder extends Order {
  tableNumber: string;
}
export interface DeliveryOrder extends Order {
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  deliveryDate: string;
  deliveryTime?: string;
  deliveryAddress: string;
}
export interface SelfPickupOrder extends Order {
  firstName: string;
  lastName?: string;
  phoneNumber?: string;
  pickupDate: string;
  pickupTime?: string;
  vehiclePlateNumber?: string;
}

export interface MenuItem{
  id: Id;
  name: string;
  variant: string;
  quantity: number;
  price: number;
}

export type FulfillmentMethod = 'DINE_IN' | 'DELIVERY' | 'SELF_PICKUP';
export type OrderStatus = 'FULFILLED' | 'UNFULFILLED' | 'CANCELED';
export type PaymentMethod = 
  'E_WALLET' | 
  'E_WALLET_TOUCHNGO' | 
  'E_WALLET_BOOST' | 
  'CASH' | 
  'CASH_ON_DELIVERY' | 
  'ONLINE_BANKING' | 
  'CARD';