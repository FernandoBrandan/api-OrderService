import { Schema, model } from "mongoose";
import { OrderDetail } from "../interfaces/orderDetailInterface";

const orderDetailSchema = new Schema<OrderDetail>({
    itemId: { type: Number, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    order: { type: Schema.Types.ObjectId, ref: 'Order' }, // Relación inversa many-to-many
}, {
    timestamps: true,
    versionKey: false,
});

const orderDetailModel = model("OrderDetail", orderDetailSchema);
export default orderDetailModel;
