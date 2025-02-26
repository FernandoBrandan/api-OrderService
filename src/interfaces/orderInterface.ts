import { Types } from 'mongoose'

export interface Order {
    userId: string,
    email: string,
    phoneNumber: number,
    paid: boolean,
    amount: number,
    status: string, // enum: ['pending', 'cancelled', 'successful'],
    order_details?: Types.ObjectId[]; // Referencia a OrderDetail
    details: string,
    created_at?: string,
    updated_at?: string
}
