import { getRabbitMqChannel } from "../db/rabbitMq.connection";

export const producer = async (queue: string, msg: string) => {
  const channel = await getRabbitMqChannel();

  channel.assertQueue(queue, {
    durable: false,
  });

  channel.sendToQueue(queue, Buffer.from(msg));
};
