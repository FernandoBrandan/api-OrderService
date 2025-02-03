import { Router } from 'express'
import setupAuth from '../middleware/authMiddleware'
import { getOrders, getOrder, createOrder } from '../controllers/orderController'
const router = Router()

router.get('/order', getOrders)
router.get('/order/:id', getOrder)
router.post('/order', setupAuth, createOrder)

export default router

/**
 *
{
  "email": "fer@fer.com",
  "phoneNumber": 12345,
  "paid": false,
  "amount": 100,
  "status": "",
  "details": "ASDASD",
  "cart": [
      {
        "productId": 123,
        "price": 123,
        "quantity": 123
      },
      {
        "productId": 123,
        "price": 123,
        "quantity": 123
      }
    ]
}
 */
