import orderDetailModel from "../models/orderDetailModel";
import { OrderDetail } from "../interfaces/orderDetailInterface";

export class orderDetailService {
    static getOrders = async () => {
        try {
            const items = await orderDetailModel.find();
            if (Array.isArray(items) && items.length === 0) return { status: "error", statuscode: 404, message: "No orders found" };
            return { status: "success", statuscode: 200, data: items };
        } catch (error) {
            throw error;
        }
    }

    static getOrder = async (id: string) => {
        try {
            const item = await orderDetailModel.findById(id);
            if (!item) return { status: "error", statuscode: 404, message: "Order not found" };
            return { status: "success", statuscode: 200, data: item };
        } catch (error) {
            throw error;
        }
    }

    static createOrder = async (order: OrderDetail []) => {
        try {
            //const newOrder = await orderDetailModel.create(order);
            const newOrder = await orderDetailModel.insertMany(order);
            if (!newOrder) return { status: "error", statuscode: 404, message: "Order not created" };
            return { status: "success", statuscode: 201, data: newOrder };
        } catch (error) {
            throw error;
        }
    }            
}
