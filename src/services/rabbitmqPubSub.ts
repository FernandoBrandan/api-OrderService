import amqp from 'amqplib'

const RABBITMQ_URL = process.env.RABBITMQ_URL as string
// const EXCHANGE_NAME = process.env.EXCHANGE_NAME || 'logs'
const EXCHANGE_NAME = 'logs'

export const publishMessage = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    await channel.assertExchange(EXCHANGE_NAME, 'fanout', { durable: false })

    const message = 'Mensaje de prueba ' + new Date().toISOString()
    channel.publish(EXCHANGE_NAME, '', Buffer.from(message))

    console.log(`[x] Enviado: ${message}`)

    setTimeout(() => { connection.close() }, 500)
  } catch (error) {
    console.error('Error en publisher:', error)
  }
}

/**
 *  Subscriber
 *
 *
 * import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://localhost";
const EXCHANGE_NAME = process.env.EXCHANGE_NAME || "logs";

async function subscribe() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE_NAME, "fanout", { durable: false });

        const q = await channel.assertQueue("", { exclusive: true });

        console.log(`[*] Esperando mensajes en ${q.queue}. Para salir presiona CTRL+C`);

        channel.bindQueue(q.queue, EXCHANGE_NAME, "");

        channel.consume(q.queue, (msg) => {
            if (msg) {
                console.log(`[x] Recibido: ${msg.content.toString()}`);
            }
        }, { noAck: true });
    } catch (error) {
        console.error("Error en subscriber:", error);
    }
}

subscribe();

 *
 *
 */
