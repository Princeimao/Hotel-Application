import { getRabbitMqChannel } from "../db/rabbitMq.connection";

interface MessageType {
  hostId: string;
  roomId: string;
}

export const producer = async (queue: string, msg: MessageType) => {
  const channel = await getRabbitMqChannel();

  channel.assertQueue(queue, {
    durable: false,
  });

  channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
};
