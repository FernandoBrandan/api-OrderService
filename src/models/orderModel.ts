import { Schema, model } from "mongoose";
import { Order } from "../interfaces/orderInterface";

const orderSchema = new Schema<Order>(
    {
        userId: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: Number,
            required: true
        },
        api: {
            type: String,
            required: true
        },
        paid: {
            type: Boolean,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'cancelled', 'successful'],
            default: 'pending',
        },
        order_details: [{
            type: Schema.Types.ObjectId,
            ref: "OrderDetail",
            required: true,
        }], // Relación many-to-many
        details: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const orderModel = model("Order", orderSchema);
export default orderModel;


// Para manejar en consutlas la relacion entre las colecciones Order y OrderDetail, se puede usar el método populate() de Mongoose.
// // Obtener un pedido con sus detalles
// const order = await Order.findOne({ _id: orderId }).populate('order_details');
// console.log(order);
// 
// // Obtener un detalle con su pedido asociado
// const orderDetail = await OrderDetail.findOne({ _id: detailId }).populate('order');
// console.log(orderDetail);


/**
 * 
 * 3. Validación y control de consistencia
Para mantener la integridad de los datos:

Validar antes de guardar: Puedes usar hooks como pre('save') o pre('remove') para asegurarte de que las referencias sean válidas.

javascript
Copiar
Editar
orderSchema.pre('save', async function (next) {
  const orderDetails = this.order_details;
  for (const detailId of orderDetails) {
    const detailExists = await mongoose.model('OrderDetail').exists({ _id: detailId });
    if (!detailExists) {
      return next(new Error(`OrderDetail ${detailId} does not exist`));
    }
  }
  next();
});


/**
 * 
 * Cascade delete: Si un pedido se elimina, puedes configurar que también se eliminen sus detalles.

javascript
Copiar
Editar
orderSchema.pre('remove', async function (next) {
  await mongoose.model('OrderDetail').deleteMany({ order: this._id });
  next();
});


 */ 

