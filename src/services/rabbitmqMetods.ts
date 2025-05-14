import { rabbtimq } from './rabbitmqService'
import { OrderDetail } from '../interfaces/orderDetailInterface'
import { Order } from '../interfaces/orderInterface'

// Parameters:
// API - Action - ItemId - Quantity - RoutingKey - CorrelationId

export const validateItems = async (items: OrderDetail[]) => {
  const queue = 'ORDERSERVICE'
  const params = {
    act: 'VALIDATE-ITEMS',
    items
  }
  const resValidatedItems = JSON.parse(JSON.stringify(await rabbtimq(queue, params), null, 2))
  if (resValidatedItems && resValidatedItems.error === true) {
    return { error: true, message: resValidatedItems.message }
  }
  return { error: false, message: '' }
}

export const updateOrderDetails = async (items: OrderDetail[]) => {
  const queue = 'ORDERSERVICE'
  const message = {
    act: 'DISCOUNT-STOCK',
    items
  }
  const resDiscountStock = JSON.parse(JSON.stringify(await rabbtimq(queue, message), null, 2))
  if (resDiscountStock && resDiscountStock.error === true) {
    return { error: true, message: resDiscountStock.message }
  }
  return { error: false, message: '' }
}

export const payment = async (order: Order) => {
  const queue = 'PAYMENT'
  const message = {
    act: 'PAYMENT',
    order
  }
  const resPayment = JSON.parse(JSON.stringify(await rabbtimq(queue, message), null, 2))
  if (resPayment && resPayment.error === true) {
    return { error: true, message: resPayment.message }
  }
  return { error: false, message: '' }
}
