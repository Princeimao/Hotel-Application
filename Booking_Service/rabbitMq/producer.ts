import { getRabbitMqChannel } from "../src/db/rabbitMq.connection";

interface MessageType {
  hostId: string;
  roomId: string;
}

export const producer = async (queue: string, msg: MessageType) => {
  try {
    const channel = await getRabbitMqChannel();

    const dlxExchange = "dead-letter-exchange";
    const dlqQueue = "dead-letter-queue";

    // declare of dead letter queue and exchange
    await channel.assertExchange(dlxExchange, "direct", { durable: true });
    await channel.assertQueue(dlqQueue, { durable: true });
    await channel.bindQueue(dlqQueue, dlxExchange, "");

    // declare of main queue
    await channel.assertQueue(queue, {
      durable: true,
      arguments: {
        "x-dead-letter-exchange": dlxExchange,
      },
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
  } catch (error) {
    console.log(
      "something went wrong while publishing queue to queue - host service",
      error
    );
  }
};
