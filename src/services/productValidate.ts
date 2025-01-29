// producer.ts
import { OrderDetail } from '../interfaces/orderDetailInterface'; 
import amqp from 'amqplib'; 
const RABBITMQ_URL = 'amqp://rabbitmq';
const QUEUE = 'library';
export const validateProducts = async (productIds: OrderDetail[]): Promise<void> => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    const message = JSON.stringify(productIds);
    channel.sendToQueue(QUEUE, Buffer.from(message), {
      persistent: true,  
    });
    console.log('Message sent to RabbitMQ!');
  } catch (error) {
    console.error('Failed to send message to RabbitMQ:', error);
    throw new Error('Failed to send message to RabbitMQ');
  }
};

// Opciones mas basicas
// import axios from 'axios';
// import { OrderDetail } from "../interfaces/orderDetailInterface";
// export async function validateCart(cart: OrderDetail[]): Promise<void> {
//     const productIds = cart.map((item: OrderDetail) => item.productId);
//     const response = await axios.post('http://product-service/api/products/validate', { productIds });
//     if (!response.data || !response.data.valid) {
//         throw new Error('Invalid products or insufficient stock');
//     }
// } 
// export async function validateProducts(cart: OrderDetail[]) {
//     for (const item of cart) {
//         const product = await axios.get(`http://product-service/api/products/${item.productId}`);
//         if (!product.data || product.data.stock < item.quantity) {
//             throw new Error(`Product ${item.productId} is not valid`);
//         }
//     }
// }

