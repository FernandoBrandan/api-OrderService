// producer.ts
import amqp from 'amqplib';
const RABBITMQ_URL = process.env.RABBITMQ_URL as string;
const ERROR_QUEUE = 'ERROR_QUEUE';

export const rabbtimq = async (QUEUE: string, message: any[]): Promise<void> => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    
    // Generar un ID único para correlacionar la respuesta
    const correlationId = Math.floor(Math.random() * 1000000).toString();    
    // Crear una cola temporal para esperar la respuesta
    const replyQueue = await channel.assertQueue('', { exclusive: true });    
    // Esperar por la respuesta en la cola temporal

    return new Promise(async (resolve, reject) => {
      const onMessage = async (msg: amqp.ConsumeMessage | null) => {
        if (!msg) return;

        console.log(`📩 Message received from queue: ${msg.fields.exchange || QUEUE}`);

        if (msg.properties.correlationId === correlationId) {
          const response = JSON.parse(msg.content.toString());

          if (msg.fields.routingKey === ERROR_QUEUE) {
            console.error('❌ Error response received:', response);
            reject(response);
          } else {
            console.log('✅ Valid response received:', response);
            resolve(response);
          }
          
          await channel!.cancel(consumer.consumerTag);
        }
      };

      const consumer = await channel!.consume(replyQueue.queue, onMessage, { noAck: true });

      // Enviar mensaje
      channel!.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)), {
        persistent: true,
        correlationId,
        replyTo: replyQueue.queue,
      });
      console.log('📤 Message sent to RabbitMQ!');
    }); 
  } catch (error) {
    console.error('Failed to send message to RabbitMQ:', error);
    throw new Error('Failed to send message to RabbitMQ');
  }
};