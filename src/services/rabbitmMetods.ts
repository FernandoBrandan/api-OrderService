import { rabbtimq } from './rabbitmqService'
import { OrderDetail } from '../interfaces/orderDetailInterface'

export const validateItems = async (api: string, items: OrderDetail[]) => {
  const queue: string = 'API-LIBRARY'
  const resValidatedItems = JSON.parse(JSON.stringify(await rabbtimq(queue, items), null, 2))
  if (resValidatedItems.response && resValidatedItems.response.valid === false) {
    return { valid: false, message: resValidatedItems.response.message }
  }
  return { valid: true, message: '' }
}

export const updateOrderDetails = async (api: string, items: OrderDetail[]) => {
  // const queue: string = api
  const queue: string = 'API-LIBRARY'
  const act: string = 'DISCOUNT-STOCK'
  const message = {
    act,
    items
  }
  const resDiscountStock = JSON.parse(JSON.stringify(await rabbtimq(queue, [message]), null, 2))
  if (resDiscountStock.response && resDiscountStock.response.valid === false) {
    return { valid: false, message: resDiscountStock.response.message }
  }
  return { valid: true, message: '' }
}
