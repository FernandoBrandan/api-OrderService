import orderModel from "../models/orderModel";
import { Order } from "../interfaces/orderInterface";

export class orderService {
    static getOrders = async () => {
        try {
            const items = await orderModel.find();
            if (Array.isArray(items) && items.length === 0) return { status: "error", statuscode: 404, message: "No orders found" };
            return { status: "success", statuscode: 200, data: items };
        } catch (error) {
            throw error;
        }
    }

    static getOrder = async (id: string) => {
        try {
            const item = await orderModel.findById(id);
            if (!item) return { status: "error", statuscode: 404, message: "Order not found" };
            return { status: "success", statuscode: 200, data: item };
        } catch (error) {
            throw error;
        }
    }

    static createOrder = async (order: Order) => {
        try {
            const newOrder = await orderModel.create(order);
            if (!newOrder) return { status: "error", statuscode: 404, message: "Order not created" };
            return { status: "success", statuscode: 201, data: newOrder };
        } catch (error) {
            throw error;
        }
    }            
}
