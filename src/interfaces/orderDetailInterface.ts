import { Types } from 'mongoose';

export interface OrderDetail {
  productId: number;
  price: number;
  quantity: number;
  order?: Types.ObjectId; // Relación inversa a Order
}
