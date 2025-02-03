import { Request, Response, NextFunction } from 'express'

import { orderService } from '../services/orderService'
import { orderDetailService } from '../services/orderDetailService'

import { Order } from '../interfaces/orderInterface'
import { OrderDetail } from '../interfaces/orderDetailInterface'

import { orderValidation } from '../utils/orderValidation'
import { orderDetailValidation } from '../utils/orderDetailValidation'

import { validateItems, updateOrderDetails } from '../services/rabbitmMetods'

export const getOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderService.getOrders()
    if (orders.status === 'error') res.status(orders.statuscode).json({ message: orders.message })
    res.status(orders.statuscode).json(orders.data)
  } catch (error) {
    next(error)
  }
}

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('getOrder - id')
  } catch (error) {
    next(error)
  }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    orderValidation(req.body)
    orderDetailValidation(req.body.cart)
    if (!validateAmount(req.body.cart, req.body.amount)) {
      res.status(400).json({ message: 'El monto total no coincide con el calculado2' })
    }
    const newOrder: Order = {
      userId: '123', // req.body.user, // se genera en el mid la desfrar token - pero antes modificar modelo gateway
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      api: req.body.api,
      paid: false,
      amount: req.body.amount,
      status: 'pending',
      details: req.body.details || ''
    }
    const newOrderDetail: OrderDetail[] = req.body.cart.map((item: OrderDetail) => {
      return {
        itemId: item.itemId,
        price: item.price,
        quantity: item.quantity
        // order: order?._id
      }
    })

    const validate = await validateItems(newOrder.api, newOrderDetail)
    if (!validate.valid) res.status(401).json({ error: 'Not order created1', message: validate.message })
    const updateStock = await updateOrderDetails(newOrder.api, newOrderDetail)
    if (!updateStock.valid) res.status(401).json({ error: 'Not order created2', message: updateStock.message })

    const order = await orderService.createOrder(newOrder)
    const orderDetail = await orderDetailService.createOrder(newOrderDetail)

    if (!order || !orderDetail) res.status(401).json({ message: 'Not order created3', order, orderDetail })
    res.status(201).json({ message: 'Order created successfully1', order, orderDetail })
  } catch (error) {
    next(error)
  }
}

export const getUserOrders = async (req: Request, res: Response) => { res.send('Get User Orders') }
export const updateOrder = async (req: Request, res: Response) => { res.send('Update Order') }
export const deleteOrder = async (req: Request, res: Response) => { res.send('Delete Order') }

/** Fn */
const validateAmount = (cart: Array<OrderDetail>, amount: number) => {
  const calculated: number = cart.reduce((total: number, cart: OrderDetail) => {
    if (cart.price < 0 || cart.quantity < 0) {
      throw new Error(`El precio o la cantidad no pueden ser negativos en el artículo ${cart.itemId}`)
    }
    return total + cart.price * cart.quantity
  }, 0)
  // Falta validar el precio con la base
  if (calculated !== amount) return false
  return true
}
