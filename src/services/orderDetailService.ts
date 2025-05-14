import orderDetailModel from '../models/orderDetailModel'
import { OrderDetail } from '../interfaces/orderDetailInterface'

export class orderDetailService {
  static getOrders = async () => {
    const items = await orderDetailModel.find()
    if (Array.isArray(items) && items.length === 0) return { status: 'error', statuscode: 404, message: 'No orders found' }
    return { status: 'success', statuscode: 200, data: items }
  }

  static getOrder = async (id: string) => {
    const item = await orderDetailModel.findById(id)
    if (!item) return { status: 'error', statuscode: 404, message: 'Order not found' }
    return { status: 'success', statuscode: 200, data: item }
  }

  static createOrder = async (order: OrderDetail []) => {
    const newOrder = await orderDetailModel.create(order)
    if (!newOrder) return { status: 'error', statuscode: 404, message: 'Order not created' }
    return { status: 'success', statuscode: 201, data: newOrder }
  }
}
