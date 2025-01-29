import joi from 'joi';
import { OrderDetail } from '../interfaces/orderDetailInterface';

export const orderDetailValidation = (data: OrderDetail) => {
    if (!data) return { error: "No data provided" };
    const schema = joi.object({
        productId: joi.number().required(),
        price: joi.number().positive().required(),
        quantity: joi.number().positive().integer().required()

    });



    const arraySchema = joi.array().items(schema).min(1).required(); // Valida un array de OrderDetail
    return schema.validate(data);
}
