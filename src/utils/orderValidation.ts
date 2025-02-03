import joi from 'joi'
import { Order } from '../interfaces/orderInterface'

export const orderValidation = (data: Order) => {
  if (!data) return { error: 'No data provided' }
  const schema = joi.object({
    // userId: joi.string().required(), Se obtiene con el mail
    email: joi.string().min(1).required(), // La dirección no puede estar vacía
    phoneNumber: joi.number().positive().integer().required(), // Número de teléfono válido
    api: joi.string().required(),
    paid: joi.boolean().required(),
    amount: joi.number().positive().required(),
    status: joi.string().valid('pending', 'cancelled', 'successful').required(),
    // order_details: joi.array().items(joi.string()).optional(),  //  No se valida por ahora
    details: joi.string().optional() // Detalles son opcionales
  })
  return schema.validate(data)
}
