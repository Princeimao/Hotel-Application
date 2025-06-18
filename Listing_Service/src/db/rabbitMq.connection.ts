import amqp, { Channel, ChannelModel } from "amqplib";
let connection: ChannelModel;
let channel: Channel;

export const getRabbitMqChannel = async () => {
  try {
    if (connection && channel) return channel;

    connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();

    return channel;
  } catch (error) {
    console.log("something went wrong while connnecting to rabbitMq", error);
    process.exit(0);
  }
};
