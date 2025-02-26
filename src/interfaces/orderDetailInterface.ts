import { Types } from 'mongoose'

export interface OrderDetail {
  api: string,
  itemId: number;
  price: number;
  quantity: number;
  order?: Types.ObjectId; // Relación inversa a Order
}
