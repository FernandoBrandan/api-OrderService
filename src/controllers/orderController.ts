import { Request, Response, NextFunction } from "express";

import { orderService } from "../services/orderService";
import { orderDetailService } from "../services/orderDetailService";

import { Order } from "../interfaces/orderInterface";
import { OrderDetail } from "../interfaces/orderDetailInterface";

import { orderValidation } from "../utils/orderValidation";
import { orderDetailValidation } from "../utils/orderDetailValidation";


import { validateProducts } from '../services/productValidate';


export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await orderService.getOrders();
        if (orders.status == "error") {
            res.status(orders.statuscode).json({ message: orders.message })
        }
        res.status(orders.statuscode).json(orders.data)
    } catch (error) {
        next(error)
    }
};

export const getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("getOrder - id");
    } catch (error) {
        next(error)
    }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Estamos en crear order - validar req.body", req.body)
        orderValidation(req.body);
        orderDetailValidation(req.body.cart);
        if (!validateAmount(req.body.cart, req.body.amount)) {
            res.status(400).json({ message: 'El monto total no coincide con el calculado2' });
        }
        const newOrder: Order = {
            userId: "123", // req.body.user, // se genera en el mid la desfrar token - pero antes modificar modelo gateway
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            paid: false,
            amount: req.body.amount,
            status: "pending",
            details: req.body.details || ""
        };
        const order = await orderService.createOrder(newOrder);
        const newOrderDetail: OrderDetail[] = req.body.cart.map((item: OrderDetail) => {
            return {
                "productId": item.productId,
                "price": item.price,
                "quantity": item.quantity,
                //order: order?._id
            }
        });
        res.json({message: "FIN!!!!!!!!!!!!!!!!11"})
        console.log("Inicio Rabbit");
        await validateProducts(newOrderDetail); // Valida antes de crear la orden 
        console.log("Fin Rabbit");
        const orderDetail = orderDetailService.createOrder(newOrderDetail);

        // Actualiza el pedido con los detalles creados
        // await orderService.updateOrderDetails(order, orderDetail.map((d) => d.id));
        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        next(error)
    }
};

export const getUserOrders = async (req: Request, res: Response) => {
    res.send("Get User Orders");
}

export const updateOrder = async (req: Request, res: Response) => { res.send("Update Order"); };
export const deleteOrder = async (req: Request, res: Response) => { res.send("Delete Order"); };


/** Fn */

const validateAmount = (cart: Array<OrderDetail>, amount: number) => {
    const calculated: number = cart.reduce((total: number, item: OrderDetail) => {
        if (item.price < 0 || item.quantity < 0) {
            throw new Error(`El precio o la cantidad no pueden ser negativos en el artículo ${item.productId}`);
        }
        return total + item.price * item.quantity;
    }, 0);

    if (calculated !== amount) {
        // throw new Error("El monto total no coincide con el calculado");
        return false;
    }
    return true;
}